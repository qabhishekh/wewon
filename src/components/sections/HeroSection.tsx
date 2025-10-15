"use client";
import React from 'react';
import { Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-4 text-center">
        
        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[var(--primary)] leading-tight md:leading-tight">
          You Earned the Rank.
          <br />
          Now Find the Right College.
        </h1>

        {/* Search Bar */}
        <div className="mt-6 md:mt-12 max-w-3xl mx-auto border-2 border-gray-300 rounded-full bg-white/10 shadow-lg">
          <form 
            className="relative flex items-center" 
            onSubmit={(e) => { e.preventDefault(); /* Handle search submission here */ }}
          >
            <input
              type="text"
              placeholder="Search for colleges, courses or exams"
              className="w-full h-16 pl-8 pr-24 text-lg text-gray-800 placeholder-gray-500 bg-white rounded-full focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-2 w-13 h-13 bg-[var(--primary)] rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-4 focus:ring-blue-500/50 cursor-pointer hover:bg-[var(--accent)]"
            >
              <Search className="h-6 w-6 text-white" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;