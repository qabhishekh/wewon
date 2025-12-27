import React from "react";
import SubHeading from "@/components/sections/SubHeading";
import { GraduationCap, Award, IndianRupee } from "lucide-react";

interface OverviewProps {
  admissionHighlights?: string[];
  topRankings?: Array<{ category: string; rank: number }>;
  feeRange?: { min: number; max: number };
}

export default function Overview({
  admissionHighlights,
  topRankings,
  feeRange,
}: OverviewProps) {
  return (
    <div className="py-8">
      <SubHeading
        align="left"
        top="Overview"
        bottom="Quick insights about the college"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Admission Highlights */}
        {admissionHighlights && admissionHighlights.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-blue-50">
                <GraduationCap className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--primary)]">
                Admission
              </h3>
            </div>
            <ul className="space-y-2">
              {admissionHighlights.slice(0, 3).map((highlight, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 flex items-start gap-2"
                >
                  <span className="text-[var(--primary)] mt-1">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Top Rankings */}
        {topRankings && topRankings.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-yellow-50">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--primary)]">
                Rankings
              </h3>
            </div>
            <ul className="space-y-2">
              {topRankings.slice(0, 3).map((ranking, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 flex justify-between"
                >
                  <span>{ranking.category}</span>
                  <span className="font-semibold text-[var(--primary)]">
                    #{ranking.rank}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Fee Range */}
        {feeRange && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-green-50">
                <IndianRupee className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--primary)]">
                Fee Range
              </h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Minimum</span>
                <span className="font-semibold text-gray-900">
                  ₹{feeRange.min.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Maximum</span>
                <span className="font-semibold text-gray-900">
                  ₹{feeRange.max.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
