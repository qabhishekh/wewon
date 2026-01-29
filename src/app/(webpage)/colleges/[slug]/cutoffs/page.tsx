"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { ChevronDown, ArrowLeft, Loader2 } from "lucide-react";
import DynamicTable from "@/components/sections/DynamicTable";
import SubHeading from "@/components/sections/SubHeading";
import apiClient from "@/hooks/Axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCollegeBySlug } from "@/store/college/collegeThunk";
import { selectSelectedCollege } from "@/store/college/collegeSlice";

// Import options from predictor data files
import josaaOptions from "@/components/Predictor/data/options.json";
import uptacOptions from "@/components/Predictor/data/uptacOptions.json";
import hbtuOptions from "@/components/Predictor/data/hbtuOptions.json";
import mmmutOptions from "@/components/Predictor/data/mmmutOptions.json";
import jacDelhiOptions from "@/components/Predictor/data/jacDelhiOptions.json";
import jacChandigarhOptions from "@/components/Predictor/data/jacChandigarhOptions.json";

interface CutoffData {
  _id: string;
  Year: number;
  Round: string;
  Seat_Type: string;
  Quota: string;
  Academic_Program_Name: string;
  Gender: string;
  Opening_Rank: number;
  Closing_Rank: number;
  Institute_Id: string;
  Institute: string;
}

type CollegeType =
  | "JOSAA"
  | "UPTAC"
  | "HBTU"
  | "MMMUT"
  | "JAC_DELHI"
  | "JAC_CHANDIGARH"
  | "UNKNOWN";

interface FilterOption {
  label: string;
  value: string;
}

