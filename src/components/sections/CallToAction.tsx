"use client";
import React, { useState } from "react";
import MainHeading from "./MainHeading";
import { Mail, Loader2 } from "lucide-react";
import Heading from "../home/heading";
import apiClient from "@/hooks/Axios";
import { toast } from "sonner";

export default function CallToAction() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async (): Promise<void> => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post("/api/newsletter/subscribe", {
        email,
      });
      if (response.data) {
        toast.success(
          "Subscribed successfully! Check your email for confirmation.",
        );
        setEmail("");
      }
    } catch (error: any) {
      console.error("Subscription error:", error);
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again later.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
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
          <Heading
            text="Your Game Plan for a Top Rank"
            centered
            className="text-white"
          />
          <Heading text="We Won Academy" centered className="text-white" />
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 md:mb-10  px-2 max-w-3xl mx-auto mt-4 text-[var(--muted-text)]">
            Use our College Predictor tool to explore the 2025 admission
            cutoffs. Seeing the goalposts clearly is the first step to scoring
            the goal!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center px-2">
            <div className="relative flex-1 w-full sm:max-w-md">
              <div className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                <Mail color="rgba(13, 58, 102, 0.5)" />
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
              disabled={loading}
              className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all hover:bg-[var(--accent)] hover:text-white whitespace-nowrap bg-[var(--background)] cursor-pointer text-[var(--primary)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Join Us"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
