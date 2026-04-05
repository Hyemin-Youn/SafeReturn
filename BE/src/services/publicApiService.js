require("dotenv").config();
const axios = require("axios");
const { Facility } = require("../models");
/**
 * 1. 공사 현장 데이터 수집 및 정제
 */
async function fetchConstructionData() {
  const apiKey = process.env.SEOUL_CONSTRUCTION_ZONE_API_KEY;
  let startIndex = 1;
  let endIndex = 1000;
  let allRawData = []; // 1000개씩 가져온 데이터를 모두 누적할 빈 배열
  let isFetching = true;

  try {
    console.log("💡 [API 호출] 공사 현장 전체 데이터 수집 시작...");
    while (isFetching) {
      const url = `http://openapi.seoul.go.kr:8088/${apiKey}/json/ListOnePMISBizInfo/${startIndex}/${endIndex}`;
      const response = await axios.get(url);
      const dataRoot = response.data?.ListOnePMISBizInfo;

      // 만약 데이터가 없거나 서버 에러가 나면 반복문 강제 종료
      if (!dataRoot || !dataRoot.row) {
        console.log(
          "⚠️ 더 이상 가져올 데이터가 없거나 응답이 올바르지 않습니다.",
        );
        break;
      }
      const totalCount = dataRoot.list_total_count; // API가 친절하게 알려주는 전체 데이터 개수
      const currentRows = dataRoot.row; // 이번 턴에 가져온 데이터 (최대 1000개)

      // 3. 새로 가져온 데이터를 기존 배열에 이어붙이기 (병합)
      allRawData = allRawData.concat(currentRows);

      console.log(
        `... 데이터 계속 수집 중: ${startIndex} ~ ${endIndex} (전체 ${totalCount}개 중)`,
      );

      // 4. 탈출 조건: 우리가 요청한 마지막 번호(endIndex)가 전체 개수보다 크거나 같으면 모두 가져온 것!
      if (endIndex >= totalCount) {
        isFetching = false; // 반복문 종료
      } else {
        // 아직 덜 가져왔다면 인덱스를 1000씩 밀어서 다음 턴 준비
        startIndex += 1000;
        endIndex += 1000;
      }
    }

    console.log(
      `📥 API 수집 완료: 총 ${allRawData.length}건의 원본 데이터를 확보했습니다.`,
    );

    const normalizedData = allRawData
      .filter((item) => item.GU_NM == "노원구" && item.LAT && item.LOT)
      .map((item) => ({
        source: "SEOUL_OPEN_API",
        source_id: `CONST_${item.BIZ_NM}`,
        type: "CONSTRUCTION",
        name: item.BIZ_NM,
        gu_name: item.GU_NM,
        address: item.CSTRN_PSTN,
        latitude: Number(item.LAT),
        longitude: Number(item.LOT),
        status: "ACTIVE",
        extra_json: { period: item.CSTRN_PRD }, // 공사기간 저장
      }));

    console.log(`✅ 공사 현장: 총 ${normalizedData.length}건 정제 완료`);
    return normalizedData;
  } catch (error) {
    console.error("❌ 스마트 보안등 API 호출 에러:", error.message);
    throw error;
  }
}

/**
 * 2. 스마트 보안등 데이터 수집 및 정제
 */
async function fetchSmartLightData() {
  const apiKey = process.env.SEOUL_SECURITY_STREET_MAP_API_KEY;

  try {
    console.log("💡 [API 호출] 스마트 보안등 데이터 수집 준비...");
    const initurl = `http://openapi.seoul.go.kr:8088/${apiKey}/json/IotVdata025/1/1`;
    const initResponse = await axios.get(initurl);
    const totalCount = initResponse.data?.IotVdata025?.list_total_count;
    if (!totalCount) {
      console.log("⚠️ 전체 데이터 건수를 확인할 수 없습니다.");
      return [];
    }

    // 전체 개수에서 10,000을 뺀 위치부터 끝까지만 가져옵니다. (장비가 약 4500대이므로 충분함)
    let startIndex = Math.max(1, totalCount - 10000);
    let endIndex = startIndex + 999;
    let allRawData = [];

    console.log(
      `🚀 총 ${totalCount}건 중, 최신 데이터 구간(${startIndex} ~ ${totalCount})만 타겟팅하여 수집합니다.`,
    );

    while (startIndex <= totalCount) {
      if (endIndex > totalCount) endIndex = totalCount;
      const url = `http://openapi.seoul.go.kr:8088/${apiKey}/json/IotVdata025/${startIndex}/${endIndex}`;
      const response = await axios.get(url);
      const currentRows = response.data?.IotVdata025?.row || [];

      allRawData = allRawData.concat(currentRows);
      console.log(`... 최신 데이터 수집 중: ${startIndex} ~ ${endIndex}`);

      startIndex += 1000;
      endIndex += 1000;
    }

    // 중복 제거 및 최신 상태 유지
    // 시리얼 번호(SN)를 Key로 사용하여 덮어쓰기를 하면, 자연스럽게 배열의 가장 뒤에 있던 최신 상태만 남습니다.
    const uniqueLightsMap = new Map();

    allRawData.forEach((item) => {
      if (item.LAT && item.LOT) {
        uniqueLightsMap.set(item.SN, item);
      }
    });

    console.log(
      `📥 수집된 로그 ${allRawData.length}건 중, 고유 장비 ${uniqueLightsMap.size}대 필터링 완료.`,
    );

    const normalizedData = Array.from(uniqueLightsMap.values()).map((item) => ({
      source: "SEOUL_OPEN_API",
      source_id: `LIGHT_${item.SN}`,
      type: "SMART_LIGHT",
      name: `스마트 보안등 (${item.SN})`,
      gu_name: "노원구",
      address: null,
      latitude: Number(item.LAT),
      longitude: Number(item.LOT),
      status: item.BAD_YN === "1" ? "BAD" : "ACTIVE",
      extra_json: { reg_ymd: item.REG_YMD }, // 확인용으로 시간 기록
    }));

    console.log(`✅ 스마트 보안등: 총 ${normalizedData.length}건 정제 완료`);
    return normalizedData;
  } catch (error) {
    console.error("❌ 스마트 보안등 API 호출 에러:", error.message);
    throw error;
  }
}

