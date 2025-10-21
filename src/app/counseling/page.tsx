import SearchInput from "@/components/counseling/Search";
import MainHeading from "@/components/sections/MainHeading";
import React from "react";

export default function page() {
  return (
    <>
      <div className="container mx-auto px-4 sm:px-0">
        <MainHeading
          top="Personalized Career Counselling for"
          bottom="Your Bright Future"
        />
      </div>
      <div className="container mx-auto mt-10 px-4 sm:px-0">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[var(--primary)]">
            Search Counselling
          </h2>
          <SearchInput />
        </div>
      </div>
      <div>
        
      </div>
    </>
  );
}
