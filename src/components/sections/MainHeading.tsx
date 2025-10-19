import React from "react";

const MainHeading = ({
  top,
  bottom,
  align = "center",
}: {
  top: string;
  bottom?: string;
  align?: "left" | "center" | "right";
}) => {
  return (
    <h1 className={`text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--primary)] leading-tight md:leading-tight pt-14 pb-2 text-${align}`}>
      {top}
      <br />
      {bottom}
    </h1>
  );
};

export default MainHeading;
