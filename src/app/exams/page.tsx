import MainHeading from "@/components/sections/MainHeading";
import React from "react";
import FilterExams from "./sections/FilterExams";
import GoogleAds from "@/components/sections/GoogleAds";
import Popular from "@/components/sections/Popular";

const page = () => {
  return (
    <div>
      <MainHeading
        top={"Stay Updated With Upcoming"}
        bottom={"Exams And Results"}
      />
      <div className="container mx-auto px-4">
        <FilterExams />
      </div>
      <div className="container mx-auto px-4">
        <GoogleAds />
      </div>
      <div className="container mx-auto px-4">
        <Popular />
      </div>
    </div>
  );
};

export default page;
