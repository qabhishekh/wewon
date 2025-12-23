import React from "react";
import SubHeading from "@/components/sections/SubHeading";
import { Ranking as RankingType } from "@/store/types";

interface RankingsProps {
  rankings: RankingType[];
}

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
        {Object.entries(rankingsByCategory).map(([category, ranks]) => (
          <div key={category} className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b">
              {category}
            </h3>
            <div className="space-y-2">
              {ranks.map((ranking) => (
                <div
                  key={ranking._id}
                  className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {ranking.Agency}
                    </p>
                    <p className="text-xs text-gray-500">{ranking.Year}</p>
                  </div>
                  <span className="text-sm font-bold text-blue-600 ml-3">
                    #{ranking.Rank_Range}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}