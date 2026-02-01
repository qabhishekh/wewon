"use client";
import React from "react";
import { useAppSelector } from "@/store/hooks";
import { selectAdByLocation } from "@/store/ads/adsSlice";
import Script from "next/script";

interface AdRendererProps {
  location: string;
  className?: string; // For additional styling if needed
}

const AdRenderer: React.FC<AdRendererProps> = ({ location, className }) => {
  const ads = useAppSelector((state) => selectAdByLocation(state, location));

  // If no active ads for this location, render nothing
  if (!ads || ads.length === 0) {
    return null;
  }

  // Sort by priority (descending: higher number = higher priority) if needed,
  // currently taking the first one or we can map them.
  // Requirement says "looks up the ad data for that location and renders the specific visual component".
  // Assuming one ad per location slot for now, or we render all.
  // The spec implies one ad might be active per location key generally, but let's render all active ones sorted by priority.
  // Actually, usually it's one ad spot.
  const ad = ads.sort((a, b) => (b.priority || 0) - (a.priority || 0))[0];

  if (!ad) return null;

  // 1. Coming soon (Specific logic if needed, or if location indicates)
  if (location.startsWith("google_ad_")) {
    const slotId = ad.description;
    return (
      <div
        className={`google-ad-container w-full flex justify-center my-4 ${className || ""}`}
      >
        <div className="bg-gray-100 border border-gray-300 p-4 text-center text-xs text-gray-500">
          Google Ad: {slotId} (Location: {location})
        </div>
      </div>
    );
  }

  // 2. Specialized Display for location keys if needed
  // Most of the new keys (above_overview, prediction_banner, etc.)
  // are likely HTML or image banners.

  return (
    <div
      className={`ad-renderer-container location-${location} my-6 ${className || ""}`}
    >
      {ad.title && (
        <h3 className="text-lg font-semibold text-gray-800 mb-3">{ad.title}</h3>
      )}
      <div dangerouslySetInnerHTML={{ __html: ad.description }} />
    </div>
  );
};

export default AdRenderer;
