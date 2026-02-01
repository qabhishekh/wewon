"use client";
import React from "react";
import MainHeading from "./MainHeading";
import SearchBar from "./SearchBar";

const HeroSection = () => {

  return (
    <section className="text-white">
      {/* Headline */}
      <MainHeading
        top={"Welcome to colleges khojo"}
        bottom={"Associated with We Won Academy"}
      />

      {/* Search Bar */}
      <SearchBar
        placeholder={"Search for colleges"}
      />
    </section>
  );
};

export default HeroSection;
