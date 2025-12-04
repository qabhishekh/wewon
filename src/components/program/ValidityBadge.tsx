"use client";
import React from "react";
import { Clock } from "lucide-react";

interface ValidityBadgeProps {
  validityInDays: number;
}

export default function ValidityBadge({ validityInDays }: ValidityBadgeProps) {
  const years = Math.floor(validityInDays / 365);
  const months = Math.floor((validityInDays % 365) / 30);
  const days = validityInDays % 30;

  let displayText = "";
  if (years > 0) {
    displayText = `${years} Year${years > 1 ? "s" : ""}`;
    if (months > 0) {
      displayText += ` ${months} Month${months > 1 ? "s" : ""}`;
    }
  } else if (months > 0) {
    displayText = `${months} Month${months > 1 ? "s" : ""}`;
  } else {
    displayText = `${days} Day${days > 1 ? "s" : ""}`;
  }

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
      <Clock size={20} className="text-blue-600" />
      <span className="font-semibold text-blue-700">
        {displayText} Access Validity
      </span>
    </div>
  );
}
