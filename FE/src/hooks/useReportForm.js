import { useState, useEffect } from "react";

export const useReportForm = (isOpen, pickedLocation) => {
  const [location, setLocation] = useState({ loading: true, lat: null, lng: null });
  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [reportTitle, setReportTitle] = useState("");
  const resetForm = () => {
    setReportType("");
    setDescription("");
    setImageFile(null);
    setPreviewUrl("");
    setLocation({ loading: true, lat: null, lng: null });
    setReportTitle("");
  };

  useEffect(() => {
    if (!isOpen) return;

    // 1. 지도에서 찍은 좌표가 있을 때
    if (pickedLocation?.lat && pickedLocation?.lng) {
      if (location.lat !== pickedLocation.lat || location.lng !== pickedLocation.lng) {
        // [해결] setTimeout으로 감싸서 비동기로 실행합니다.
        const timer = setTimeout(() => {
          setLocation({ 
            loading: false, 
            lat: pickedLocation.lat, 
            lng: pickedLocation.lng 
          });
        }, 0);
        return () => clearTimeout(timer);
      }
    } 
    // 2. 좌표가 없고 GPS 사용 가능할 때
    else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // 비동기 콜백 안에서의 setState는 이 에러를 발생시키지 않지만, 
          // 일관성을 위해 유지하거나 그대로 두어도 무방합니다.
          setLocation({ 
            loading: false, 
            lat: pos.coords.latitude, 
            lng: pos.coords.longitude 
          });
        },
        () => setLocation({ loading: false, lat: null, lng: null })
      );
    }
  }, [isOpen, pickedLocation, location.lat, location.lng]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const isFormValid = imageFile !== null && reportType !== "" && description.trim() !== "";

  return {
    location, reportType, setReportType, description, setDescription,
    imageFile, previewUrl, handleImageChange, isFormValid, resetForm
  };
};