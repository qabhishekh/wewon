import MainHeading from "@/components/sections/MainHeading";
import React from "react";
import FilterColleges from "./sections/FilterCollege";

const page = () => {
  return (
    <div>
      <MainHeading
        top={"Find The Best Colleges"}
        bottom={"That Fit Your Goals"}
      />
      <FilterColleges />
    </div>
  );
};

export default page;
