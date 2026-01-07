import React, { useState } from "react";
import { X, Search, ChevronDown } from "lucide-react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleApplyFilter: () => void;
  selectedInstituteTypes: string[];
  onInstituteTypeChange: (value: string) => void;
  selectedCities: string[];
  onCityChange: (value: string) => void;
  onClearAllFilters: () => void;
}

export default function FilterModal({
  isOpen,
  onClose,
  handleApplyFilter,
  selectedInstituteTypes,
  onInstituteTypeChange,
  selectedCities,
  onCityChange,
  onClearAllFilters,
}: FilterModalProps) {
  const [activeTab, setActiveTab] = useState("Location");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchSpecialization, setSearchSpecialization] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Institute type options for ranking filters (same as desktop sidebar)
  const instituteTypeOptions = [
    { label: "IIT", value: "IIT" },
    { label: "IIIT", value: "IIIT" },
    { label: "NIT", value: "NIT" },
    { label: "GFTI", value: "GFTI" },
    { label: "Government Colleges", value: "Government" },
    { label: "Private Colleges", value: "Private" },
  ];

  const filterCategories = [
    "Location",
    "Course",
    "Total Fees",
    "Institute Type",
    "Ownership",
    "Mode Of Study",
    "Specialization",
    "Credential",
    "Course Level",
  ];

  const filterData: {
    [key: string]: Array<{ label: string; count?: number }>;
  } = {
    Location: [
      { label: "Delhi/NCR" },
      { label: "Mumbai (All)" },
      { label: "Bangalore" },
      { label: "Pune" },
      { label: "Kolkata" },
      { label: "Hyderabad" },
      { label: "Chennai" },
      { label: "Ahmedabad" },
      { label: "Jaipur" },
      { label: "Lucknow" },
      { label: "Chandigarh" },
      { label: "Indore" },
      { label: "Bhopal" },
      { label: "Nagpur" },
      { label: "Visakhapatnam" },
      { label: "Maharashtra" },
      { label: "Uttar Pradesh" },
      { label: "Karnataka" },
      { label: "Andhra Pradesh" },
      { label: "Tamil Nadu" },
      { label: "West Bengal" },
      { label: "Rajasthan" },
      { label: "Gujarat" },
      { label: "Madhya Pradesh" },
    ],
    Course: [
      { label: "MBA/PGDM" },
      { label: "BBA" },
      { label: "B.Tech/B.E." },
      { label: "M.Tech" },
      { label: "B.Com" },
      { label: "M.Com" },
      { label: "BCA" },
      { label: "MCA" },
      { label: "BA" },
      { label: "MA" },
      { label: "B.Sc" },
      { label: "M.Sc" },
      { label: "LLB" },
      { label: "LLM" },
      { label: "BDS" },
      { label: "MBBS" },
      { label: "MD/MS" },
      { label: "B.Ed" },
      { label: "M.Ed" },
      { label: "B.Pharma" },
      { label: "M.Pharma" },
      { label: "Hotel Management" },
      { label: "Fashion Design" },
      { label: "Architecture" },
    ],
    TotalFees: [
      { label: "Free", count: 2 },
      { label: "< 1 Lakh", count: 310 },
      { label: "1 - 2 Lakh", count: 1181 },
      { label: "2 - 3 Lakh", count: 2036 },
      { label: "3 - 5 Lakh", count: 1183 },
      { label: "> 5 Lakh", count: 830 },
    ],
    Specialization: [
      { label: "Finance" },
      { label: "Marketing" },
      { label: "Human Resource Management" },
      { label: "Operations Management" },
      { label: "Business Analytics" },
      { label: "Information Technology" },
      { label: "International Business" },
      { label: "Entrepreneurship" },
      { label: "Supply Chain Management" },
      { label: "Healthcare Management" },
      { label: "Digital Marketing" },
      { label: "Data Science" },
      { label: "Banking & Insurance" },
      { label: "Rural Management" },
      { label: "Retail Management" },
      { label: "Project Management" },
      { label: "Strategic Management" },
      { label: "Consulting" },
      { label: "E-Commerce" },
      { label: "Real Estate Management" },
    ],
    Credential: [
      { label: "Degree" },
      { label: "Diploma" },
      { label: "Certificate" },
      { label: "PG Diploma" },
      { label: "Advanced Diploma" },
      { label: "Integrated Program" },
      { label: "Dual Degree" },
    ],
    CourseLevel: [
      { label: "UG", count: 4826 },
      { label: "After 10th", count: 11 },
      { label: "PG", count: 4 },
    ],
    ModeOfStudy: [
      { label: "Full Time", count: 4829 },
      { label: "Distance / Correspondence", count: 109 },
      { label: "Online", count: 58 },
      { label: "Part Time - Classroom", count: 38 },
      { label: "Blend", count: 2 },
    ],
    Ownership: [
      { label: "Government" },
      { label: "Private" },
      { label: "Government-Aided" },
      { label: "Deemed University" },
      { label: "Central University" },
      { label: "State University" },
      { label: "Private University" },
      { label: "Autonomous" },
      { label: "Public-Private Partnership" },
    ],
  };

  const handleClearFilters = () => {
    onClearAllFilters();
    setSearchLocation("");
    setSearchSpecialization("");
  };

  const getFilteredOptions = (category: string) => {
    const options = filterData[category.split(" ").join("")] || [];
    if (category === "Location" && searchLocation) {
      return options.filter((location) =>
        location.label.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }
    if (category === "Specialization" && searchSpecialization) {
      return options.filter((specialization) =>
        specialization.label
          .toLowerCase()
          .includes(searchSpecialization.toLowerCase())
      );
    }
    return options;
  };

  const getCategoryKey = (category: string) => {
    return category.replace(/\s+/g, "");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black overlay max-sm:p-0"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[82vh] rounded-2xl shadow-2xl flex flex-col max-sm:rounded-none max-sm:max-h-full max-sm:h-full"
        style={{ backgroundColor: "#ffffff" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 max-sm:p-4">
          <h2
            className="text-2xl font-bold max-sm:text-xl"
            style={{ color: "#0D3A66" }}
          >
            All Filters
          </h2>
          <div className="flex items-center gap-3 max-sm:gap-2">
            <button
              onClick={handleApplyFilter}
              className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all hover:opacity-90 max-sm:px-4 max-sm:py-2 max-sm:text-xs"
              style={{
                backgroundColor: "var(--accent)",
                color: "#ffffff",
              }}
            >
              Apply Filters
            </button>
            <button
              onClick={handleClearFilters}
              className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all hover:opacity-90 max-sm:px-4 max-sm:py-2 max-sm:text-xs"
              style={{
                backgroundColor: "#0D3A66",
                color: "#ffffff",
              }}
            >
              Clear Filters
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-all hover:opacity-80"
              style={{
                backgroundColor: "#E8F4E8",
                color: "#0D3A66",
              }}
              aria-label="Close modal"
            >
              <X size={20} className="max-sm:w-5 max-sm:h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Category Dropdown */}
        <div className="hidden max-sm:block border-b border-gray-200 relative">
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="w-full px-4 py-4 flex items-center justify-between font-semibold text-sm"
            style={{ color: "#0D3A66" }}
          >
            <span>{activeTab}</span>
            <ChevronDown
              size={20}
              className={`transition-transform ${
                showCategoryDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showCategoryDropdown && (
            <div
              className="absolute top-full left-0 right-0 z-10 shadow-lg max-h-64 overflow-y-auto"
              style={{ backgroundColor: "#ffffff" }}
            >
              {filterCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveTab(category);
                    setShowCategoryDropdown(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm font-medium border-b transition-all"
                  style={{
                    backgroundColor:
                      activeTab === category ? "#E8F4E8" : "#ffffff",
                    color: "#000000",
                    borderColor: "#E5E7EB",
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden max-sm:flex-col">
          {/* Sidebar - Hidden on mobile */}
          <div
            className="w-64 border-r overflow-y-auto flex-shrink-0 border-gray-200 max-sm:hidden"
            style={{ backgroundColor: "#ffffff" }}
          >
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className="w-full px-6 py-5 text-left font-semibold transition-all border-b text-base relative"
                style={{
                  backgroundColor:
                    activeTab === category ? "#E8F4E8" : "#ffffff",
                  color: "#000000",
                  borderColor: "#E5E7EB",
                }}
              >
                {activeTab === category && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-2 rounded-r-3xl"
                    style={{ backgroundColor: "#0D3A66" }}
                  />
                )}
                {category}
              </button>
            ))}
          </div>

          {/* Filter Options */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex flex-col h-full">
              {/* Search Box - Only for Location */}
              {activeTab === "Location" && (
                <div className="mx-6 pt-6 pb-2 border-b flex-shrink-0 border-gray-200 max-sm:mx-4 max-sm:pt-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Location"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full pr-12 outline-none text-sm py-2 px-3 border border-gray-300 rounded-lg"
                    />
                    <Search
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      size={18}
                      style={{ color: "rgba(13, 58, 102, 0.4)" }}
                    />
                  </div>
                </div>
              )}
              {activeTab === "Specialization" && (
                <div className="mx-6 pt-6 pb-2 border-b flex-shrink-0 border-gray-200 max-sm:mx-4 max-sm:pt-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Specialization"
                      value={searchSpecialization}
                      onChange={(e) => setSearchSpecialization(e.target.value)}
                      className="w-full pr-12 outline-none text-sm py-2 px-3 border border-gray-300 rounded-lg"
                    />
                    <Search
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      size={18}
                      style={{ color: "rgba(13, 58, 102, 0.4)" }}
                    />
                  </div>
                </div>
              )}

              {/* Checkboxes - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 pt-4 max-sm:p-4 max-sm:pt-3">
                <div className="space-y-4 max-sm:space-y-3">
                  {activeTab === "Institute Type"
                    ? // Institute Type filter with controlled state from parent
                      instituteTypeOptions.map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={
                              selectedInstituteTypes?.includes(option.value) ??
                              false
                            }
                            onChange={() => onInstituteTypeChange(option.value)}
                            className="w-5 h-5 cursor-pointer max-sm:w-4 max-sm:h-4"
                            style={{
                              accentColor: "#0D3A66",
                            }}
                          />
                          <span
                            className="ml-3 text-sm font-medium group-hover:opacity-80 max-sm:text-xs max-sm:ml-2"
                            style={{ color: "#0D3A66" }}
                          >
                            {option.label}
                          </span>
                        </label>
                      ))
                    : activeTab === "Location"
                    ? // Location filter with controlled state from parent
                      getFilteredOptions(activeTab).map((option) => (
                        <label
                          key={option.label}
                          className="flex items-center cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={
                              selectedCities?.includes(option.label) ?? false
                            }
                            onChange={() => onCityChange(option.label)}
                            className="w-5 h-5 cursor-pointer max-sm:w-4 max-sm:h-4"
                            style={{
                              accentColor: "#0D3A66",
                            }}
                          />
                          <span
                            className="ml-3 text-sm font-medium group-hover:opacity-80 max-sm:text-xs max-sm:ml-2"
                            style={{ color: "#0D3A66" }}
                          >
                            {option.label}
                          </span>
                        </label>
                      ))
                    : // Other filters (currently display only - not connected to API)
                      getFilteredOptions(activeTab).map((option) => (
                        <label
                          key={option.label}
                          className="flex items-center cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            className="w-5 h-5 cursor-pointer max-sm:w-4 max-sm:h-4"
                            style={{
                              accentColor: "#0D3A66",
                            }}
                          />
                          <span
                            className="ml-3 text-sm font-medium group-hover:opacity-80 max-sm:text-xs max-sm:ml-2"
                            style={{ color: "#0D3A66" }}
                          >
                            {option.label}
                          </span>
                        </label>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
