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

      <style jsx>{`
        .facility-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .facility-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .facility-scroll::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .facility-scroll::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .facility-scroll {
          scrollbar-width: thin;
          scrollbar-color: #888 #f1f1f1;
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {Object.entries(facilitiesByType).map(([type, items]) => (
          <div key={type} className="relative">
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "var(--primary)" }}
            >
              {type}
            </h3>
            <div className="relative">
              <div
                className={`space-y-2 ${
                  items.length > 5
                    ? "max-h-[400px] overflow-y-auto pr-2 facility-scroll"
                    : ""
                }`}
              >
                {items.map((facility) => (
                  <div
                    key={facility._id}
                    className="p-3 rounded-lg bg-gray-50 border border-gray-200"
                  >
                    <p className="text-gray-800">{facility.Value}</p>
                  </div>
                ))}
              </div>
              {items.length > 5 && (
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
