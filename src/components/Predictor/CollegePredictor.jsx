"use client";

import { useState } from "react";
import GoogleAds from "../sections/GoogleAds";

export default function CollegePredictor() {
  const [gender, setGender] = useState("Male");

  const genderButtons = [
    { id: "Male", label: "Male" },
    { id: "Female", label: "Female" },
    { id: "Other", label: "Other" },
  ];

  return (
    <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 my-10 px-4">
      
      {/* Left Column: Steps */}
      <div className="flex flex-col justify-center space-y-6">
        <GoogleAds adSlot="1234567890" />
        <div className="p-6 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[var(--foreground)]">
            Enter your exam details
          </h3>
          <p className="text-[var(--muted-text)] mt-1">
            Select your stream, exam, and rank
          </p>
        </div>
        <div className="p-6 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[var(--foreground)]">
            Add your preferences
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
            See your personalized college matches
          </p>
        </div>
        <p className="text-xs text-[var(--muted-text)] px-2">
          We never share your information. You can update details anytime.
        </p>
      </div>

      {/* Right Column: Predictor Form */}
      <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-3xl font-bold text-[var(--primary)]">
            College Predictor
          </h2>
          <span className="bg-[var(--light-blue)] text-[var(--primary)] text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap">
            Trusted by 50,000+ students
          </span>
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
          {/* Study Stream */}
          <div>
            <label
              htmlFor="studyStream"
              className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
            >
              Select Your Study Stream
            </label>
            <select
              id="studyStream"
              defaultValue="Medical"
              className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm bg-white text-[var(--muted-text)] focus:text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition"
            >
              <option>Medical</option>
              <option>Engineering</option>
              <option>Commerce</option>
              <option>Arts</option>
            </select>
          </div>

          {/* Select Exam */}
          <div>
            <label
              htmlFor="exam"
              className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
            >
              Select Exam
            </label>
            <select
              id="exam"
              defaultValue="NEET"
              className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm bg-white text-[var(--muted-text)] focus:text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition"
            >
              <option>NEET</option>
              <option>JEE Main</option>
              <option>JEE Advanced</option>
              <option>CUET</option>
            </select>
          </div>

          {/* Exam Rank/Score */}
          <div>
            <label
              htmlFor="rankScore"
              className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
            >
              Enter Exam rank/score
            </label>
            <input
              type="text"
              id="rankScore"
              placeholder="690"
              className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition placeholder:text-[var(--muted-text)]"
            />
            <p className="text-xs text-[var(--muted-text)] mt-1.5">
              You can also enter an expected rank if results are pending.
            </p>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
              Gender
            </label>
            <div className="flex space-x-2">
              {genderButtons.map((button) => (
                <button
                  key={button.id}
                  type="button"
                  onClick={() => setGender(button.id)}
                  className={`flex-1 p-3 border rounded-lg text-sm font-medium transition ${
                    gender === button.id
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "bg-white text-[var(--muted-text)] border-[var(--border)] hover:bg-[var(--muted-background)]"
                  }`}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>

          {/* Select Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
            >
              Select Your Category
            </label>
            <select
              id="category"
              defaultValue="General"
              className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm bg-white text-[var(--muted-text)] focus:text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition"
            >
              <option>General</option>
              <option>OBC</option>
              <option>SC</option>
              <option>ST</option>
              <option>EWS</option>
            </select>
          </div>

          {/* Select Home State */}
          <div>
            <label
              htmlFor="homeState"
              className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
            >
              Select Your Home State
            </label>
            <select
              id="homeState"
              defaultValue="Madhya Pradesh"
              className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm bg-white text-[var(--muted-text)] focus:text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition"
            >
              <option>Madhya Pradesh</option>
              <option>Uttar Pradesh</option>
              <option>Maharashtra</option>
              <option>Delhi</option>
              <option>Rajasthan</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-[var(--primary)] text-white font-semibold p-3.5 rounded-lg shadow-md hover:opacity-90 transition-opacity"
            >
              See My College Matches
            </button>
          </div>

          {/* Footer Text */}
          <p className="text-center text-xs text-[var(--muted-text)] pt-2">
            Powered by real-time admissions data and official 2025 cutoff
          </p>
        </form>
      </div>
    </div>
  );
}