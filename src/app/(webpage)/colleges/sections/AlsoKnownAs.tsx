import React from "react";
import SubHeading from "@/components/sections/SubHeading";

interface AlsoKnownAsProps {
  alternateNames: string[];
}

export default function AlsoKnownAs({ alternateNames }: AlsoKnownAsProps) {
  if (!alternateNames || alternateNames.length === 0) return null;

  return (
    <div className="py-8">
      <SubHeading align="left" top="Also Known As" />

      <div className="mt-6 flex flex-wrap gap-3">
        {alternateNames.map((name, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-blue-50 text-[var(--primary)] rounded-lg text-sm font-medium border border-blue-100"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
