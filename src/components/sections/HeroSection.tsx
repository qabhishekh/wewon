"use client";
import React from "react";
import MainHeading from "./MainHeading";
import SearchBar from "./SearchBar";

const HeroSection = () => {
  const onSearch = () => {};
  return (
    <section className="text-white">
      {/* Headline */}
      <MainHeading
        top={"You Earned the Rank."}
        bottom={"Now Find the Right College"}
      />

      {/* Search Bar */}
      <SearchBar
        onSearch={onSearch}
        placeholder={"Search for colleges, courses or exams"}
      />
    </section>
  );
};

export default HeroSection;
