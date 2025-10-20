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
      className="flex items-center justify-center p-4 md:p-6 my-8 md:my-14"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div
        className="w-full max-w-7xl rounded-3xl md:rounded-3xl p-8 md:p-12 lg:p-16 xl:p-20"
        style={{
          backgroundColor: "var(--primary)",
          boxShadow: "0 20px 60px rgba(13, 58, 102, 0.3)",
        }}
      >
        <div className="mx-auto text-center">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight px-2"
            style={{ color: "#ffffff" }}
          >
            Your Game Plan for a Top Rank
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            We Won Academy
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 md:mb-10 leading-relaxed px-2 max-w-3xl mx-auto"
            style={{ color: "rgba(255, 255, 255, 0.9)" }}
          >
            Use our College Predictor tool to explore the 2025 admission
            cutoffs. Seeing the goalposts clearly is the first step to scoring
            the goal!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center px-2">
            <div className="relative flex-1 w-full sm:max-w-md">
              <div className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:w-5 md:h-5"
                >
                  <path
                    d="M3.33334 3.33334H16.6667C17.5833 3.33334 18.3333 4.08334 18.3333 5.00001V15C18.3333 15.9167 17.5833 16.6667 16.6667 16.6667H3.33334C2.41668 16.6667 1.66668 15.9167 1.66668 15V5.00001C1.66668 4.08334 2.41668 3.33334 3.33334 3.33334Z"
                    stroke="rgba(13, 58, 102, 0.5)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.3333 5L10 10.8333L1.66666 5"
                    stroke="rgba(13, 58, 102, 0.5)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 md:py-4 pl-12 md:pl-14 pr-4 md:pr-6 rounded-full text-sm md:text-base outline-none transition-all"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "2px solid transparent",
                  color: "var(--primary)",
                }}
                onFocus={(e) =>
                  (e.target.style.border = "2px solid rgba(255, 255, 255, 0.3)")
                }
                onBlur={(e) =>
                  (e.target.style.border = "2px solid transparent")
                }
              />
            </div>

            <button
              onClick={handleClick}
              className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all hover:scale-105 hover:shadow-lg whitespace-nowrap"
              style={{
                backgroundColor: "#ffffff",
                color: "var(--primary)",
              }}
            >
              Join Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
