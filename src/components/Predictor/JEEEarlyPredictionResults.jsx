"use client";

import { useState } from "react";

export default function JEEEarlyPredictionResults({
  results,
  userGender,
  calculatedRank,
  percentile,
}) {
  const [activeTab, setActiveTab] = useState("All India");
  const [activeProbabilityTab, setActiveProbabilityTab] = useState("High");
  const [genderFilter, setGenderFilter] = useState("All");

  if (!results) return null;

  const tabs = [
    { id: "All India", label: "All India", data: results.predictions },
    {
      id: "Home State",
      label: "Home State",
      data: results.homestatePredictions,
    },
  ].filter((tab) => tab.data && tab.data.length > 0);

  // If the current active tab has no data, switch to the first available tab
  if (tabs.length > 0 && !tabs.find((tab) => tab.id === activeTab)) {
    setActiveTab(tabs[0].id);
  }

  const currentData = tabs.find((tab) => tab.id === activeTab)?.data || [];

  const filteredData = currentData.filter((item) => {
    if (genderFilter === "All") return true;
    if (genderFilter === "Female-only") {
      return item.gender?.toLowerCase().includes("female");
    }
    if (genderFilter === "Gender-Neutral") {
      return item.gender?.toLowerCase().includes("neutral");
    }
    return true;
  });

  // Group data by probability
  const groupedData = {
    High: [],
    Medium: [],
    Low: [],
  };

  filteredData.forEach((item) => {
    const p = item.probability?.toLowerCase() || "";
    if (p.includes("high")) {
      groupedData.High.push(item);
    } else if (p.includes("medium")) {
      groupedData.Medium.push(item);
    } else {
      groupedData.Low.push(item);
    }
  });

  // Sort Medium and Low by Closing Rank in descending order
  groupedData.Medium.sort((a, b) => {
    const rankA = parseInt(a.closingRank) || 0;
    const rankB = parseInt(b.closingRank) || 0;
    return rankB - rankA;
  });

  groupedData.Low.sort((a, b) => {
    const rankA = parseInt(a.closingRank) || 0;
    const rankB = parseInt(b.closingRank) || 0;
    return rankB - rankA;
  });

  const probabilityTabs = [
    {
      key: "High",
      label: "High Probability",
      color: "text-green-700",
      bg: "bg-green-50",
      border: "border-green-200",
      badgeBg: "bg-green-100",
      badgeText: "text-green-700",
      rowBg: "bg-green-50/30",
    },
    {
      key: "Medium",
      label: "Medium Probability",
      color: "text-yellow-700",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      badgeBg: "bg-yellow-100",
      badgeText: "text-yellow-700",
      rowBg: "bg-yellow-50/30",
    },
    {
      key: "Low",
      label: "Low Probability",
      color: "text-red-700",
      bg: "bg-red-50",
      border: "border-red-200",
      badgeBg: "bg-red-100",
      badgeText: "text-red-700",
      rowBg: "bg-red-50/30",
    },
  ];

  // Auto-select the first probability tab that has data
  const availableProbabilityTabs = probabilityTabs.filter(
    (tab) => groupedData[tab.key]?.length > 0,
  );

  // If current active probability tab has no data but others do, switch to first available
  if (
    groupedData[activeProbabilityTab]?.length === 0 &&
    availableProbabilityTabs.length > 0 &&
    availableProbabilityTabs[0].key !== activeProbabilityTab
  ) {
    setActiveProbabilityTab(availableProbabilityTabs[0].key);
  }

  // Get current probability tab data
  const currentProbabilityData = groupedData[activeProbabilityTab] || [];
  const currentProbabilityTabConfig = probabilityTabs.find(
    (tab) => tab.key === activeProbabilityTab,
  );

  // Check if there's any data across all probability levels
  const hasAnyProbabilityData =
    groupedData.High.length > 0 ||
    groupedData.Medium.length > 0 ||
    groupedData.Low.length > 0;

  // Format rank with commas
  const formatRank = (rank) => {
    return rank?.toLocaleString("en-IN") || "N/A";
  };

  return (
    <div className="mt-6 sm:mt-10 bg-white border border-[var(--border)] rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
      {/* Calculated Rank Banner */}
      <div className="p-4 sm:p-6 bg-[var(--primary)] text-white">
        <div className="text-center">
          <p className="text-sm sm:text-base font-medium opacity-90 mb-1">
            Based on your {percentile}% Percentile
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold">
            Your Estimated AIR:
            {formatRank(calculatedRank || results.calculatedRank)}
          </h2>
          <p className="text-xs sm:text-sm opacity-80 mt-2">
            All India Rank (Estimated)
          </p>
        </div>
      </div>

      <div className="p-3 sm:p-6 border-b border-[var(--border)]">
        <h3 className="text-lg sm:text-2xl font-bold text-[var(--foreground)]">
          College Predictions
        </h3>
        <p className="text-xs sm:text-sm text-[var(--muted-text)] mt-1">
          Based on your estimated rank and preferences ({currentData.length}{" "}
          results)
        </p>
      </div>

      {/* Main Tabs (All India / Home State) */}
      {tabs.length > 0 && (
        <div className="flex border-b border-[var(--border)] overflow-x-auto bg-gray-50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-b-2 border-[var(--primary)] text-[var(--primary)] bg-white"
                  : "text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-gray-100"
              }`}
            >
              {tab.label} ({tab.data.length})
            </button>
          ))}
        </div>
      )}

      {/* Gender Filter - Only show when user is Female */}
      {userGender !== "Male" && (
        <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-[var(--border)] flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
          <span className="text-xs sm:text-sm font-medium text-[var(--muted-text)]">
            Filter by Gender:
          </span>
          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
            {["All", "Female-only", "Gender-Neutral"].map((filter) => (
              <button
                key={filter}
                onClick={() => setGenderFilter(filter)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg border transition-colors ${
                  genderFilter === filter
                    ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                    : "bg-white text-[var(--muted-text)] border-[var(--border)] hover:bg-gray-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      )}

      {hasAnyProbabilityData ? (
        <>
          {/* Probability Tabs (High/Medium/Low) */}
          <div className="flex border-b border-[var(--border)] overflow-x-auto bg-gray-100">
            {probabilityTabs.map((probTab) => {
              const count = groupedData[probTab.key]?.length || 0;
              if (count === 0) return null;

              return (
                <button
                  key={probTab.key}
                  onClick={() => setActiveProbabilityTab(probTab.key)}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5 sm:gap-2 ${
                    activeProbabilityTab === probTab.key
                      ? `border-b-2 ${probTab.border.replace(
                          "border-",
                          "border-b-",
                        )} ${probTab.color} bg-white`
                      : "text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-gray-200"
                  }`}
                >
                  {probTab.label}
                  <span
                    className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-semibold ${
                      activeProbabilityTab === probTab.key
                        ? `${probTab.badgeBg} ${probTab.badgeText}`
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Table Results */}
          <div className="p-3 sm:p-6">
            {currentProbabilityData.length > 0 ? (
              <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-gray-50 text-[var(--muted-text)] uppercase font-semibold text-[10px] sm:text-xs border-b-2 border-[var(--border)]">
                    <tr>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        Probability
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 max-w-[300px]">
                        Institute
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 max-w-[280px]">
                        Branch
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        Quota
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        Seat Type
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        Gender
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        Opening Rank
                      </th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                        Closing Rank
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {currentProbabilityData.map((item, index) => (
                      <tr
                        key={index}
                        className={`${currentProbabilityTabConfig?.rowBg} hover:bg-opacity-60 transition-colors`}
                      >
                        <td className="px-2 sm:px-4 py-3 sm:py-4">
                          <span
                            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold ${currentProbabilityTabConfig?.badgeBg} ${currentProbabilityTabConfig?.badgeText} border ${currentProbabilityTabConfig?.border}`}
                          >
                            {activeProbabilityTab.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-2 sm:px-4 py-3 sm:py-4 font-medium text-[var(--foreground)] max-w-[300px] break-words">
                          {item.institute}
                        </td>
                        <td className="px-2 sm:px-4 py-3 sm:py-4 text-[var(--muted-text)] max-w-[280px] break-words">
                          {item.branch}
                        </td>
                        <td className="px-2 sm:px-4 py-3 sm:py-4 text-[var(--muted-text)] whitespace-nowrap">
                          {item.quota}
                        </td>
                        <td className="px-2 sm:px-4 py-3 sm:py-4 text-[var(--muted-text)] whitespace-nowrap">
                          {item.seatType}
                        </td>
                        <td className="px-2 sm:px-4 py-3 sm:py-4 text-[var(--muted-text)]">
                          <span
                            className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                              item.gender?.toLowerCase().includes("female")
                                ? "bg-pink-100 text-pink-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {item.gender}
                          </span>
                        </td>
                        <td className="px-2 sm:px-4 py-3 sm:py-4 text-[var(--muted-text)] whitespace-nowrap">
                          {item.openingRank}
                        </td>
                        <td className="px-2 sm:px-4 py-3 sm:py-4 text-[var(--muted-text)] whitespace-nowrap">
                          {item.closingRank}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-6 sm:p-8 text-center bg-gray-50 rounded-lg border border-[var(--border)]">
                <p className="text-xs sm:text-sm text-[var(--muted-text)] font-semibold">
                  No {activeProbabilityTab.toLowerCase()} probability results
                  were found for your rank. Check other probability tabs.
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="p-6 sm:p-8 text-center bg-gray-50 rounded-lg border border-[var(--border)] m-4">
          <p className="text-xs sm:text-sm text-[var(--muted-text)] font-semibold">
            No college predictions were found for your percentile and
            preferences. Try adjusting your filters or checking with a different
            percentile.
          </p>
        </div>
      )}
    </div>
  );
}
