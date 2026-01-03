import React from "react";
import SubHeading from "@/components/sections/SubHeading";
import {
  GraduationCap,
  Award,
  IndianRupee,
  Building2,
  MapPin,
  Calendar,
} from "lucide-react";

interface CollegeInfo {
  name?: string;
  abbreviation?: string;
  type?: string;
  estYear?: number;
  city?: string;
  state?: string;
  address?: string;
}

interface OverviewProps {
  collegeInfo?: CollegeInfo;
  admissionHighlights?: string[];
  topRankings?: Array<{ category: string; rank: number }>;
  feeRange?: { min: number; max: number };
}

export default function Overview({
  collegeInfo,
  admissionHighlights,
  topRankings,
  feeRange,
}: OverviewProps) {
  // Build table rows from college info
  const infoRows = [
    { label: "Institute Name", value: collegeInfo?.name },
    { label: "Also Known As", value: collegeInfo?.abbreviation },
    { label: "Institute Type", value: collegeInfo?.type },
    { label: "Established", value: collegeInfo?.estYear?.toString() },
    {
      label: "Location",
      value: collegeInfo?.city
        ? `${collegeInfo.city}${
            collegeInfo.state ? `, ${collegeInfo.state}` : ""
          }`
        : "",
    },
  ].filter((row) => row.value);

  return (
    <div className="py-8">
      <SubHeading
        align="left"
        top="Overview"
        bottom="Quick insights about the college"
      />

      {/* College Info Table */}
      {infoRows.length > 0 && (
        <div className="mt-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <tbody>
              {infoRows.map((row, index) => (
                <tr
                  key={row.label}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-3 text-sm w-1/3 border-r border-gray-200 font-bold">
                    {row.label}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats Cards */}
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
