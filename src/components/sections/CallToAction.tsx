"use client";
import React, { useState } from "react";
import MainHeading from "./MainHeading";
import { Mail } from "lucide-react";

export default function CallToAction() {
  const [email, setEmail] = useState<string>("");

  const handleClick = (): void => {
    console.log("Email submitted:", email);
  };

  return (
    <div
      className="flex items-center justify-center my-14"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div
        className="w-full container rounded-3xl p-12 md:p-16 lg:p-20"
        style={{
          backgroundColor: "var(--primary)",
          boxShadow: "0 20px 60px rgba(13, 58, 102, 0.3)",
        }}
      >
        <div className=" mx-auto text-center">
          <MainHeading
            top={"Your Game Plan for a Top Rank."}
            bottom={"We Won Academy"}
            className="text-white pt-0!"
          />

          <p
            className="text-base md:text-lg lg:text-xl mb-10 leading-relaxed text-[var(--muted-text)] max-w-[70%] text-center mx-auto"
          >
            Use our College Predictor tool to explore the 2025 admission
            cutoffs. Seeing the goalposts clearly is the first step to scoring
            the goal!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 w-full sm:max-w-md">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                <Mail size={20} color="var(--primary)" />
              </div>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-4 pl-14 pr-6 rounded-full text-base outline-none transition-all text-[var(--primary)] bg-[var(--background)]"
              />
            </div>

            <button
              onClick={handleClick}
              className="px-10 py-4 rounded-full font-semibold text-base transition-all whitespace-nowrap bg-[var(--background)] text-[var(--primary)] hover:bg-[var(--accent)] cursor-pointer"
            >
              Join Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
