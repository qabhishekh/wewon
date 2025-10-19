import React from "react";

export default function Heading({ text, centered }: { text?: string; centered?: boolean }) {
  return (
    <h2 className={`text-4xl sm:text-5xl font-bold text-[var(--primary)] ${centered ? "text-center" : ""}`}>
      {text}
    </h2>
  );
}
