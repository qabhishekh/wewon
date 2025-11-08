import Counslings from "@/components/counseling/Counselings";
import SearchInput from "@/components/counseling/Search";
import GoogleAds from "@/components/sections/GoogleAds";
import MainHeading from "@/components/sections/MainHeading";
import Recommended from "@/components/sections/Recommended";
import React from "react";

export default function page() {
  return (
    <>
      <div className="container mx-auto px-4">
        <MainHeading
          top="Personalized Career Counselling for"
          bottom="Your Bright Future"
        />
      </div>
      <div className="container mx-auto mt-10 px-4 ">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[var(--primary)]">
            Search Counselling
          </h2>
          <SearchInput placeholder="Counselling" />
        </div>
      </div>
      <div className="container mx-auto px-4">
        <Counslings />
      </div>
      <div className="container mx-auto pb-16 pt-12 sm:pb-24 px-4">
        <GoogleAds />
      </div>
      <div className="container mx-auto pb-16 sm:pb-24 px-4">
        <Recommended />
      </div>
    </>
  );
}
