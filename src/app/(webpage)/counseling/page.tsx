import Counslings from "@/components/counseling/Counselings";
import SearchInput from "@/components/counseling/Search";
import GoogleAds from "@/components/sections/GoogleAds";
import MainHeading from "@/components/sections/MainHeading";
import Recommended from "@/components/sections/Recommended";
import React from "react";

const isLaunchingSoon = true; // TOGGLE THIS BOOLEAN

export default function page() {
  if (isLaunchingSoon) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-20 blur-2xl rounded-full animate-pulse" />
          <h1 className="relative text-5xl md:text-7xl font-black tracking-tighter text-[var(--primary)] mb-4">
            LAUNCHING <span className="text-[var(--accent)]">SOON...</span>
          </h1>
        </div>
        <p className="max-w-xl text-lg md:text-xl text-gray-500 font-medium">
          We're putting the finishing touches on our personalized career
          counseling platform. Get ready to unlock your bright future!
        </p>
        <div className="mt-12 flex gap-4">
          <div
            className="w-2 h-2 rounded-full bg-[var(--primary)] animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-[var(--accent)] animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="w-2 h-2 rounded-full bg-[var(--primary)] animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4">
        <MainHeading
          top="Personalized Career Counselling for"
          bottom="Your Bright Future"
        />
      </div>
      <div className="container mx-auto mt-10 px-4 ">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[var(--primary)]">
            Search Counselling
          </h2>
          <SearchInput placeholder="Counselling" />
        </div>
      </div>
      <div className="container mx-auto px-4">
        <Counslings />
      </div>
      <div className="container mx-auto pb-16 pt-12 sm:pb-24 px-4">
        <GoogleAds />
      </div>
      <div className="container mx-auto pb-16 sm:pb-24 px-4">
        <Recommended />
      </div>
    </>
  );
}
