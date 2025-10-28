"use client";
import React from "react";
import { Search } from "lucide-react";

export default function SearchInput({ placeholder }: { placeholder?: string }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <div className="flex gap-2 max-w-sm">
      <div className="relative flex-1 md:w-80">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2"
          size={20}
          style={{ color: "rgba(13, 58, 102, 0.4)" }}
        />
        <input
          type="text"
          placeholder={`Search for ${placeholder || "College"}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 pl-12 pr-4 rounded-lg outline-none transition-all"
          style={{
            border: "1px solid rgba(13, 58, 102, 0.2)",
            color: "#0D3A66",
            backgroundColor: "#ffffff",
          }}
        />
      </div>

      <button
        className="p-3 rounded-lg transition-all hover:opacity-90"
        style={{ backgroundColor: "#0D3A66" }}
      >
        <Search size={20} style={{ color: "#ffffff" }} />
      </button>
    </div>
  );
}
