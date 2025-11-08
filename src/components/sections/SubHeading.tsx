import React from "react";

const SubHeading = ({
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
    <h1 className={`text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--primary)] leading-tight md:leading-tight pt-14 pb-2 text-${align} ${className}`}>
      {top}
      <br />
      {bottom}
    </h1>
  );
};

export default SubHeading;