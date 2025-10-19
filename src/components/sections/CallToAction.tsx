import React, { useState } from "react";

export default function CallToAction() {
  const [email, setEmail] = useState<string>("");

  const handleClick = (): void => {
    console.log("Email submitted:", email);
    // Handle submission
  };

  return (
    <div
      className="flex items-center justify-center p-6 mb-14"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div
        className="w-full max-w-7xl rounded-3xl p-12 md:p-16 lg:p-20"
        style={{
          backgroundColor: "var(--primary)",
          boxShadow: "0 20px 60px rgba(13, 58, 102, 0.3)",
        }}
      >
        <div className=" mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ color: "#ffffff" }}
          >
            Your Game Plan for a Top Rank
            <br />
            We Won Academy
          </h1>

          <p
            className="text-base md:text-lg lg:text-xl mb-10 leading-relaxed"
            style={{ color: "rgba(255, 255, 255, 0.9)" }}
          >
            Use our College Predictor tool to explore the 2025 admission
            cutoffs. Seeing the goalposts clearly is the first step to scoring
            the goal!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 w-full sm:max-w-md">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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
                className="w-full py-4 pl-14 pr-6 rounded-full text-base outline-none transition-all"
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
              className="px-10 py-4 rounded-full font-semibold text-base transition-all hover:scale-105 hover:shadow-lg whitespace-nowrap"
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
