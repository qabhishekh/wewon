"use client";
import React, { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import Pagination from "@/components/sections/Pagination";
import { useRouter } from "next/navigation";
import CollegeCard from "@/components/cards/CollegeCard";
import FilterModal from "@/components/filter/FilterModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchColleges } from "@/store/college/collegeThunk";
import {
  selectColleges,
  selectCollegesLoading,
  selectCollegesError,
  selectTotalPages,
  selectCurrentPage,
  selectTotalColleges,
} from "@/store/college/collegeSlice";

export default function FilterColleges() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Redux state
  const colleges = useAppSelector(selectColleges);
  const loading = useAppSelector(selectCollegesLoading);
  const error = useAppSelector(selectCollegesError);
  const totalPages = useAppSelector(selectTotalPages);
  const currentPage = useAppSelector(selectCurrentPage);
  const totalColleges = useAppSelector(selectTotalColleges);

  // Local state
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  // Pending filters (selected but not yet applied)
  const [selectedInstituteTypes, setSelectedInstituteTypes] = useState<
    string[]
  >([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  // Applied filters (used for API calls)
  const [appliedInstituteTypes, setAppliedInstituteTypes] = useState<string[]>(
    []
  );
  const [appliedCities, setAppliedCities] = useState<string[]>([]);
  const itemsPerPage = 10;

  // Institute type options for ranking filters
  const instituteTypeOptions = [
    { label: "IIT", value: "IIT" },
    { label: "IIIT", value: "IIIT" },
    { label: "NIT", value: "NIT" },
    { label: "GFTI", value: "GFTI" },
    { label: "Government Colleges", value: "Government" },
    { label: "Private Colleges", value: "Private" },
  ];

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch colleges on mount and when page, search, or applied filters change
  useEffect(() => {
    dispatch(
      fetchColleges({
        page: currentPage,
        limit: itemsPerPage,
        searchQuery: debouncedSearch,
        instituteTypes: appliedInstituteTypes,
        cities: appliedCities,
      })
    );
  }, [
    dispatch,
    currentPage,
    debouncedSearch,
    appliedInstituteTypes,
    appliedCities,
  ]);

  const handlePageChange = (page: number) => {
    dispatch(
      fetchColleges({
        page,
        limit: itemsPerPage,
        searchQuery: debouncedSearch,
        instituteTypes: appliedInstituteTypes,
        cities: appliedCities,
      })
    );
  };

  const handleKnowMore = (collegeId: string) => {
    router.push(`/colleges/${collegeId}`);
  };

  const handleApplyFilter = () => {
    // Apply the pending filters
    setAppliedInstituteTypes([...selectedInstituteTypes]);
    setAppliedCities([...selectedCities]);
    setIsFilterOpen(false);
  };

  // Handle institute type filter change
  const handleInstituteTypeChange = (value: string) => {
    setSelectedInstituteTypes((prev) =>
      prev.includes(value)
        ? prev.filter((type) => type !== value)
        : [...prev, value]
    );
  };

  // Handle city filter change
  const handleCityChange = (value: string) => {
    setSelectedCities((prev) =>
      prev.includes(value)
        ? prev.filter((city) => city !== value)
        : [...prev, value]
    );
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    setSelectedInstituteTypes([]);
    setAppliedInstituteTypes([]);
    setSelectedCities([]);
    setAppliedCities([]);
    setSearchQuery("");
    setDebouncedSearch("");
  };

  const handleSearch = () => {
    // Trigger immediate search
    setDebouncedSearch(searchQuery);
  };

  // Map API college data to CollegeCard format
  const mappedColleges = colleges.map((college) => ({
    id: college._id,
    name: college.Abbreviation || college.Name,
    location: `${college.City}, ${college.State}`,
    city: college.City,
    established: `Estd. ${college.Est_Year}`,
    nirf: "N/A", // Not available in API
    naac: "N/A", // Not available in API
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
  }));

  return (
    <div className="flex gap-6">
      {/* Left Sidebar - Filters (Desktop Only) */}
      <aside className="hidden lg:block w-72 flex-shrink-0">
        <div className="sticky top-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h2
                className="text-xl font-semibold"
                style={{ color: "#0D3A66" }}
              >
                Filters
              </h2>
            </div>

            {/* Scrollable Filter Content */}
            <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
              {/* Location Filter */}
              <div className="p-5 border-b border-gray-200">
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#0D3A66" }}
                >
                  Location
                </h3>
                <input
                  type="text"
                  placeholder="Search location..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0D3A66] mb-3"
                />
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {[
                    "Delhi/NCR",
                    "Mumbai (All)",
                    "Bangalore",
                    "Pune",
                    "Kolkata",
                    "Hyderabad",
                    "Chennai",
                    "Ahmedabad",
                    "Jaipur",
                    "Lucknow",
                    "Chandigarh",
                    "Indore",
                    "Bhopal",
                    "Nagpur",
                    "Visakhapatnam",
                    "Maharashtra",
                    "Uttar Pradesh",
                    "Karnataka",
                    "Andhra Pradesh",
                    "Tamil Nadu",
                    "West Bengal",
                    "Rajasthan",
                    "Gujarat",
                    "Madhya Pradesh",
                  ].map((location) => (
                    <label
                      key={location}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCities.includes(location)}
                        onChange={() => handleCityChange(location)}
                        className="w-4 h-4 cursor-pointer"
                        style={{ accentColor: "#0D3A66" }}
                      />
                      <span
                        className="ml-2 text-sm"
                        style={{ color: "#0D3A66" }}
                      >
                        {location}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Course Filter */}
              <div className="p-5 border-b border-gray-200">
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#0D3A66" }}
                >
                  Course
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {[
                    "MBA/PGDM",
                    "BBA",
                    "B.Tech/B.E.",
                    "M.Tech",
                    "B.Com",
                    "M.Com",
                    "BCA",
                    "MCA",
                    "BA",
                    "MA",
                    "B.Sc",
                    "M.Sc",
                    "LLB",
                    "LLM",
                    "BDS",
                    "MBBS",
                    "MD/MS",
                    "B.Ed",
                    "M.Ed",
                    "B.Pharma",
                    "M.Pharma",
                    "Hotel Management",
                    "Fashion Design",
                    "Architecture",
                  ].map((course) => (
                    <label
                      key={course}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 cursor-pointer"
                        style={{ accentColor: "#0D3A66" }}
                      />
                      <span
                        className="ml-2 text-sm"
                        style={{ color: "#0D3A66" }}
                      >
                        {course}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Total Fees Filter */}
              <div className="p-5 border-b border-gray-200">
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#0D3A66" }}
                >
                  Total Fees
                </h3>
                <div className="space-y-2">
                  {[
                    "Free",
                    "< 1 Lakh",
                    "1 - 2 Lakh",
                    "2 - 3 Lakh",
                    "3 - 5 Lakh",
                    "> 5 Lakh",
                  ].map((fee) => (
                    <label
                      key={fee}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 cursor-pointer"
                        style={{ accentColor: "#0D3A66" }}
                      />
                      <span
                        className="ml-2 text-sm"
                        style={{ color: "#0D3A66" }}
                      >
                        {fee}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Institute Type / Ranking Filter */}
              <div className="p-5 border-b border-gray-200">
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#0D3A66" }}
                >
                  Institute Type / Ranking
                </h3>
                <div className="space-y-2">
                  {instituteTypeOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedInstituteTypes.includes(option.value)}
                        onChange={() => handleInstituteTypeChange(option.value)}
                        className="w-4 h-4 cursor-pointer"
                        style={{ accentColor: "#0D3A66" }}
                      />
                      <span
                        className="ml-2 text-sm"
                        style={{ color: "#0D3A66" }}
                      >
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ownership Filter */}
              <div className="p-5 border-b border-gray-200">
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#0D3A66" }}
                >
                  Ownership
                </h3>
                <div className="space-y-2">
                  {[
                    "Government",
                    "Private",
                    "Government-Aided",
                    "Deemed University",
                    "Central University",
                    "State University",
                    "Private University",
                    "Autonomous",
                    "Public-Private Partnership",
                  ].map((ownership) => (
                    <label
                      key={ownership}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 cursor-pointer"
                        style={{ accentColor: "#0D3A66" }}
                      />
                      <span
                        className="ml-2 text-sm"
                        style={{ color: "#0D3A66" }}
                      >
                        {ownership}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mode of Study Filter */}
              <div className="p-5 border-b border-gray-200">
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#0D3A66" }}
                >
                  Mode of Study
                </h3>
                <div className="space-y-2">
                  {[
                    "Full Time",
                    "Distance / Correspondence",
                    "Online",
                    "Part Time - Classroom",
                    "Blend",
                  ].map((mode) => (
                    <label
                      key={mode}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 cursor-pointer"
                        style={{ accentColor: "#0D3A66" }}
                      />
                      <span
                        className="ml-2 text-sm"
                        style={{ color: "#0D3A66" }}
                      >
                        {mode}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Specialization Filter */}
              <div className="p-5 border-b border-gray-200">
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#0D3A66" }}
                >
                  Specialization
                </h3>
                <input
                  type="text"
                  placeholder="Search specialization..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#0D3A66] mb-3"
                />
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {[
                    "Finance",
                    "Marketing",
                    "Human Resource Management",
                    "Operations Management",
                    "Business Analytics",
                    "Information Technology",
                    "International Business",
                    "Entrepreneurship",
                    "Supply Chain Management",
                    "Healthcare Management",
                    "Digital Marketing",
                    "Data Science",
                    "Banking & Insurance",
                    "Rural Management",
                    "Retail Management",
                    "Project Management",
                    "Strategic Management",
                    "Consulting",
                    "E-Commerce",
                    "Real Estate Management",
                  ].map((spec) => (
                    <label
                      key={spec}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 cursor-pointer"
                        style={{ accentColor: "#0D3A66" }}
                      />
                      <span
                        className="ml-2 text-sm"
                        style={{ color: "#0D3A66" }}
                      >
                        {spec}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Credential Filter */}
              <div className="p-5 border-b border-gray-200">
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#0D3A66" }}
                >
                  Credential
                </h3>
                <div className="space-y-2">
                  {[
                    "Degree",
                    "Diploma",
                    "Certificate",
                    "PG Diploma",
                    "Advanced Diploma",
                    "Integrated Program",
                    "Dual Degree",
                  ].map((cred) => (
                    <label
                      key={cred}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 cursor-pointer"
                        style={{ accentColor: "#0D3A66" }}
                      />
                      <span
                        className="ml-2 text-sm"
                        style={{ color: "#0D3A66" }}
                      >
                        {cred}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Course Level Filter */}
              <div className="p-5 border-b border-gray-200">
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#0D3A66" }}
                >
                  Course Level
                </h3>
                <div className="space-y-2">
                  {["UG", "After 10th", "PG"].map((level) => (
                    <label
                      key={level}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 cursor-pointer"
                        style={{ accentColor: "#0D3A66" }}
                      />
                      <span
                        className="ml-2 text-sm"
                        style={{ color: "#0D3A66" }}
                      >
                        {level}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 border-t border-gray-200 bg-gray-50 space-y-2">
              <button
                onClick={handleApplyFilter}
                className="w-full py-2.5 rounded-lg font-medium text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: "#0D3A66", color: "#ffffff" }}
              >
                Apply Filters
              </button>
              <button
                onClick={handleClearAllFilters}
                className="w-full py-2.5 rounded-lg font-medium text-sm transition-all hover:bg-gray-100 border border-gray-300"
                style={{ color: "#0D3A66" }}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Content Area */}
      <div className="flex-1 min-w-0">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <h1
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: "#0D3A66" }}
          >
            Filter Colleges
            {totalColleges > 0 && (
              <span className="text-lg font-normal ml-2 opacity-60">
                ({totalColleges} colleges)
              </span>
            )}
          </h1>

          {/* Search and Mobile Filter */}
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2"
                size={20}
                style={{ color: "rgba(13, 58, 102, 0.4)" }}
              />
              <input
                type="text"
                placeholder="Search for colleges"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-full py-3 pl-12 pr-4 rounded-lg outline-none transition-all"
                style={{
                  border: "1px solid rgba(13, 58, 102, 0.2)",
                  color: "#0D3A66",
                  backgroundColor: "#ffffff",
                }}
              />
            </div>

            <button
              className="p-3 rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: "#0D3A66" }}
              onClick={handleSearch}
            >
              <Search size={20} style={{ color: "#ffffff" }} />
            </button>

            {/* Mobile Filter Button */}
            <button
              className="lg:hidden p-3 rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: "#0D3A66" }}
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter size={20} style={{ color: "#ffffff" }} />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-200 rounded-lg h-80"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div
            className="p-6 rounded-lg text-center"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
            }}
          >
            <p style={{ color: "#DC2626" }} className="font-medium">
              {error}
            </p>
            <button
              onClick={() =>
                dispatch(
                  fetchColleges({
                    page: currentPage,
                    limit: itemsPerPage,
                    searchQuery: debouncedSearch,
                  })
                )
              }
              className="mt-4 px-6 py-2 rounded-lg transition-all hover:opacity-90"
              style={{ backgroundColor: "#0D3A66", color: "#ffffff" }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && mappedColleges.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: "#0D3A66" }} className="text-lg opacity-60">
              No colleges found. Try adjusting your search.
            </p>
          </div>
        )}

        {/* College Grid */}
        {!loading && !error && mappedColleges.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mappedColleges.map((college) => (
              <CollegeCard
                college={college}
                key={college.id}
                handleKnowMore={handleKnowMore}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {/* Mobile Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        handleApplyFilter={handleApplyFilter}
        selectedInstituteTypes={selectedInstituteTypes}
        onInstituteTypeChange={handleInstituteTypeChange}
        selectedCities={selectedCities}
        onCityChange={handleCityChange}
        onClearAllFilters={handleClearAllFilters}
      />
    </div>
  );
}
