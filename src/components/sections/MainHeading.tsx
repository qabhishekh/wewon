import React from "react";

const MainHeading = ({ top, bottom }: { top: string; bottom?: string }) => {
  return (
    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--primary)] leading-tight md:leading-tight text-center pt-14 pb-2">
      {top}
      <br />
      {bottom}
    </h1>
  );
};

export default MainHeading;
