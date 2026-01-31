"use client";
import React, { useState } from "react";

// --- Icon Import ---
import { ChevronRight, ChevronLeft } from "lucide-react"; // Replaced custom SVG with lucide-react

// --- Swiper Imports ---
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// --- Swiper CSS Imports ---
//@ts-ignore
import "swiper/css";
import NewsCard from "../cards/NewsCard";
import Sections from "./sections";
import Heading from "./heading";

// --- Mock Data (Unchanged) ---
const categories = [
  "Exam Alerts",
  "College Alerts",
  "Admission Alerts",
  "Notifications",
];
const newsData = [
  {
    id: 1,
    title:
      "UP Board Class 12 Hindi Question Paper with Answer Key Code 301 ZG Available",
    date: "Oct 3, 2026",
    description:
      "UP Board Class 12 Hindi Question Paper With Answer Key Code 301 ZG Is Available For Download. The Exam Was Conducted By The Uttar Pradesh Board...",
    link: "#",
  },
  {
    id: 2,
    title:
      "CBSE Class 10 Science Sample Paper 2026 Released with Marking Scheme",
    date: "Oct 2, 2026",
    description:
      "The Central Board of Secondary Education has released the official sample paper for Class 10 Science examination along with detailed marking scheme...",
    link: "#",
  },
  {
    id: 3,
    title:
      "JEE Main 2026 Registration Begins: Important Dates and Application Process",
    date: "Oct 1, 2026",
    description:
      "National Testing Agency has announced the registration process for JEE Main 2026. Students can apply online through the official website...",
    link: "#",
  },
  {
    id: 4,
    title:
      "UP Board Class 12 Hindi Question Paper with Answer Key Code 301 ZG Available",
    date: "Oct 3, 2026",
    description:
      "UP Board Class 12 Hindi Question Paper With Answer Key Code 301 ZG Is Available For Download. The Exam Was Conducted By The Uttar Pradesh Board...",
    link: "#",
  },
  {
    id: 5,
    title:
      "CBSE Class 10 Science Sample Paper 2026 Released with Marking Scheme",
    date: "Oct 2, 2026",
    description:
      "The Central Board of Secondary Education has released the official sample paper for Class 10 Science examination along with detailed marking scheme...",
    link: "#",
  },
  {
    id: 6,
    title:
      "JEE Main 2026 Registration Begins: Important Dates and Application Process",
    date: "Oct 1, 2026",
    description:
      "National Testing Agency has announced the registration process for JEE Main 2026. Students can apply online through the official website...",
    link: "#",
  },
];

// --- Main Section Component (Updated) ---
const NewsSection = () => {
  const [activeCategory, setActiveCategory] = useState("Exam Alerts");

  return (
    <Sections>
      <div className="container mx-auto px-4 pt-4 sm:pt-12 sm:px-6 lg:px-8">
        {/* Section Header (Unchanged) */}
        <Heading text="Latest News & Stories" centered />

        {/* Filter Chips (Unchanged) */}
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

        {/* --- Swiper Slider Container --- */}
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
            {newsData.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <NewsCard
                  title={item.title}
                  date={item.date}
                  description={item.description}
                  link={item.link}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* --- Custom Previous Button --- */}
          <button
            aria-label="Previous story"
            className="swiper-button-prev-custom hidden lg:flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg absolute top-1/2 -left-6 -translate-y-1/2 z-10 hover:shadow-xl transition-all duration-300 swiper-button-disabled:opacity-0 cursor-pointer swiper-button-disabled:cursor-not-allowed swiper-button-disabled:-left-0"
          >
            <ChevronLeft className="w-6 h-6 text-[var(--primary)]" />
          </button>

          {/* --- Custom Next Button (Updated) --- */}
          <button
            aria-label="Next story"
            className="swiper-button-next-custom hidden lg:flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg absolute top-1/2 -right-6 -translate-y-1/2 z-10 hover:shadow-xl transition-all duration-300 cursor-pointer swiper-button-disabled:opacity-0 swiper-button-disabled:cursor-not-allowed swiper-button-disabled:-right-0"
          >
            {/* --- Replaced with Lucide icon --- */}
            <ChevronRight className="w-6 h-6 text-[var(--primary)]" />
          </button>
        </div>
      </div>
    </Sections>
  );
};

export default NewsSection;
