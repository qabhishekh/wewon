"use client";
import React, { useState } from "react";
import SubHeading from "@/components/sections/SubHeading";
import { Facility as FacilityType } from "@/store/types";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FacilitiesProps {
  facilities: FacilityType[];
}

export default function Facilities({ facilities }: FacilitiesProps) {
  const [expandedTypes, setExpandedTypes] = useState<Set<string>>(new Set());

  if (!facilities || facilities.length === 0) {
    return null;
  }

  // Define priority order for types (Top_Recruiters first, then Past_Recruiters)
  const typePriority: { [key: string]: number } = {
    Top_Recruiters: 1,
    Past_Recruiters: 2,
    Recruiter: 3,
    Facility: 4,
  };

  // Display labels for better readability
  const typeLabels: { [key: string]: string } = {
    Top_Recruiters: "Top Recruiters",
    Past_Recruiters: "Past Recruiters",
    Recruiter: "Recruiters",
    Facility: "Facilities",
  };

  // Group facilities by type
  const facilitiesByType: { [key: string]: FacilityType[] } = {};
  facilities.forEach((facility) => {
    if (!facilitiesByType[facility.Type]) {
      facilitiesByType[facility.Type] = [];
    }
    facilitiesByType[facility.Type].push(facility);
  });

  // Sort types by priority
  const sortedTypes = Object.keys(facilitiesByType).sort((a, b) => {
    const priorityA = typePriority[a] ?? 99;
    const priorityB = typePriority[b] ?? 99;
    return priorityA - priorityB;
  });

  const toggleType = (type: string) => {
    const newExpanded = new Set(expandedTypes);
    if (newExpanded.has(type)) {
      newExpanded.delete(type);
    } else {
      newExpanded.add(type);
    }
    setExpandedTypes(newExpanded);
  };

  return (
    <div className="py-8">
      <SubHeading
        align="left"
        top="Facilities"
        bottom="Campus facilities and amenities"
      />

      <div className="flex flex-col gap-3 mt-6">
        {sortedTypes.map((type) => {
          const items = facilitiesByType[type];
          const isExpanded = expandedTypes.has(type);
          const displayLabel = typeLabels[type] || type;

          return (
            <div
              key={type}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md"
            >
              {/* Header - Always Visible */}
              <button
                onClick={() => toggleType(type)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-semibold text-gray-800">
                    {displayLabel}
                  </h3>
                  <span className="text-xs font-medium text-white bg-blue-600 px-2.5 py-1 rounded-full">
                    {items.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </button>

              {/* Expandable Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-gray-100 bg-gray-50">
                  <div className="flex flex-wrap gap-2">
                    {items.map((facility) => (
                      <div
                        key={facility._id}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-gray-200 shadow-sm"
                      >
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        <p className="text-sm text-gray-700 font-medium">
                          {facility.Value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
