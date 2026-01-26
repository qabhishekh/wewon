"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectAdByLocation } from "@/store/ads/adsSlice";
import { XMarkIcon } from "@heroicons/react/24/solid";

const PopupAd = () => {
  const location = "popup";
  const ads = useAppSelector((state) => selectAdByLocation(state, location));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) return;

    const isHidden = sessionStorage.getItem(`hide_popup_${location}`);
    if (!isHidden && ads && ads.length > 0) {
      setIsVisible(true);
    }
  }, [ads, isVisible, location]);

  if (!isVisible || !ads || ads.length === 0) return null;

  const ad = ads[0];

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem(`hide_popup_${location}`, "true");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-300 px-4 py-2">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-gray-800 hover:bg-white transition-colors shadow-sm"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div
          className="popup-content"
          dangerouslySetInnerHTML={{ __html: ad.description }}
        />
      </div>
    </div>
  );
};

export default PopupAd;
