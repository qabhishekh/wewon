import React from "react";
import UPTACCollegePredictor from "@/components/Predictor/UPTACCollegePredictor";
import MainHeading from "@/components/sections/MainHeading";
import Recommended from "@/components/sections/Recommended";

export default function page() {
  return (
    <>
      <div className="container mx-auto mb-8 px-4">
        <MainHeading
          top="UPTAC College Predictor"
          bottom="Find Your Perfect College"
        />
      </div>
      <div className="container mx-auto px-4">
        <UPTACCollegePredictor />
        <div className="mb-16">
          <Recommended />
        </div>
      </div>
    </>
  );
}
