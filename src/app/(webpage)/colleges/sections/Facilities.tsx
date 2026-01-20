"use client";
import React, { useState } from "react";
import SubHeading from "@/components/sections/SubHeading";
import { Facility as FacilityType } from "@/store/types";
import {
  ChevronDown,
  ChevronUp,
  Landmark,
  BookOpen,
  Utensils,
  Building,
  Home,
  Dumbbell,
  HeartPulse,
  HelpCircle,
  Wifi,
} from "lucide-react";
import Image from "next/image";

// Map facility names to their icons
const facilityIcons: { [key: string]: React.ReactNode } = {
  bank: <Landmark size={18} className="text-blue-600" />,
  library: <BookOpen size={18} className="text-amber-600" />,
  canteen: <Utensils size={18} className="text-orange-600" />,
  "boys hostel": <Building size={18} className="text-indigo-600" />,
  "girls hostel": <Home size={18} className="text-pink-600" />,
  sports: <Dumbbell size={18} className="text-green-600" />,
  medical: <HeartPulse size={18} className="text-red-600" />,
  "wi-fi": <Wifi size={18} className="text-blue-600" />,
};

// Get icon for a facility (case-insensitive matching)
const getFacilityIcon = (facilityName: string): React.ReactNode => {
  const normalizedName = facilityName.toLowerCase().trim();
  return (
    facilityIcons[normalizedName] || (
      <HelpCircle size={18} className="text-gray-500" />
    )
  );
};

interface FacilitiesProps {
  facilities: FacilityType[];
  topRecruitersImage?: string | null;
  pastRecruitersImage?: string | null;
}

export default function Facilities({
  facilities,
  topRecruitersImage,
  pastRecruitersImage,
}: FacilitiesProps) {
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

  // Map type to image
  const typeImages: { [key: string]: string | null | undefined } = {
    Top_Recruiters: topRecruitersImage,
    Past_Recruiters: pastRecruitersImage,
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

      {/* Recruiter Images - Above Accordion */}
      <div className="flex flex-col gap-4 mt-6">
        {topRecruitersImage && (
          <div className="w-full bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Top Recruiters
            </h3>
            <div className="relative w-full h-auto">
              <Image
                src={topRecruitersImage}
                alt="Top Recruiters"
                width={1200}
                height={400}
                className="w-full h-auto rounded-lg"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        )}
        {pastRecruitersImage && (
          <div className="w-full bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Past Recruiters
            </h3>
            <div className="relative w-full h-auto">
              <Image
                src={pastRecruitersImage}
                alt="Past Recruiters"
                width={1200}
                height={400}
                className="w-full h-auto rounded-lg"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Accordion Section */}
      <div className="flex flex-col gap-3 mt-6">
        {sortedTypes.map((type) => {
          const items = facilitiesByType[type];
          const isExpanded = expandedTypes.has(type);
          const displayLabel = typeLabels[type] || type;

          return (
            <div key={type}>
              {/* Dropdown Card */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
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
                    {/* Logo-style grid for Recruiters */}
                    {type === "Top_Recruiters" || type === "Past_Recruiters" ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
                        {items.map((facility) => (
                          <div
                            key={facility._id}
                            className="flex items-center justify-center p-3 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors min-h-[60px]"
                          >
                            <p className="text-xs md:text-sm font-semibold text-gray-700 text-center">
                              {facility.Value}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Regular compact layout for Facilities */
                      <div className="flex flex-wrap gap-2">
                        {items.map((facility) => (
                          <div
                            key={facility._id}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-gray-200 shadow-sm"
                          >
                            {getFacilityIcon(facility.Value)}
                            <p className="text-sm text-gray-700 font-medium">
                              {facility.Value}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