export default function CutoffFilterPage() {
  const { slug } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const college = useAppSelector(selectSelectedCollege);
  const selectedYear = searchParams.get("year")
    ? parseInt(searchParams.get("year")!)
    : null;

  // State for filter form
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  // State for dropdown visibility
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);

  // State for results - store ALL cutoffs from API
  const [allCutoffs, setAllCutoffs] = useState<CutoffData[]>([]);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // State for selected round
  const [selectedRound, setSelectedRound] = useState<string>("");

  // Fetch college data on mount
  useEffect(() => {
    if (slug && typeof slug === "string") {
      dispatch(fetchCollegeBySlug(slug));
    }
  }, [slug, dispatch]);

  // Detect college type based on API Type field
  const detectCollegeType = useCallback((): CollegeType => {
    const type = (college?.Type || "").toUpperCase();

    // Map API Type field to our CollegeType
    switch (type) {
      case "IIT":
      case "NIT":
      case "IIIT":
      case "GFTI":
        return "JOSAA";
      case "JAC_DELHI":
        return "JAC_DELHI";
      case "JAC_CHANDIGARH":
        return "JAC_CHANDIGARH";
      case "HBTU":
        return "HBTU";
      case "MMMUT":
        return "MMMUT";
      case "UPTAC":
        return "UPTAC";
      default:
        // Fallback: check Name for legacy/unmapped colleges
        const name = (college?.Name || "").toUpperCase();

        if (
          name.includes("DTU") ||
          name.includes("DELHI TECHNOLOGICAL") ||
          name.includes("NSUT") ||
          name.includes("NETAJI SUBHAS") ||
          name.includes("IGDTUW") ||
          name.includes("INDIRA GANDHI DELHI") ||
          name.includes("IIIT-D") ||
          name.includes("IIIT DELHI")
        ) {
          return "JAC_DELHI";
        }

        if (
          name.includes("UIET") ||
          name.includes("CCET") ||
          name.includes("CHANDIGARH COLLEGE OF ENGINEERING")
        ) {
          return "JAC_CHANDIGARH";
        }

        if (name.includes("HBTU") || name.includes("HARCOURT BUTLER")) {
          return "HBTU";
        }

        if (name.includes("MMMUT") || name.includes("MADAN MOHAN")) {
          return "MMMUT";
        }

        if (
          name.includes("IIT") ||
          name.includes("NIT") ||
          name.includes("IIIT") ||
          name.includes("GFTI") ||
          name.includes("INDIAN INSTITUTE OF TECHNOLOGY") ||
          name.includes("NATIONAL INSTITUTE OF TECHNOLOGY")
        ) {
          return "JOSAA";
        }

        return "UNKNOWN";
    }
  }, [college?.Type, college?.Name]);

  const collegeType = detectCollegeType();

  // Get category options based on college type
  const getCategoryOptions = (): FilterOption[] => {
    switch (collegeType) {
      case "JOSAA":
        return josaaOptions.categories;
      case "UPTAC":
        return uptacOptions.categories;
      case "HBTU":
        return hbtuOptions.categories;
      case "MMMUT":
        return mmmutOptions.categories;
      case "JAC_DELHI":
        return jacDelhiOptions.categories;
      case "JAC_CHANDIGARH":
        return jacChandigarhOptions.categories;
      default:
        // Default categories
        return [
          { label: "OPEN", value: "OPEN" },
          { label: "EWS", value: "EWS" },
          { label: "OBC", value: "OBC" },
          { label: "SC", value: "SC" },
          { label: "ST", value: "ST" },
        ];
    }
  };

  // Get sub-category options based on category (for applicable college types)
  const getSubCategoryOptions = (): FilterOption[] => {
    if (!selectedCategory) return [];

    switch (collegeType) {
      case "UPTAC":
        return (
          (uptacOptions.subCategories as Record<string, FilterOption[]>)[
            selectedCategory
          ] || []
        );
      case "HBTU":
        // HBTU has nested subCategories by counseling type - use B.TECH as default
        const hbtuSubs = (
          hbtuOptions.subCategories as Record<
            string,
            Record<string, FilterOption[]>
          >
        )["B.TECH"];
        return hbtuSubs?.[selectedCategory] || [];
      case "MMMUT":
        return (
          (mmmutOptions.subCategories as Record<string, FilterOption[]>)[
            selectedCategory
          ] || []
        );
      case "JAC_DELHI":
        // JAC Delhi has a shared sub-category list
        return jacDelhiOptions.subCategories;
      default:
        return [];
    }
  };

  // Get gender options for JOSAA type
  const getGenderOptions = (): FilterOption[] => {
    if (collegeType === "JOSAA") {
      return [
        { label: "GENDER NEUTRAL", value: "Gender-Neutral" },
        { label: "FEMALE", value: "Female-only (including Supernumerary)" },
        { label: "BOTH", value: "BOTH" },
      ];
    }
    return [];
  };

  // Check if college type uses sub-category
  const hasSubCategory = (): boolean => {
    return ["UPTAC", "HBTU", "MMMUT", "JAC_DELHI"].includes(collegeType);
  };

  // Check if college type uses gender
  const hasGender = (): boolean => {
    return collegeType === "JOSAA";
  };

  // Handle form submission - fetch all cutoffs for the year
  const handleSubmit = async () => {
    if (!selectedYear || !college?.instituteId) return;

    try {
      setResultsLoading(true);
      setHasSearched(true);

      // Build query params - fetch ALL cutoffs for this institute and year
      const params = new URLSearchParams();
      params.set("instituteId", college.instituteId);
      params.set("year", selectedYear.toString());
      params.set("limit", "5000"); // Fetch more to ensure we get all data

      const response = await apiClient.get(`/api/cutoffs?${params.toString()}`);

      if (response.data.cutoffs && response.data.cutoffs.length > 0) {
        setAllCutoffs(response.data.cutoffs);
      } else {
        setAllCutoffs([]);
      }
    } catch (error) {
      console.error("Failed to fetch cutoffs:", error);
      setAllCutoffs([]);
    } finally {
      setResultsLoading(false);
    }
  };

  // Filter cutoffs based on current filter selections
  const filteredCutoffs = useMemo(() => {
    let filtered = allCutoffs;

    // Filter by category (Seat_Type) - required
    if (selectedCategory) {
      filtered = filtered.filter((c) => c.Seat_Type === selectedCategory);
    }

    // Filter by gender (for JOSAA type)
    if (hasGender() && selectedGender && selectedGender !== "BOTH") {
      filtered = filtered.filter((c) => c.Gender === selectedGender);
    }

    return filtered;
  }, [allCutoffs, selectedCategory, selectedGender, collegeType]);

  // Get available rounds based on filtered cutoffs
  const availableRounds = useMemo(() => {
    const rounds = [
      ...new Set(filteredCutoffs.map((c) => c.Round)),
    ] as string[];
    return rounds.sort();
  }, [filteredCutoffs]);

  // Reset selected round when available rounds change
  useEffect(() => {
    if (
      availableRounds.length > 0 &&
      !availableRounds.includes(selectedRound)
    ) {
      setSelectedRound(availableRounds[0]);
    } else if (availableRounds.length === 0) {
      setSelectedRound("");
    }
  }, [availableRounds, selectedRound]);

  // Get final results for display - filtered by selected round
  const displayResults = useMemo(() => {
    let results = filteredCutoffs;

    // Filter by selected round
    if (selectedRound) {
      results = results.filter((c) => c.Round === selectedRound);
    }

    // Sort by Quota (AI/HS/OS order)
    return results.sort((a, b) => (a.Quota || "").localeCompare(b.Quota || ""));
  }, [filteredCutoffs, selectedRound]);

  // Check if current filter combination has data
  const hasDataForCurrentFilters = filteredCutoffs.length > 0;

  // Transform results for DynamicTable
  const tableData = useMemo(() => {
    return {
      columns: [
        { key: "seatType", label: "Seat Type", align: "left" as const },
        { key: "quota", label: "Quota", align: "left" as const },
        { key: "program", label: "Program", align: "left" as const },
        { key: "opening", label: "Opening Rank", align: "right" as const },
        { key: "closing", label: "Closing Rank", align: "right" as const },
      ],
      data: displayResults.map((c) => ({
        seatType: c.Seat_Type || "-",
        quota: c.Quota || "-",
        program: `${c.Academic_Program_Name}${c.Gender ? ` (${c.Gender})` : ""}`,
        opening: c.Opening_Rank?.toString() || "-",
        closing: c.Closing_Rank?.toString() || "-",
      })),
    };
  }, [displayResults]);

  // Close all dropdowns when clicking outside
  const closeAllDropdowns = () => {
    setIsCategoryOpen(false);
    setIsSubCategoryOpen(false);
    setIsGenderOpen(false);
  };

  // Loading state
  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 md:px-12 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to College</span>
          </button>
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{ color: "var(--primary)" }}
          >
            Cutoff {selectedYear} - {college?.Name}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12 py-8">
        {/* Filter Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2
            className="text-xl font-bold mb-6"
            style={{ color: "var(--primary)" }}
          >
            Filter Cutoffs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <button
                onClick={() => {
                  setIsCategoryOpen(!isCategoryOpen);
                  setIsSubCategoryOpen(false);
                  setIsGenderOpen(false);
                }}
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-between text-base font-medium hover:border-primary transition-colors"
              >
                <span
                  className={
                    selectedCategory ? "text-gray-900" : "text-gray-400"
                  }
                >
                  {selectedCategory || "Select Category"}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-600 transition-transform ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute z-20 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto">
                  {getCategoryOptions().map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedCategory(option.value);
                        setSelectedSubCategory("");
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        selectedCategory === option.value
                          ? "bg-gray-100 font-semibold"
                          : ""
                      }`}
                      style={
                        selectedCategory === option.value
                          ? { color: "var(--primary)" }
                          : {}
                      }
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sub-Category Dropdown (conditional) */}
            {hasSubCategory() && (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sub Category
                </label>
                <button
                  onClick={() => {
                    if (selectedCategory) {
                      setIsSubCategoryOpen(!isSubCategoryOpen);
                      setIsCategoryOpen(false);
                      setIsGenderOpen(false);
                    }
                  }}
                  disabled={!selectedCategory}
                  className={`w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-between text-base font-medium transition-colors ${
                    selectedCategory
                      ? "hover:border-primary cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <span
                    className={
                      selectedSubCategory ? "text-gray-900" : "text-gray-400"
                    }
                  >
                    {selectedSubCategory || "Select Sub Category"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      isSubCategoryOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isSubCategoryOpen && getSubCategoryOptions().length > 0 && (
                  <div className="absolute z-20 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto">
                    {getSubCategoryOptions().map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedSubCategory(option.value);
                          setIsSubCategoryOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          selectedSubCategory === option.value
                            ? "bg-gray-100 font-semibold"
                            : ""
                        }`}
                        style={
                          selectedSubCategory === option.value
                            ? { color: "var(--primary)" }
                            : {}
                        }
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Gender Dropdown (for JOSAA type) */}
            {hasGender() && (
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <button
                  onClick={() => {
                    setIsGenderOpen(!isGenderOpen);
                    setIsCategoryOpen(false);
                    setIsSubCategoryOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl flex items-center justify-between text-base font-medium hover:border-primary transition-colors"
                >
                  <span
                    className={
                      selectedGender ? "text-gray-900" : "text-gray-400"
                    }
                  >
                    {selectedGender || "Select Gender"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      isGenderOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isGenderOpen && (
                  <div className="absolute z-20 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden">
                    {getGenderOptions().map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedGender(option.value);
                          setIsGenderOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          selectedGender === option.value
                            ? "bg-gray-100 font-semibold"
                            : ""
                        }`}
                        style={
                          selectedGender === option.value
                            ? { color: "var(--primary)" }
                            : {}
                        }
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              disabled={!selectedCategory || resultsLoading}
              className="px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              style={{ backgroundColor: "var(--primary)" }}
            >
              {resultsLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Loading...
                </span>
              ) : (
                "Find Cutoffs"
              )}
            </button>
          </div>
        </div>

        {/* Click outside to close dropdowns */}
        {(isCategoryOpen || isSubCategoryOpen || isGenderOpen) && (
          <div className="fixed inset-0 z-10" onClick={closeAllDropdowns} />
        )}

        {/* Results Section */}
        {hasSearched && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <SubHeading top="Cutoff Results" align="left" />

            {resultsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-gray-600">
                  Loading cutoff data...
                </span>
              </div>
            ) : !selectedCategory ? (
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 text-center">
                <p className="text-blue-600">
                  Please select a category to view cutoff data.
                </p>
              </div>
            ) : !hasDataForCurrentFilters ? (
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 text-center">
                <p className="text-gray-500">
                  No data available for the selected {selectedCategory}
                  {hasGender() && selectedGender
                    ? ` - ${selectedGender}`
                    : ""}{" "}
                  combination.
                </p>
              </div>
            ) : (
              <>
                {/* Round Tabs - only show rounds that have data */}
                {availableRounds.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {availableRounds.map((round) => (
                      <button
                        key={round}
                        onClick={() => setSelectedRound(round)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                          selectedRound === round
                            ? "text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        style={
                          selectedRound === round
                            ? { backgroundColor: "var(--primary)" }
                            : {}
                        }
                      >
                        {round}
                      </button>
                    ))}
                  </div>
                )}

                {/* Results Table */}
                {displayResults.length > 0 ? (
                  <>
                    <div className="mb-2 text-lg font-semibold text-[var(--primary)]">
                      4-Year B.E./B.Tech. Course
                    </div>
                    <DynamicTable
                      columns={tableData.columns}
                      data={tableData.data}
                    />
                  </>
                ) : (
                  <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 text-center">
                    <p className="text-gray-500">
                      No data available for {selectedRound}.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
