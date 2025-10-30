"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// @ts-ignore
import "swiper/css";

// import required modules
import { Autoplay } from "swiper/modules";

// --- Data for the slider ---
// I'll use placeholder images. Replace with your actual data.
// The "AIIMS" and "IIT Bombay" data is duplicated to ensure the loop is visible
const colleges = [
  {
    name: "AIIMS - New Delhi", // Duplicate for looping
    imageUrl: "/herocolleges/Aiims.png", // Use your image path
  },
  {
    name: "Indian Institute of Technology, Bombay", // Duplicate for looping
    imageUrl: "/herocolleges/iit.jpg", // Use your image path
  },
  {
    name: "National Institute of Technology, Trichy", // Duplicate for looping
    imageUrl: "/herocolleges/nit.jpg", // Use your image path
  },
  {
    name: "AIIMS - New Delhi", // Duplicate for looping
    imageUrl: "/herocolleges/Aiims.png", // Use your image path
  },
  {
    name: "Indian Institute of Technology, Bombay", // Duplicate for looping
    imageUrl: "/herocolleges/iit.jpg", // Use your image path
  },
  {
    name: "National Institute of Technology, Trichy", // Duplicate for looping
    imageUrl: "/herocolleges/nit.jpg", // Use your image path
  },
];

const CollegesSlider = () => {
  return (
    // The white background is implied by the space around the rounded corners in your image
    <div className="bg-white py-16 sm:py-18">
      <div className="mx-auto pl-4">
        {/* You can add a title here if you wish, e.g.:
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Explore Top Colleges
        </h2>
        */}
        <Swiper
          modules={[Autoplay]}
          loop={true}
          grabCursor={true}
          centeredSlides={false}
          slidesPerView={1.25}
          spaceBetween={20}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 28 },
          }}
          className="w-full"
        >
          {colleges.map((college, index) => (
            <SwiperSlide key={index} className="rounded-2xl overflow-hidden">
              <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={college.imageUrl}
                  alt={college.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* College Name Text */}
                <div className="absolute w-full bottom-0 left-0 p-6">
                  <h3 className="text-white text-center text-sm font-semibold">
                    {college.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CollegesSlider;
