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
    <div className="py-12">
      <SubHeading top="Facilities" bottom="Campus facilities and amenities" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {Object.entries(facilitiesByType).map(([type, items]) => (
          <div key={type}>
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "var(--primary)" }}
            >
              {type}
            </h3>
            <div className="space-y-2">
              {items.map((facility) => (
                <div
                  key={facility._id}
                  className="p-3 rounded-lg bg-gray-50 border border-gray-200"
                >
                  <p className="text-gray-800">{facility.Value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
