import React from "react";

interface Employee {
  img: string;
  alt?: string;
}

interface Section {
  title: string;
  description: string[];
}

interface BentoGridProps {
  rightHead: Section;
  bottomHead: Section;
  primaryColor?: string;
  accentColor?: string;
}

const BentoGridT2: React.FC<BentoGridProps> = ({
  rightHead,
  bottomHead,
  primaryColor = "var(--primary)",
}) => {
  return (
    <div
      className="bg-background pt-8 md:pt-14 px-4 "
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="mx-auto grid grid-cols-1 gap-4 md:gap-6 container px-4 md:px-8 lg:px-12">
        {/* Right Column */}
        <div className="flex gap-4 md:gap-6">
          {/* Our Vision Section */}
          <div
            className="rounded-3xl p-6 md:p-8 lg:p-12 w-1/2"
            style={{ backgroundColor: primaryColor }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 md:mb-6">
              {rightHead.title}
            </h2>
            {rightHead.description.map((text, idx) => (
              <p
                key={idx}
                className="text-white text-sm md:text-base lg:text-lg leading-relaxed opacity-90"
              >
                {text}
              </p>
            ))}
          </div>

          {/* Our Story Section */}
          <div
            className="rounded-3xl p-6 md:p-8 lg:p-12 bg-white border-1 w-1/2"
            style={{ borderColor: primaryColor }}
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 md:mb-6"
              style={{ color: primaryColor }}
            >
              {bottomHead.title}
            </h2>
            {bottomHead.description.map((text, idx) => (
              <p
                key={idx}
                className="text-sm md:text-base lg:text-lg leading-relaxed"
                style={{ color: primaryColor }}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGridT2;
