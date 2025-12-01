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
  const itemsPerPage = 10;

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch colleges on mount and when page or search changes
  useEffect(() => {
    dispatch(
      fetchColleges({
        page: currentPage,
        limit: itemsPerPage,
        searchQuery: debouncedSearch,
      })
    );
  }, [dispatch, currentPage, debouncedSearch]);

  const handlePageChange = (page: number) => {
    dispatch(
      fetchColleges({
        page,
        limit: itemsPerPage,
        searchQuery: debouncedSearch,
      })
    );
  };

  const handleKnowMore = (collegeId: string) => {
    router.push(`/colleges/${collegeId}`);
  };

  const handleApplyFilter = (filters: any) => {
    setIsFilterOpen(false);
    // TODO: Implement filter logic with API
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
    <div className="">
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

        {/* Search and Filter */}
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

          <button
            className="p-3 rounded-lg transition-all hover:opacity-90"
            style={{ backgroundColor: "#0D3A66" }}
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter size={20} style={{ color: "#ffffff" }} />
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mappedColleges.map((college) => (
            <CollegeCard
              college={college}
              key={college.id}
              handleKnowMore={handleKnowMore}
            />
          ))}
        </div>
      )}

      <FilterModal
        handleApplyFilter={handleApplyFilter}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Pagination */}
      {!loading && !error && totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
