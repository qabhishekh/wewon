"use client";
import { BarChart3, Users, Calculator } from "lucide-react";

export default function PercentileConverter() {
  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 my-10 px-4">
      
      {/* Left Column: Ad & Steps */}
      <div className="flex flex-col space-y-6">
        {/* Google Ads Placeholder */}
        <div className="flex items-center justify-center min-h-[250px] p-6 bg-[var(--muted-background)] border border-[var(--border)] rounded-xl shadow-sm">
          <p className="text-2xl font-semibold text-[var(--muted-text)]">
            Google ADS
          </p>
        </div>

        {/* Steps */}
        <div className="p-6 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[var(--foreground)]">
            Enter your percentile
          </h3>
          <p className="text-[var(--muted-text)] mt-1">
            Select your stream, exam, and rank
          </p>
        </div>
        <div className="p-6 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[var(--foreground)]">
            Enter total number of candidates
          </h3>
          <p className="text-[var(--muted-text)] mt-1">
            Category, gender, and home state
          </p>
        </div>
        <div className="p-6 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[var(--foreground)]">
            Get instant results
          </h3>
          <p className="text-[var(--muted-text)] mt-1">
            See your percentage
          </p>
        </div>
        <p className="text-xs text-[var(--muted-text)] px-2">
          We never share your information. You can update details anytime.
        </p>
      </div>

      {/* Right Column: Converter Form */}
      <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-lg p-6 sm:p-8">
        
        {/* Header Icon */}
        <div className="flex justify-center mb-4">
          <span className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] bg-opacity-10 rounded-xl">
            {/* Lucide Icon */}
            <BarChart3 className="w-8 h-8 text-background" />
          </span>
        </div>

        {/* Header Text */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[var(--primary)]">
            Percentile Converter
          </h2>
          <p className="text-[var(--muted-text)] mt-2">
            Convert your percentile rank to percentage instantly
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            // Handle form submission logic here
            alert("Form submitted!");
          }}
        >
          {/* Class */}
          <div>
            <label
              htmlFor="class"
              className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
            >
              Class
            </label>
            <select
              id="class"
              defaultValue="12th Appeared - 2025"
              className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm bg-white text-[var(--muted-text)] focus:text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition"
            >
              <option>12th Appeared - 2025</option>
              <option>12th Passed - 2024</option>
              <option>Dropper</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
            >
              Category
            </label>
            <select
              id="category"
              defaultValue=""
              className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm bg-white text-[var(--muted-text)] focus:text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition"
            >
              <option value="" disabled>Select Category</option>
              <option>General</option>
              <option>OBC</option>
              <option>SC</option>
              <option>ST</option>
              <option>EWS</option>
            </select>
          </div>

          {/* JEE Main Marks */}
          <div>
            <label
              htmlFor="jeeMarks"
              className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
            >
              JEE Main Marks
            </label>
            <input
              type="text"
              id="jeeMarks"
              placeholder="Enter Marks"
              className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition placeholder:text-[var(--muted-text)]"
            />
          </div>

          {/* Total Candidates */}
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--foreground)] mb-1.5">
              {/* Lucide Icon */}
              <Users className="w-5 h-5 text-[var(--primary)]" />
              <span>Total Candidates</span>
            </div>
            <input
              type="text"
              id="totalCandidates"
              placeholder="Enter total number of candidates"
              className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition placeholder:text-[var(--muted-text)]"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] text-white font-semibold p-3.5 rounded-lg shadow-md hover:opacity-90 transition-opacity cursor-pointer"
            >
              {/* Lucide Icon */}
              <Calculator className="w-5 h-5" />
              Calculate Percentage
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}