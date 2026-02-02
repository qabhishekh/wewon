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
    if (ads && ads.length > 0) {
      setIsVisible(true);
    }
  }, [ads]);

  if (!isVisible || !ads || ads.length === 0) return null;

  const ad = ads[0];

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-300 px-6 py-5">
        <button
          onClick={handleClose}
          className="absolute cursor-pointer top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-gray-800 hover:bg-white transition-colors shadow-sm"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {ad.title && (
          <div className="mb-4 pb-3 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 pr-10">
              {ad.title}
            </h3>
          </div>
        )}

        <div
          className="popup-content prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: ad.description }}
        />

        <style jsx global>{`
          .popup-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
          }
          .popup-content table td {
            padding: 12px 16px;
            border-bottom: 1px solid #e5e7eb;
          }
          .popup-content table tr:last-child td {
            border-bottom: none;
          }
          .popup-content table tr:hover {
            background-color: #f9fafb;
          }
          .popup-content table td:first-child {
            font-weight: 500;
          }
          .popup-content table td:last-child {
            text-align: right;
          }
          .popup-content p {
            margin: 0;
          }
          
          .popup-content em {
            color: #ef4444;
            font-style: normal;
            font-size: 0.85em;
            margin-left: 4px;
          }
          .popup-content a {
            display: inline-block;
            padding: 6px 16px;
            background: red;
            color: white !important;
            text-decoration: none !important;
            border-radius: 6px;
            font-size: 0.875rem;
            transition: all 0.2s ease;
          }
          .popup-content a:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
          }
        `}</style>
      </div>
    </div>
  );
};

export default PopupAd;
