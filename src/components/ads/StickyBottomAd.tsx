"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectAdByLocation } from "@/store/ads/adsSlice";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/solid"; // Make sure heroicons is installed, typically is.

const StickyBottomAd = () => {
  const location = "bottom_value_strip";
  const ads = useAppSelector((state) => selectAdByLocation(state, location));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) return;

    // Check session storage
    const isHidden = sessionStorage.getItem(`hide_ad_${location}`);
    if (!isHidden && ads && ads.length > 0) {
      setIsVisible(true);
    }
  }, [ads, isVisible, location]);

  if (!isVisible || !ads || ads.length === 0) return null;

  const ad = ads[0];
  let content: any = {};

  try {
    content = JSON.parse(ad.description);
  } catch (e) {
    // Fallback if not JSON - treat as raw text/HTML
    content = { text: ad.description };
  }

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem(`hide_ad_${location}`, "true");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-[var(--primary)] border-t border-gray-200 shadow-lg p-3 flex items-center justify-between md:justify-center gap-4">
      <div className="flex-1 md:flex-none flex items-center gap-4 text-sm md:text-base font-medium text-white">
        <div
          dangerouslySetInnerHTML={{ __html: content?.text || "" }}
          className="prose-sm"
        />
        {content?.link && (
          <Link
            href={content?.link}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition-colors text-xs md:text-sm whitespace-nowrap"
          >
            {content?.btnText || "Action"}
          </Link>
        )}
      </div>

      <button
        onClick={handleClose}
        className="text-red-500 hover:text-gray-700 absolute right-4"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default StickyBottomAd;
