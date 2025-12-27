import React from "react";
import SubHeading from "@/components/sections/SubHeading";
import { ExternalLink } from "lucide-react";

interface WebsiteLinkProps {
  websiteUrl: string;
  collegeName: string;
}

export default function WebsiteLink({
  websiteUrl,
  collegeName,
}: WebsiteLinkProps) {
  if (!websiteUrl) return null;

  return (
    <div className="py-8">
      <SubHeading align="left" top="Official Website" />

      <div className="mt-6">
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-4 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-all font-medium"
        >
          <span>Visit {collegeName} Official Website</span>
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
