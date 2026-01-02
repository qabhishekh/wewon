"use client";

import { useState, useRef, useEffect } from "react";
import GoogleAds from "../sections/GoogleAds";
import { predictMMMUT, getMMMUTBranches } from "@/network/predictor";
import mmmutOptions from "./data/mmmutOptions.json";
import PredictionResults from "./PredictionResults";
import { toast } from "sonner";

export default function MMMUTCollegePredictor() {
  const [formData, setFormData] = useState({
    crlRank: "",
    category: "OPEN",
    subCategory: "NOT APPLICABLE",
    gender: "Male",
    homeState: "",
    roundNumber: "",
    programName: [],
  });

  const [availableBranches, setAvailableBranches] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef(null);

  // Auto-scroll to results when they become available
  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [results]);

  // Fetch branches on component mount
  useEffect(() => {
    const fetchBranches = async () => {
      setLoadingBranches(true);
      try {
        const response = await getMMMUTBranches();
        setAvailableBranches(response.data || []);
      } catch (error) {
        console.error("Error fetching branches:", error);
        toast.error("Failed to load branches");
        setAvailableBranches([]);
      } finally {
        setLoadingBranches(false);
      }
    };

    fetchBranches();
  }, []);

  // Get available sub-categories for selected category
  const getSubCategories = () => {
    return mmmutOptions.subCategories[formData.category] || [];
  };

  const handleChange = (e) => {
    const { id, value, type } = e.target;

    // Validate number inputs to prevent negative values
    if (type === "number") {
      if (value === "") {
        setFormData((prev) => ({
          ...prev,
          [id]: value,
        }));
        return;
      }

      const numValue = Number(value);
      if (numValue < 1) {
        return;
      }
    }

    // Reset sub-category when category changes
    if (id === "category") {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
        subCategory: "NOT APPLICABLE",
        programName: [], // Reset program selection
      }));
      return;
    }

    // Reset program selection when sub-category changes
    if (id === "subCategory") {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
        programName: [],
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleGenderChange = (gender) => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleProgramSelection = (program) => {
    setFormData((prev) => {
      const isSelected = prev.programName.includes(program);

      return {
        ...prev,
        programName: isSelected
          ? prev.programName.filter((name) => name !== program)
          : [...prev.programName, program],
      };
    });
  };

  const handleSelectAllPrograms = () => {
    if (formData.programName.length === availableBranches.length) {
      // Deselect all
      setFormData((prev) => ({
        ...prev,
        programName: [],
      }));
    } else {
      // Select all
      setFormData((prev) => ({
        ...prev,
        programName: [...availableBranches],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);

    // Validate required fields
    if (!formData.crlRank) {
      toast.error("Please enter CRL Rank");
      setLoading(false);
      return;
    }

    if (!formData.roundNumber) {
      toast.error("Please select Round Number");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        crlRank: Number(formData.crlRank),
        category: formData.category,
        subCategory: formData.subCategory,
        gender: formData.gender,
        homeState: formData.homeState || undefined,
        roundNumber: Number(formData.roundNumber),
        programName:
          formData.programName.length > 0 ? formData.programName : undefined,
      };

      console.log("Sending MMMUT payload:", payload);
      const response = await predictMMMUT(payload);
      console.log("MMMUT prediction response:", response.data);

      // Transform MMMUT response to match PredictionResults expected format
      // MMMUT API returns { highProbability: [], mediumProbability: [], lowProbability: [] }
      // PredictionResults expects { homestatePredictions: [] } with probability field in each item
      const transformedResults = {
        homestatePredictions: [
          ...(response.data.highProbability || []),
          ...(response.data.mediumProbability || []),
          ...(response.data.lowProbability || []),
        ],
      };

      console.log("Transformed results:", transformedResults);
      setResults(transformedResults);
    } catch (error) {
      console.error("MMMUT prediction error:", error);
      toast.error("Failed to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 my-6 sm:my-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* Left Column: Steps */}
        <div className="flex flex-col justify-center space-y-3 sm:space-y-6">
          <GoogleAds adSlot="1234567890" />
          <div className="p-3 sm:p-6 bg-[var(--background)] border border-[var(--border)] rounded-lg sm:rounded-xl shadow-sm">
            <h3 className="text-base sm:text-xl font-semibold text-[var(--foreground)]">
              Enter your exam details
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted-text)] mt-1">
              Select your rank, category, and preferences
            </p>
          </div>
          <div className="p-3 sm:p-6 bg-[var(--background)] border border-[var(--border)] rounded-lg sm:rounded-xl shadow-sm">
            <h3 className="text-base sm:text-xl font-semibold text-[var(--foreground)]">
              Choose your preferences
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted-text)] mt-1">
              Home state and program preferences
            </p>
          </div>
          <div className="p-3 sm:p-6 bg-[var(--background)] border border-[var(--border)] rounded-lg sm:rounded-xl shadow-sm">
            <h3 className="text-base sm:text-xl font-semibold text-[var(--foreground)]">
              Get instant results
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted-text)] mt-1">
              See your personalized college matches
            </p>
          </div>
          <p className="text-xs text-[var(--muted-text)] px-2">
            We never share your information. You can update details anytime.
          </p>
        </div>

        {/* Right Column: Predictor Form */}
        <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--primary)]">
              MMMUT COLLEGE PREDICTOR
            </h2>
            <span className="bg-[var(--light-blue)] text-[var(--primary)] text-[10px] sm:text-xs font-semibold px-2 sm:px-4 py-1 sm:py-2 rounded-full whitespace-nowrap w-fit">
              Trusted by thousands of students
            </span>
          </div>

          {/* Form */}
          <form className="space-y-3 sm:space-y-5" onSubmit={handleSubmit}>
            {/* CRL Rank */}
            <div>
              <label
                htmlFor="crlRank"
                className="block text-xs sm:text-sm font-medium text-[var(--foreground)] mb-1 sm:mb-1.5"
              >
                Enter CRL Rank (Required)
              </label>
              <input
                type="number"
                id="crlRank"
                value={formData.crlRank}
                onChange={handleChange}
                placeholder="15000"
                min="1"
                required
                onWheel={(e) => e.currentTarget.blur()}
                className="w-full p-2 sm:p-3 text-sm sm:text-base border border-[var(--border)] rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition placeholder:text-[var(--muted-text)]"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[var(--foreground)] mb-1 sm:mb-1.5">
                Gender
              </label>
              <div className="flex space-x-1.5 sm:space-x-2">
                {mmmutOptions.genders.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleGenderChange(option.value)}
                    className={`flex-1 p-2 sm:p-3 border rounded-lg text-xs sm:text-sm font-medium transition ${
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

            {/* Select Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-xs sm:text-sm font-medium text-[var(--foreground)] mb-1 sm:mb-1.5"
              >
                Select Your Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 text-sm sm:text-base border border-[var(--border)] rounded-lg shadow-sm bg-white text-[var(--muted-text)] focus:text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition"
              >
                {mmmutOptions.categories.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-Category */}
            <div>
              <label
                htmlFor="subCategory"
                className="block text-xs sm:text-sm font-medium text-[var(--foreground)] mb-1 sm:mb-1.5"
              >
                Select Sub-Category
              </label>
              <select
                id="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 text-sm sm:text-base border border-[var(--border)] rounded-lg shadow-sm bg-white text-[var(--muted-text)] focus:text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition"
              >
                {getSubCategories().map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Home State */}
            <div>
              <label
                htmlFor="homeState"
                className="block text-xs sm:text-sm font-medium text-[var(--foreground)] mb-1 sm:mb-1.5"
              >
                Select Your Home State (Optional)
              </label>
              <select
                id="homeState"
                value={formData.homeState}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 text-sm sm:text-base border border-[var(--border)] rounded-lg shadow-sm bg-white text-[var(--muted-text)] focus:text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition"
              >
                <option value="">Select Home State</option>
                {mmmutOptions.homeStates.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Round Number */}
            <div>
              <label
                htmlFor="roundNumber"
                className="block text-xs sm:text-sm font-medium text-[var(--foreground)] mb-1 sm:mb-1.5"
              >
                Round Number (Required)
              </label>
              <select
                required
                id="roundNumber"
                value={formData.roundNumber}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 text-sm sm:text-base border border-[var(--border)] rounded-lg shadow-sm bg-white text-[var(--muted-text)] focus:text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition"
              >
                <option value="">Select Round Number</option>
                {mmmutOptions.rounds.map((round) => (
                  <option key={round.value} value={round.value}>
                    {round.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Program Name - Multi-select */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[var(--foreground)] mb-1 sm:mb-1.5">
                Program Name (Optional)
              </label>
              <div className="border border-[var(--border)] rounded-lg p-2 max-h-48 overflow-y-auto bg-white">
                {loadingBranches ? (
                  <p className="text-xs text-[var(--muted-text)] p-2">
                    Loading branches...
                  </p>
                ) : availableBranches.length > 0 ? (
                  <>
                    <label className="flex items-center p-2 hover:bg-[var(--muted-background)] rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={
                          formData.programName.length ===
                          availableBranches.length
                        }
                        onChange={handleSelectAllPrograms}
                        className="mr-2"
                      />
                      <span className="text-xs sm:text-sm font-semibold">
                        Select All
                      </span>
                    </label>
                    <div className="border-t border-[var(--border)] my-1"></div>
                    {availableBranches.map((program) => (
                      <label
                        key={program}
                        className="flex items-center p-2 hover:bg-[var(--muted-background)] rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.programName.includes(program)}
                          onChange={() => handleProgramSelection(program)}
                          className="mr-2"
                        />
                        <span className="text-xs sm:text-sm">{program}</span>
                      </label>
                    ))}
                  </>
                ) : (
                  <p className="text-xs text-[var(--muted-text)] p-2">
                    No branches available
                  </p>
                )}
              </div>
              {formData.programName.length > 0 && (
                <p className="text-xs text-[var(--muted-text)] mt-1">
                  {formData.programName.length} program(s) selected
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--primary)] text-white font-semibold p-2.5 sm:p-3.5 text-sm sm:text-base rounded-lg shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Predicting..." : "Predict My College"}
              </button>
            </div>

            {/* Footer Text */}
            <p className="text-center text-[10px] sm:text-xs text-[var(--muted-text)] pt-2">
              Powered by official MMMUT cutoff data
            </p>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div ref={resultsRef}>
        {results && (
          <PredictionResults
            results={results}
            userGender={formData.gender}
            hideQuota={true}
            hideSeatType={true}
            hideOpeningRank={true}
          />
        )}
      </div>
    </div>
  );
}
