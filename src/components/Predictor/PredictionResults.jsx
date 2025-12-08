"use client";

import { useState } from "react";

export default function PredictionResults({ results }) {
  const [activeTab, setActiveTab] = useState("JoSAA");
  const [genderFilter, setGenderFilter] = useState("All");

  const [expandedGroups, setExpandedGroups] = useState({
    High: true,
    Medium: true,
    Low: true,
  });

  if (!results) return null;

  const tabs = [
    { id: "JoSAA", label: "JoSAA", data: results.josaaPredictions },
    { id: "CSAB", label: "CSAB", data: results.csabPredictions },
    { id: "IIT", label: "IIT", data: results.iitPredictions },
  ].filter((tab) => tab.data && tab.data.length > 0);

  // If the current active tab has no data, switch to the first available tab
  if (tabs.length > 0 && !tabs.find((tab) => tab.id === activeTab)) {
    setActiveTab(tabs[0].id);
  }

  const currentData = tabs.find((tab) => tab.id === activeTab)?.data || [];

  const filteredData = currentData.filter((item) => {
    if (genderFilter === "All") return true;
    if (genderFilter === "Female-only") {
      return item.gender.toLowerCase().includes("female");
    }
    if (genderFilter === "Gender-Neutral") {
      return item.gender.toLowerCase().includes("neutral");
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

  const groups = [
    {
      key: "High",
      label: "High Probability",
      color: "text-green-700",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    {
      key: "Medium",
      label: "Medium Probability",
      color: "text-yellow-700",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    },
    {
      key: "Low",
      label: "Low Probability",
      color: "text-red-700",
      bg: "bg-red-50",
      border: "border-red-200",
    },
  ];

  const toggleGroup = (key) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="mt-6 sm:mt-10 bg-white border border-[var(--border)] rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
      <div className="p-3 sm:p-6 border-b border-[var(--border)]">
        <h3 className="text-lg sm:text-2xl font-bold text-[var(--foreground)]">
          Prediction Results
        </h3>
        <p className="text-xs sm:text-sm text-[var(--muted-text)] mt-1">
          Based on your rank and preferences
        </p>
      </div>

      {/* Gender Filter */}
      <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-[var(--border)] flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
        <span className="text-xs sm:text-sm font-medium text-[var(--muted-text)]">
          Filter by Gender:
        </span>
        <div className="flex gap-1.5 sm:gap-2 flex-wrap">
          {["All", "Gender-Neutral", "Female-only"].map((filter) => (
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

      {/* Tabs */}
      {tabs.length > 0 ? (
        <>
          <div className="flex border-b border-[var(--border)] overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-b-2 border-[var(--primary)] text-[var(--primary)] bg-[var(--muted-background)]"
                    : "text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-gray-50"
                }`}
              >
                {tab.label} ({tab.data.length})
              </button>
            ))}
          </div>

          {/* Grouped Results */}
          <div className="p-3 sm:p-6 space-y-3 sm:space-y-4">
            {groups.map((group) => {
              const items = groupedData[group.key];
              if (items.length === 0) return null;
              const isExpanded = expandedGroups[group.key];

              return (
                <div
                  key={group.key}
                  className={`rounded-lg sm:rounded-xl border ${group.border} overflow-hidden transition-all duration-300`}
                >
                  <button
                    onClick={() => toggleGroup(group.key)}
                    className={`w-full px-3 sm:px-6 py-3 sm:py-4 ${
                      group.bg
                    } border-b ${
                      isExpanded ? group.border : "border-transparent"
                    } flex items-center justify-between transition-colors hover:bg-opacity-80`}
                  >
                    <h4
                      className={`font-semibold text-sm sm:text-base ${group.color} flex items-center gap-1.5 sm:gap-2`}
                    >
                      {group.label}
                      <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-white bg-opacity-60 border border-current">
                        {items.length}
                      </span>
                    </h4>
                    <svg
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        group.color
                      } transform transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="overflow-x-auto animate-in fade-in slide-in-from-top-2 duration-200">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-gray-50 text-[var(--muted-text)] uppercase font-semibold text-[10px] sm:text-xs">
                          <tr>
                            <th className="px-2 sm:px-6 py-2 sm:py-3 max-w-[300px]">
                              Institute
                            </th>
                            <th className="px-2 sm:px-6 py-2 sm:py-3 max-w-[280px]">
                              Branch
                            </th>
                            <th className="px-2 sm:px-6 py-2 sm:py-3 whitespace-nowrap">
                              Gender
                            </th>
                            <th className="px-2 sm:px-6 py-2 sm:py-3 whitespace-nowrap">
                              Quota
                            </th>

                            <th className="px-2 sm:px-6 py-2 sm:py-3 whitespace-nowrap">
                              Seat Type
                            </th>
                            <th className="px-2 sm:px-6 py-2 sm:py-3 whitespace-nowrap">
                              Ranks (Open - Close)
                            </th>
                            <th className="px-2 sm:px-6 py-2 sm:py-3 whitespace-nowrap">
                              Round
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                          {items.map((item, index) => (
                            <tr
                              key={index}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-2 sm:px-6 py-3 sm:py-4 font-medium text-[var(--foreground)] max-w-[300px] break-words">
                                {item.institute}
                              </td>
                              <td className="px-2 sm:px-6 py-3 sm:py-4 text-[var(--muted-text)] max-w-[280px] break-words">
                                {item.branch}
                              </td>
                              <td className="px-2 sm:px-6 py-3 sm:py-4 text-[var(--muted-text)]">
                                <span
                                  className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                                    item.gender.toLowerCase().includes("female")
                                      ? "bg-pink-100 text-pink-700"
                                      : "bg-blue-100 text-blue-700"
                                  }`}
                                >
                                  {item.gender.toLowerCase().includes("female")
                                    ? "Female"
                                    : "Neutral"}
                                </span>
                              </td>
                              <td className="px-2 sm:px-6 py-3 sm:py-4 text-[var(--muted-text)] whitespace-nowrap">
                                {item.quota}
                              </td>
                              <td className="px-2 sm:px-6 py-3 sm:py-4 text-[var(--muted-text)] whitespace-nowrap">
                                {item.seatType}
                              </td>
                              <td className="px-2 sm:px-6 py-3 sm:py-4 text-[var(--muted-text)] whitespace-nowrap">
                                {item.openingRank} - {item.closingRank}
                              </td>
                              <td className="px-2 sm:px-6 py-3 sm:py-4 text-[var(--muted-text)] whitespace-nowrap">
                                {item.round}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="p-6 sm:p-8 text-center text-xs sm:text-sm text-[var(--muted-text)]">
          No predictions found matching your criteria.
        </div>
      )}
    </div>
  );
}
