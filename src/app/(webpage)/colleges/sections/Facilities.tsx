import React from "react";
import SubHeading from "@/components/sections/SubHeading";
import { Facility as FacilityType } from "@/store/types";

interface FacilitiesProps {
  facilities: FacilityType[];
}

export default function Facilities({ facilities }: FacilitiesProps) {
  if (!facilities || facilities.length === 0) {
    return null;
  }

  // Group facilities by type
  const facilitiesByType: { [key: string]: FacilityType[] } = {};
  facilities.forEach((facility) => {
    if (!facilitiesByType[facility.Type]) {
      facilitiesByType[facility.Type] = [];
    }
    facilitiesByType[facility.Type].push(facility);
  });

  return (
    <div className="py-8">
      <SubHeading top="Facilities" bottom="Campus facilities and amenities" />

      <div className="flex flex-col gap-4 mt-6">
        {Object.entries(facilitiesByType).map(([type, items]) => {
          return (
            <div
              key={type}
              className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b">
                <h3 className="text-sm font-semibold text-gray-700">{type}</h3>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {items.length}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 flex-1">
                {items.map((facility) => (
                  <div
                    key={facility._id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <p className="text-sm text-gray-700">{facility.Value}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
