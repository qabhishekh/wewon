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
    <div className="py-12">
      <SubHeading
        top="Rankings"
        bottom="College rankings from various agencies"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {Object.entries(rankingsByCategory).map(([category, ranks]) => (
          <div key={category}>
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "var(--primary)" }}
            >
              {category}
            </h3>
            <div className="space-y-4">
              {ranks.map((ranking) => (
                <div
                  key={ranking._id}
                  className="p-4 rounded-lg border"
                  style={{ borderColor: "rgba(13, 58, 102, 0.2)" }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">
                      {ranking.Agency}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {ranking.Year}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">
                      #{ranking.Rank_Range}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
