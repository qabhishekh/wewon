import React from "react";
import SubHeading from "@/components/sections/SubHeading";

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

export default function Overview({ collegeInfo }: OverviewProps) {
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
    </div>
  );
}
