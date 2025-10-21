import MainHeading from "@/components/sections/MainHeading";
import React from "react";
import FilterColleges from "./sections/FilterCollege";
import GoogleAds from "@/components/sections/GoogleAds";
import Recommended from "@/components/sections/Recommended";

const page = () => {
  return (
    <div>
      <MainHeading
        top={"Find The Best Colleges"}
        bottom={"That Fit Your Goals"}
      />
      <div className="container mx-auto pb-16 pt-12 sm:pb-24 px-4 md:px-0">
        <FilterColleges />
      </div>
      <div className="container mx-auto pb-16 pt-12 sm:pb-24 px-4 md:px-0">
        <GoogleAds />
      </div>
      <div className="container mx-auto pb-16 sm:pb-24 px-4 md:px-0">
        <Recommended />
      </div>
    </div>
  );
};

export default page;
