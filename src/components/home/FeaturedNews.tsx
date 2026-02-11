"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
//@ts-ignore
import "swiper/css";
import NewsCard from "../cards/NewsCard";
import Sections from "./sections";
import Heading from "./heading";
import apiClient from "@/hooks/Axios";
import Link from "next/link";

// Alert type mapping
const categoryTypeMap: { [key: string]: string } = {
  "All News": "",
  "Exam Alerts": "exam",
  "College Alerts": "college",
  "Admission Alerts": "admission",
  Notifications: "notification",
};

const categories = [
  "All News",
  "Exam Alerts",
  "College Alerts",
  "Admission Alerts",
  "Notifications",
];

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

const NewsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All News");
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch alerts when category changes
  useEffect(() => {
    const fetchAlerts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get("/api/alerts", {
          params: {
            type: categoryTypeMap[activeCategory] || undefined,
            isActive: true,
            limit: 10,
          },
        });
        setAlerts(response.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch alerts:", err);
        setError("Failed to load news");
        setAlerts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [activeCategory]);

  return (
    <Sections>
      <div className="container mx-auto px-4 pt-4 sm:pt-12 sm:px-6 lg:px-8 mt">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Heading text="Latest News & Stories" centered={false} />
          <Link
            href="/news"
            className="text-[var(--primary)] font-semibold hover:underline flex items-center gap-1"
          >
            View All News
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Chips */}
        <div className="mt-8 flex gap-2 sm:gap-4 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  activeCategory === category
                    ? "bg-white text-[var(--primary)] shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)]" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && alerts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No news available in this category.</p>
          </div>
        )}

        {/* Swiper Slider Container */}
        {!loading && !error && alerts.length > 0 && (
          <div className="relative mt-8">
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={1.2}
              breakpoints={{
                640: { slidesPerView: 2.2 },
                1024: { slidesPerView: 4, spaceBetween: 25 },
              }}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              className="!pb-4"
              aria-live="polite"
            >
              {alerts.map((alert) => (
                <SwiperSlide key={alert._id} className="h-auto">
                  <NewsCard
                    id={alert._id}
                    slug={alert.slug}
                    title={alert.title}
                    date={formatDate(alert.createdAt)}
                    description={
                      typeof window !== "undefined"
                        ? stripHtml(alert.message).substring(0, 150) + "..."
                        : alert.message
                            .replace(/<[^>]*>/g, "")
                            .substring(0, 150) + "..."
                    }
                    link={alert.link || `/news/${alert.slug}`}
                    thumbnail={alert.thumbnail}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Custom Previous Button */}
            <button
              aria-label="Previous story"
              className="swiper-button-prev-custom hidden lg:flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg absolute top-1/2 -left-6 -translate-y-1/2 z-10 hover:shadow-xl transition-all duration-300 swiper-button-disabled:opacity-0 cursor-pointer swiper-button-disabled:cursor-not-allowed swiper-button-disabled:-left-0"
            >
              <ChevronLeft className="w-6 h-6 text-[var(--primary)]" />
            </button>

            {/* Custom Next Button */}
            <button
              aria-label="Next story"
              className="swiper-button-next-custom hidden lg:flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg absolute top-1/2 -right-6 -translate-y-1/2 z-10 hover:shadow-xl transition-all duration-300 cursor-pointer swiper-button-disabled:opacity-0 swiper-button-disabled:cursor-not-allowed swiper-button-disabled:-right-0"
            >
              <ChevronRight className="w-6 h-6 text-[var(--primary)]" />
            </button>
          </div>
        )}
      </div>
    </Sections>
  );
};

export default NewsSection;
