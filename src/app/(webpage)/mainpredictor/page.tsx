import React from "react";
import CollegePredictor from "@/components/Predictor/CollegePredictor";
import MainHeading from "@/components/sections/MainHeading";
import Recommended from "@/components/sections/Recommended";

export default function page() {
  return (
    <>
      <div className="container mx-auto mb-8 px-4">
        <MainHeading top="Find Your Perfect College" bottom="With Our Tool" />
      </div>
      <div className="container mx-auto px-4">
        <CollegePredictor />
        <div className="mb-16">
          <Recommended />
        </div>
      </div>
    </>
  );
}
