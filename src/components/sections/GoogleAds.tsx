import React from "react";

interface GoogleAdsProps {
  text?: string;
  backgroundColor?: string;
}

export default function GoogleAds({
  text = "Google Ads",
  backgroundColor = "#D1D5DB",
}: GoogleAdsProps) {
  return (
    <div className="">
      <div
        className="w-full"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <div
          className="w-full rounded-3xl flex items-center justify-center"
          style={{
            backgroundColor: backgroundColor,
            minHeight: "460px",
          }}
        >
          <h2 className="text-4xl md:text-5xl text-black">{text}</h2>
        </div>
      </div>
    </div>
  );
}
