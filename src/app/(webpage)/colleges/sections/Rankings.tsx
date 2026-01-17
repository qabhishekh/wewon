import React from "react";
import Image from "next/image";
import SubHeading from "@/components/sections/SubHeading";
import { Ranking as RankingType } from "@/store/types";

interface RankingsProps {
  rankings: RankingType[];
}

// Agency logo mapping based on keywords
const AGENCY_LOGOS: { keyword: string; image: string }[] = [
  { keyword: "the", image: "/rankings/THE.png" },
  { keyword: "india today", image: "/rankings/India today.png" },
  { keyword: "qs", image: "/rankings/QS.png" },
  { keyword: "outlook", image: "/rankings/Outlook.png" },
  { keyword: "nirf", image: "/rankings/NIRF.png" },
  { keyword: "shanghai", image: "/rankings/SHANGHAI.png" },
  { keyword: "world university", image: "/rankings/World University.png" },
  { keyword: "the week", image: "/rankings/The Week.png" },
];

const getAgencyLogo = (agency: string): string | null => {
  const agencyLower = agency.toLowerCase();

  // Check "the week" first as it's more specific than "the"
  if (agencyLower.includes("the week")) {
    return "/rankings/The Week.png";
  }

  for (const { keyword, image } of AGENCY_LOGOS) {
    // Skip "the" if we already handled "the week"
    if (keyword === "the" && agencyLower.includes("the week")) {
      continue;
    }
    if (agencyLower.includes(keyword)) {
      return image;
    }
  }

  return null;
};

export default function Rankings({ rankings }: RankingsProps) {
  if (!rankings || rankings.length === 0) {
    return null;
  }

  // Group rankings by category
  const rankingsByCategory: { [key: string]: RankingType[] } = {};
  rankings.forEach((ranking) => {
    if (!rankingsByCategory[ranking.Category]) {
      rankingsByCategory[ranking.Category] = [];
    }
    rankingsByCategory[ranking.Category].push(ranking);
  });

  return (
    <div className="py-8">
      <SubHeading
        top="Rankings"
        bottom="College rankings from various agencies"
      />

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                Agency
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                Rank
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rankings.map((ranking) => {
              const agencyLogo = getAgencyLogo(ranking.Agency);
              return (
                <tr
                  key={ranking._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {ranking.Category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-3">
                      {agencyLogo && (
                        <Image
                          src={agencyLogo}
                          alt={ranking.Agency}
                          width={100}
                          height={100}
                          className="object-contain"
                        />
                      )}
                      <span>{ranking.Agency}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ranking.Year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
                    #{ranking.Rank_Range}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