/**
 *  3. 도로교통공단 보행자 교통사고 다발지역 데이터 수집 및 정제
 */
async function fetchPedestrianAccidentData() {
  const apiKey = process.env.KOROAD_ACCIDENT_API_KEY;
  const baseUrl =
    "https://opendata.koroad.or.kr/data/rest/frequentzone/pedstrians";
  const targetYears = [2023, 2022, 2021];
  let allAccidentData = []; // 모든 연도 데이터 합칠 배열
  try {
    console.log(
      `💡 [API 호출] 보행자 사고 다발 구역 수집 시작 (대상 연도: ${targetYears.join(", ")})`,
    );

    // 💡 2. 연도별로 반복문을 돕니다.
    for (const year of targetYears) {
      console.log(`... ${year}년 기준 노원구 데이터 가져오는 중...`);
      const requestUrl = `${baseUrl}?authKey=${apiKey}&searchYearCd=${year}&siDo=11&guGun=350&type=json&numOfRows=100&pageNo=1`;
      const response = await axios.get(requestUrl);

      // 통신은 성공(200 OK)했으나, 결과 코드가 "00"(성공)이 아니거나 데이터가 없는 경우 방어
      if (
        response.data.resultCode != "00" ||
        !response.data.items ||
        !response.data.items.item
      ) {
        console.log(
          `⚠️ ${year}년 데이터가 존재하지 않거나 응답에 실패했습니다.`,
        );
        continue; // 에러를 던지지 않고 다음 연도로 부드럽게 넘어감
      }

      const items = response.data.items.item;

      const accidentArray = Array.isArray(items) ? items : [items];

      // 💡 3. 데이터를 정제해서 임시 배열에 담습니다.
      const normalizedYearData = accidentArray.map((item) => ({
        source: "KOROAD_API",
        // 고유 식별자인 afos_fid를 사용하여 중복 적재(Upsert) 방지
        source_id: `PED_ACCIDENT_${item.afos_fid}`,
        type: "ACCIDENT_ZONE",
        name: item.spot_nm,
        gu_name: "노원구",
        address: null,
        latitude: Number(item.la_crd),
        longitude: Number(item.lo_crd),
        status: "ACTIVE",
        extra_json: {
          year: year,
          accident_count: item.occrrnc_cnt, // 발생건수
          casualty_count: item.caslt_cnt, // 사상자수
          death_count: item.dth_dnv_cnt, // 사망자수
        },
      }));

      // 💡 4. 전체 바구니에 합쳐줍니다.
      allAccidentData = allAccidentData.concat(normalizedYearData);
    }

    console.log(
      `✅ 보행자 사고 다발 구역: 총 ${allAccidentData.length}건 정제 완료!`,
    );
    return allAccidentData;
  } catch (error) {
    console.error("❌ 도로교통공단 API 호출 에러:", error.message);
    throw error;
  }
}

async function runTest() {
  // 테스트 코드
  try {
    await Facility.initTable();

    const constructionData = await fetchConstructionData();
    const lightData = await fetchSmartLightData();
    const accidentData = await fetchPedestrianAccidentData(); // 💡 호출 함수 변경

    console.log("\n💡 [DB 저장] data bulk 인서트를 시작합니다...");

    if (constructionData.length > 0) {
      const constResult = await Facility.bulkUpsert(constructionData);
      console.log(`✅ 공사현장 DB 반영 완료 (${constResult}건)`);
    }

    if (lightData.length > 0) {
      const lightResult = await Facility.bulkUpsert(lightData);
      console.log(`✅ 스마트 보안등 DB 반영 완료 (${lightResult}건)`);
    }

    if (accidentData.length > 0) {
      const accidentResult = await Facility.bulkUpsert(accidentData);
      console.log(`✅ 사고 다발 구역 DB 반영 완료 (${accidentResult}건)`);
    }

    console.log("\n🎉 모든 데이터 수집 및 저장이 성공적으로 끝났습니다!");
    process.exit(0);
  } catch (err) {
    console.error("❌ 테스트 중 에러가 발생했습니다:", err);
    process.exit(1);
  }
}

runTest();
