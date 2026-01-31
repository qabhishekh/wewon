import React from "react";
import PredictorsGrid from "@/components/Predictor/PredictorsGrid";
import MainHeading from "@/components/sections/MainHeading";
import Recommended from "@/components/sections/Recommended";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "College Predictors 2026 - JEE Mains, UPTAC, JOSAA & More",
  description:
    "Explore our wide range of college predictors for JEE Mains, UPTAC, HBTU, MMMUT, and more. Find the best engineering colleges based on your rank.",
};

export default function page() {
  return (
    <>
      <div className="container mx-auto mb-8 px-4">
        <MainHeading
          top="Choose Your College Predictor"
          bottom="Find Your Perfect Match"
        />
        <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
          Select from our range of college predictors to find the best colleges
          based on your rank and preferences. Get accurate predictions powered
          by previous year data and expert analysis.
        </p>
      </div>
      <div className="container mx-auto px-4">
        <PredictorsGrid />
        <div className="mb-16 mt-16">
          <Recommended />
        </div>
      </div>
    </>
  );
}
