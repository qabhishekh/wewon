"use client";
import { useState, useRef, useEffect } from "react";
import { BarChart3, Calculator, Copy, Check } from "lucide-react";
import { predictJEEMainRank } from "@/network/predictor";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";
import { selectIsAuthenticated } from "@/store/auth/authSlice";

const categories = [
  { value: "OPEN", label: "OPEN (General)" },
  { value: "EWS", label: "EWS" },
  { value: "OBC-NCL", label: "OBC-NCL" },
  { value: "SC", label: "SC" },
  { value: "ST", label: "ST" },
  { value: "OPEN (PwD)", label: "OPEN (PwD)" },
  { value: "EWS (PwD)", label: "EWS (PwD)" },
  { value: "OBC-NCL (PwD)", label: "OBC-NCL (PwD)" },
  { value: "SC (PwD)", label: "SC (PwD)" },
  { value: "ST (PwD)", label: "ST (PwD)" },
];

const genders = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

interface PredictionResult {
  crlRank: { min: number; max: number };
  categoryRank?: { min: number; max: number; category: string };
  percentile: number;
}

export default function PercentileConverter() {
  const user = useAppSelector(selectIsAuthenticated);
  const [formData, setFormData] = useState({
    percentile: "",
    category: "OPEN",
    gender: "Male",
  });
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Promo modal state
  const [showPromoModal, setShowPromoModal] = useState(false);

  // Show promo modal after results are displayed
  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        setShowPromoModal(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [result]);

  // Auto-scroll to results when they become available
  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [result]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;

    // Validate percentile input
    if (id === "percentile") {
      if (value === "") {
        setFormData((prev) => ({ ...prev, [id]: value }));
        return;
      }
      // Allow numbers with up to 7 decimal places, 0 < P <= 100
      const percentilePattern = /^(100(\.0{0,7})?|[0-9]{1,2}(\.\d{0,7})?)$/;
      if (!percentilePattern.test(value)) {
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenderChange = (gender: string) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is logged in
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setLoading(true);
    setResult(null);

    const percentileNum = parseFloat(formData.percentile);
    if (isNaN(percentileNum) || percentileNum <= 0 || percentileNum > 100) {
      toast.error("Please enter a valid percentile between 0 and 100");
      setLoading(false);
      return;
    }

    try {
      const response = await predictJEEMainRank({
        percentile: percentileNum,
        category: formData.category,
        gender: formData.gender,
      });
      setResult(response.data);
    } catch (error: any) {
      console.error("Prediction error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to get prediction. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-IN");
  };

  const getShareText = () => {
    if (!result) return "";
    const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
    let text = `🎯 My JEE Main Prediction:\n`;
    text += `📊 Percentile: ${result.percentile}\n`;
    text += `📈 CRL Rank: ${formatNumber(result.crlRank.min)} - ${formatNumber(
      result.crlRank.max,
    )}\n`;
    if (result.categoryRank) {
      text += `🏷️ ${result.categoryRank.category} Rank: ${formatNumber(
        result.categoryRank.min,
      )} - ${formatNumber(result.categoryRank.max)}\n`;
    }
    text += `\nCheck yours at: ${siteUrl}/percentile`;
    return text;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getShareText());
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 my-10 px-4">
      {/* Left Column: Ad & Steps */}
      <div className="flex flex-col space-y-6">
        {/* Percentile Image */}
        <div className="rounded-xl overflow-hidden shadow-sm">
          <img
            src="/herocolleges/percentile.png"
            alt="Percentile to Rank Converter"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Steps */}
        <div className="p-6 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[var(--foreground)]">
            Enter your percentile
          </h3>
          <p className="text-[var(--muted-text)] mt-1">
            Input your JEE Main percentile score
          </p>
        </div>
        <div className="p-6 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[var(--foreground)]">
            Select your category & gender
          </h3>
          <p className="text-[var(--muted-text)] mt-1">
            Choose your reservation category and gender
          </p>
        </div>
        <div className="p-6 bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold text-[var(--foreground)]">
            Get instant rank prediction
          </h3>
          <p className="text-[var(--muted-text)] mt-1">
            See your estimated CRL and category rank range
          </p>
        </div>
        <p className="text-xs text-[var(--muted-text)] px-2">
          We never share your information. You can update details anytime.
        </p>
        {/* College Predictor Promo Card */}
        {/* Promo card moved to popup modal */}
      </div>

      {/* Right Column: Converter Form */}
      <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-lg p-6 sm:p-8 h-fit">
        {/* Header Icon */}
        <div className="flex justify-center mb-4">
          <span className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] bg-opacity-10 rounded-xl">
            <BarChart3 className="w-8 h-8 text-background" />
          </span>
        </div>

        {/* Header Text */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[var(--primary)]">
            JEE Main Rank Predictor
          </h2>
          <p className="text-[var(--muted-text)] mt-2">
            Convert your percentile to estimated All India Rank
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Percentile */}
          <div>
            <label
              htmlFor="percentile"
              className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
            >
              Enter Percentile (Required)
            </label>
            <input
              type="text"
              id="percentile"
              value={formData.percentile}
              onChange={handleChange}
              placeholder="e.g. 95.1234567"
              required
              className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition placeholder:text-[var(--muted-text)]"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
            >
              Select Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm bg-white text-[var(--muted-text)] focus:text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
              Gender
            </label>
            <div className="flex space-x-2">
              {genders.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleGenderChange(option.value)}
                  className={`flex-1 p-3 border rounded-lg text-sm font-medium transition ${
                    formData.gender === option.value
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "bg-white text-[var(--muted-text)] border-[var(--border)] hover:bg-[var(--muted-background)]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white font-semibold p-3.5 rounded-lg shadow-md hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
            >
              <Calculator className="w-5 h-5" />
              {loading ? "Calculating..." : "Predict My Rank"}
            </button>
          </div>
        </form>

        {/* Results Section */}
        {result && (
          <div
            ref={resultsRef}
            className="mt-8 p-6 bg-[var(--muted-background)] border border-[var(--border)] rounded-xl"
          >
            <h3 className="text-lg font-bold text-[var(--foreground)] mb-4 text-center">
              Your Predicted Rank
            </h3>

            <div className="space-y-4">
              {/* Percentile Display */}
              <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-[var(--border)]">
                <span className="text-sm font-medium text-[var(--muted-text)]">
                  📊 Percentile
                </span>
                <span className="text-lg font-bold text-[var(--primary)]">
                  {result.percentile}
                </span>
              </div>

              {/* CRL Rank */}
              <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-[var(--border)]">
                <span className="text-sm font-medium text-[var(--muted-text)]">
                  📈 CRL Rank
                </span>
                <span className="text-lg font-bold text-[var(--foreground)]">
                  {formatNumber(result.crlRank.min)} -{" "}
                  {formatNumber(result.crlRank.max)}
                </span>
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="mt-4 w-full flex items-center justify-center gap-2 p-3 border border-[var(--primary)] text-[var(--primary)] font-medium rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy & Share Result
                </>
              )}
            </button>
          </div>
        )}

        {/* Footer Text */}
        <p className="text-center text-xs text-[var(--muted-text)] pt-4">
          Powered by official JEE Main 2026 candidate data
        </p>

        {/* Login Required Modal */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative overflow-hidden animate-in fade-in zoom-in duration-200">
              {/* Close Button */}
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="text-center mb-6 mt-2">
                <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--primary)]"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Login Required
                </h2>
                <p className="text-sm text-gray-600">
                  Please login to your account to get your personalized
                  predictions.
                </p>
              </div>

              <a
                href="/auth?returnUrl=/percentile"
                className="block w-full py-3 px-4 bg-[var(--primary)] text-white font-semibold rounded-xl hover:bg-[var(--accent)] transition-colors text-center"
              >
                Login / Sign Up
              </a>

              <button
                onClick={() => setShowLoginModal(false)}
                className="block w-full py-3 px-4 mt-3 text-gray-500 font-medium rounded-xl hover:bg-gray-50 transition-colors text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {/* Promo Modal */}
        {showPromoModal && (
          <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-0 relative overflow-hidden animate-in fade-in zoom-in duration-200">
              {/* Close Button */}
              <button
                onClick={() => setShowPromoModal(false)}
                className="absolute top-3 right-3 z-10 bg-white/50 hover:bg-white rounded-full p-1 text-gray-500 hover:text-gray-700 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {/* Promo Content */}
              <div className="relative bg-gradient-to-br from-white to-yellow-50 p-6">
                {/* Early Bird Offer Badge */}
                <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <span>✨</span> Early Bird Offer
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-6 mt-8">
                  <span className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full shadow-inner">
                    <svg
                      className="w-10 h-10 text-[var(--primary)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </span>
                </div>

                {/* Text Content */}
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-[var(--foreground)] mb-2 leading-tight">
                    Check Your College Eligibility!
                  </h4>
                  <p className="text-sm text-[var(--muted-text)]">
                    Based on your predicted rank, see your chances for NITs,
                    IIITs, and GFTIs.
                  </p>
                </div>

                {/* Offer Banner */}
                <div className="bg-yellow-100/80 border border-yellow-200 rounded-xl p-3 mb-6 text-center">
                  <p className="text-sm">
                    <span className="mr-1">🎉</span>
                    <span className="font-semibold text-yellow-700">
                      Limited Time Offer:
                    </span>{" "}
                    <span className="text-[var(--foreground)] block text-xs mt-1">
                      Get full access to premium counselling data at a minimal
                      price
                    </span>
                  </p>
                </div>

                {/* CTA Button */}
                <a
                  href="/predictor"
                  className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white font-semibold p-3.5 rounded-xl shadow-lg hover:opacity-90 transition-all transform hover:scale-[1.02]"
                >
                  Launch College Predictor
                  <span className="text-lg">→</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
