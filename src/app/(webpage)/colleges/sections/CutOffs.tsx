import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import DynamicTable from "@/components/sections/DynamicTable";
import SubHeading from "@/components/sections/SubHeading";

interface FilterOption {
  label: string;
  value: string;
}

interface CutOffsFilterProps {
  categories?: FilterOption[];
  seatPools?: FilterOption[];
  onFilter?: (filters: { category: string; seatPool: string }) => void;
  title?: string;
}

export default function CutOffsFilter({
  categories = [
    { label: "All Categories", value: "all" },
    { label: "General", value: "general" },
    { label: "OBC", value: "obc" },
    { label: "SC", value: "sc" },
    { label: "ST", value: "st" },
    { label: "EWS", value: "ews" },
  ],
  seatPools = [
    { label: "Gender Neutral", value: "gender_neutral" },
    { label: "Female Only", value: "female_only" },
    { label: "Both", value: "both" },
  ],
  onFilter,
  title = "CutOffs",
}: CutOffsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].value);
  const [selectedSeatPool, setSelectedSeatPool] = useState(seatPools[0].value);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSeatPoolOpen, setIsSeatPoolOpen] = useState(false);
  const [cuttOffs, setcuttOffs] = useState<any>({
    columns: [
      { key: "branch", label: "Branch", align: "left" },
      { key: "opening", label: "Opening", align: "right" },
      { key: "closing", label: "Closing", align: "right" },
    ],
    data: [
      { branch: "Civil Engineering", opening: "18286", closing: "20877" },
      {
        branch: "Computer Science and Engineering",
        opening: "10000",
        closing: "15000",
      },
      { branch: "Electrical Engineering", opening: "15000", closing: "18000" },
      { branch: "Mechanical Engineering", opening: "17000", closing: "20000" },
      {
        branch: "Electronics and Communication Engineering",
        opening: "12000",
        closing: "16000",
      },
    ],
  });

  const handleCategorySelect = (value: string) => {
    setSelectedCategory(value);
    setIsCategoryOpen(false);
  };

  const handleSeatPoolSelect = (value: string) => {
    setSelectedSeatPool(value);
    setIsSeatPoolOpen(false);
  };

  const handleFind = () => {
    if (onFilter) {
      onFilter({
        category: selectedCategory,
        seatPool: selectedSeatPool,
      });
    }
    console.log("Filters:", {
      category: selectedCategory,
      seatPool: selectedSeatPool,
    });
  };

  const getCategoryLabel = () => {
    return (
      categories.find((c) => c.value === selectedCategory)?.label || "Category"
    );
  };

  const getSeatPoolLabel = () => {
    return (
      seatPools.find((s) => s.value === selectedSeatPool)?.label || "Seat Pool"
    );
  };

  return (
    <div
      className="w-full px-6 lg:px-12"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <SubHeading top="Cutoffs" align="left" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsCategoryOpen(!isCategoryOpen);
              setIsSeatPoolOpen(false);
            }}
            className="w-full px-6 py-4 bg-white border-2 border-gray-300 rounded-2xl flex items-center justify-between text-base md:text-lg font-medium hover:border-primary transition-colors"
          >
            <span className="text-gray-700">{getCategoryLabel()}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${
                isCategoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isCategoryOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategorySelect(category.value)}
                  className={`w-full px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                    selectedCategory === category.value
                      ? "bg-gray-100 font-semibold"
                      : ""
                  }`}
                  style={
                    selectedCategory === category.value
                      ? { color: "var(--primary)" }
                      : {}
                  }
                >
                  {category.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Seat Pool Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setIsSeatPoolOpen(!isSeatPoolOpen);
              setIsCategoryOpen(false);
            }}
            className="w-full px-6 py-4 bg-white border-2 border-gray-300 rounded-2xl flex items-center justify-between text-base md:text-lg font-medium hover:border-primary transition-colors"
          >
            <span className="text-gray-700">{getSeatPoolLabel()}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-600 transition-transform ${
                isSeatPoolOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSeatPoolOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-lg overflow-hidden">
              {seatPools.map((pool) => (
                <button
                  key={pool.value}
                  onClick={() => handleSeatPoolSelect(pool.value)}
                  className={`w-full px-6 py-3 text-left border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${
                    selectedSeatPool === pool.value
                      ? "bg-gray-100 font-semibold"
                      : ""
                  }`}
                  style={
                    selectedSeatPool === pool.value
                      ? { color: "var(--primary)" }
                      : {}
                  }
                >
                  {pool.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Find Button */}
        <button
          onClick={handleFind}
          className="w-full px-6 py-4 rounded-2xl text-white font-semibold text-base md:text-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "var(--primary)" }}
        >
          Find
        </button>
      </div>

      <DynamicTable columns={cuttOffs.columns} data={cuttOffs.data} />

      {/* Click outside to close dropdowns */}
      {(isCategoryOpen || isSeatPoolOpen) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setIsCategoryOpen(false);
            setIsSeatPoolOpen(false);
          }}
        />
      )}
    </div>
  );
}
