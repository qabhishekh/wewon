"use client";
import React, { useState, useEffect } from "react";
import { Search, Loader2, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MainHeading from "@/components/sections/MainHeading";
import Pagination from "@/components/sections/Pagination";
import apiClient from "@/hooks/Axios";

// Alert type mapping
const categoryTypeMap: { [key: string]: string } = {
  all: "",
  exam: "exam",
  college: "college",
  admission: "admission",
  notification: "notification",
};

const categoryLabels: { [key: string]: string } = {
  all: "All News",
  exam: "Exam Alerts",
  college: "College Alerts",
  admission: "Admission Alerts",
  notification: "Notifications",
};

interface Alert {
  _id: string;
  title: string;
  message: string;
  type: string;
  link: string;
  thumbnail?: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Helper function to strip HTML and get plain text for preview
const stripHtml = (html: string): string => {
  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>/g, "");
  }
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

// Format date helper
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Get type badge color
const getTypeBadgeColor = (type: string): string => {
  switch (type) {
    case "exam":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "college":
      return "bg-green-100 text-green-700 border-green-200";
    case "admission":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "notification":
      return "bg-orange-100 text-orange-700 border-orange-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 12;

  // Fetch alerts
  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params: Record<string, string | number | boolean> = {
          isActive: true,
          page: currentPage,
          limit: itemsPerPage,
        };

        if (activeCategory !== "all") {
          params.type = categoryTypeMap[activeCategory];
        }

        const response = await apiClient.get("/api/alerts", { params });
        setAlerts(response.data?.data || []);
        setTotalPages(response.data?.pagination?.pages || 1);
        setTotalCount(response.data?.pagination?.total || 0);
      } catch (err) {
        console.error("Failed to fetch alerts:", err);
        setError("Failed to load news");
        setAlerts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [activeCategory, currentPage]);

  // Filter alerts based on search
  const filteredAlerts = alerts.filter((alert) =>
    alert.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div>
      <MainHeading top={"Latest News"} bottom={"& Updates"} />

      <div className="container mx-auto pb-16 pt-12 sm:pb-24 px-4">
        {/* Search and Filter Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap">
            {Object.keys(categoryLabels).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-12 pr-4 rounded-xl border border-gray-200 outline-none focus:border-[var(--primary)] transition-colors"
            />
          </div>
        </div>

        {/* Results Count */}
        {!loading && (
          <p className="text-gray-500 mb-6">
            Showing {filteredAlerts.length} of {totalCount} news articles
          </p>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[var(--primary)]" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
            <p className="text-red-500 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredAlerts.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <p className="text-gray-500 text-lg">No news found.</p>
            <p className="text-gray-400 mt-2">
              Try changing the category or search term.
            </p>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && filteredAlerts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlerts.map((alert) => (
              <Link
                key={alert._id}
                href={alert.link || `/news/${alert.slug}`}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-[var(--primary)]/20 transition-all duration-300"
              >
                {/* Thumbnail */}
                {alert.thumbnail && (
                  <div className="relative w-full h-48">
                    <Image
                      src={alert.thumbnail}
                      alt={alert.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* Card Header */}
                <div className="p-6">
                  {/* Type Badge */}
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getTypeBadgeColor(
                      alert.type,
                    )}`}
                  >
                    {categoryLabels[alert.type] || alert.type}
                  </span>

                  {/* Title */}
                  <h3 className="mt-4 text-lg font-bold text-[var(--primary)] leading-tight line-clamp-2 transition-colors">
                    {alert.title}
                  </h3>

                  {/* Date */}
                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(alert.createdAt)}</span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {stripHtml(alert.message).substring(0, 150)}...
                  </p>

                  {/* Read More */}
                  <div className="mt-5 flex items-center gap-2 text-[var(--primary)] font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
