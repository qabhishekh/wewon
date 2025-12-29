"use client";

import React, { useState } from "react";
import PredictorCard from "./PredictorCard";
import { getActivePredictors } from "@/data/counsellingProducts";
import { PredictorCategory } from "@/store/types";

const PredictorsGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const predictors = getActivePredictors();

  // Filter predictors by category
  const filteredPredictors =
    selectedCategory === "all"
      ? predictors
      : predictors.filter((p) => p.category === selectedCategory);

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(predictors.map((p) => p.category))),
  ];

  return (
    <div className="w-full">
      {/* Category Filter */}
      {/* {categories.length > 2 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#0f3a67] text-white shadow-lg"
                    : "bg-white text-[#0f3a67] border-2 border-[#0f3a67] hover:bg-[#0f3a67] hover:text-white"
                }`}
              >
                {category === "all" ? "All Predictors" : category}
              </button>
            ))}
          </div>
        </div>
      )} */}

      {/* Predictors Grid */}
      {filteredPredictors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPredictors.map((predictor) => (
            <PredictorCard key={predictor.slug} predictor={predictor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            No predictors available in this category.
          </p>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-100">
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          🎯 Free College Prediction Tools
        </h3>
        <p className="text-gray-600 mb-4">
          All our college predictors are completely free! Click on any predictor
          card above to get started with your college predictions.
        </p>
      </div>
    </div>
  );
};

export default PredictorsGrid;
