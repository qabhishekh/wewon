"use client";
import React from "react";

const MainHeading = ({
  top,
  bottom,
  align = "center",
  className,
}: {
  top: string;
  bottom?: string;
  align?: "left" | "center" | "right";
  className?: string;
}) => {
  return (
    <h1
      className={`text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--primary)] leading-tight md:leading-tight pt-14 pb-2 text-${align} ${className}`}
    >
      <span style={{ whiteSpace: "pre" }}>{top}</span>
      {bottom && (
        <div className="text-xl md:text-4xl lg:text-5xl my-2">
          <span style={{ whiteSpace: "pre" }}>{bottom}</span>
        </div>
      )}
    </h1>
  );
};

export default MainHeading;
