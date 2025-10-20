"use client";
import React, { useState } from "react";
import MainHeading from "./MainHeading";
import { Mail } from "lucide-react";
import Heading from "../home/heading";

export default function CallToAction() {
  const [email, setEmail] = useState<string>("");

  const handleClick = (): void => {
    console.log("Email submitted:", email);
  };

  return (
    <div
      className="flex items-center justify-center pb-18 sm:pb-24"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div
        className="w-full container rounded-3xl md:rounded-3xl p-8 md:p-12 lg:p-16 xl:p-20"
        style={{
          backgroundColor: "var(--primary)",
          boxShadow: "0 20px 60px rgba(13, 58, 102, 0.3)",
        }}
      >
        <div className="mx-auto text-center">
          {/* <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight px-2"
            style={{ color: "#ffffff" }}
          >
            Your Game Plan for a Top Rank
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            We Won Academy
          </h1> */}
          <Heading text="Your Game Plan for a Top Rank" centered className="text-white" />
          <Heading text="We Won Academy" centered className="text-white" />
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 md:mb-10  px-2 max-w-3xl mx-auto mt-4 text-[var(--muted-text)]"
          >
            Use our College Predictor tool to explore the 2025 admission
            cutoffs. Seeing the goalposts clearly is the first step to scoring
            the goal!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center px-2">
            <div className="relative flex-1 w-full sm:max-w-md">
              <div className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                <Mail className="w-5 h-5 text-[var(--primary)]" />
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
              className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all hover:bg-[var(--accent)] whitespace-nowrap bg-[var(--background)] cursor-pointer"
              style={{
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
