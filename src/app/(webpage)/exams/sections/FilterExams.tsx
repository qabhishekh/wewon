"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import Pagination from "@/components/sections/Pagination";
import { useRouter } from "next/navigation";
import ExamCard from "@/components/cards/ExamCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectExams,
  selectExamsLoading,
  selectExamsError,
  selectTotalPages,
  selectCurrentPage,
} from "@/store/exam/examSlice";
import { fetchExams } from "@/store/exam/examThunk";

export default function FilterExams() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const exams = useAppSelector(selectExams);
  const loading = useAppSelector(selectExamsLoading);
  const error = useAppSelector(selectExamsError);
  const totalPages = useAppSelector(selectTotalPages);
  const currentPage = useAppSelector(selectCurrentPage);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const itemsPerPage = 8;

  // Fetch exams on component mount
  useEffect(() => {
    dispatch(fetchExams({ page: 1, limit: 100 })); // Fetch more items for client-side filtering
  }, [dispatch]);

  // Filter exams based on search query
  const filteredExams = exams.filter((exam) =>
    exam.examName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination for filtered results
  const totalFilteredPages = Math.ceil(filteredExams.length / itemsPerPage);
  const [localPage, setLocalPage] = useState(1);
  const startIndex = (localPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExams = filteredExams.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setLocalPage(page);
  };

  const handleKnowMore = (examId: string) => {
    router.push(`/exams/${examId}`);
  };

  // Reset to page 1 when search query changes
  useEffect(() => {
    setLocalPage(1);
  }, [searchQuery]);

  return (
    <div className="min-h-screen py-6 md:py-8 lg:py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <h1
          className="text-3xl md:text-4xl font-semibold"
          style={{ color: "#0D3A66" }}
        >
          Filter Exams
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
              placeholder="Search for Exams"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          >
            <Search size={20} style={{ color: "#ffffff" }} />
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0D3A66]"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* No Results */}
      {!loading && !error && currentExams.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            {searchQuery
              ? "No exams found matching your search."
              : "No exams available."}
          </p>
        </div>
      )}

      {/* Exam Grid */}
      {!loading && !error && currentExams.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentExams.map((exam) => (
              <ExamCard
                exam={exam}
                key={exam._id}
                handleKnowMore={handleKnowMore}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={localPage}
            totalPages={totalFilteredPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
