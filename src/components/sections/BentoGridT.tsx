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
  whoWeAre: Section;
  ourVision: Section;
  ourStory: Section;
  showEmployees?: boolean;
  employees?: Employee[];
  primaryColor?: string;
  accentColor?: string;
}

const BentoGridT: React.FC<BentoGridProps> = ({
  whoWeAre,
  ourVision,
  ourStory,
  showEmployees = false,
  employees = [],
  primaryColor = "var(--primary)",
  accentColor = "var(--accent)",
}) => {
  return (
    <div
      className="bg-background pt-8 md:pt-14 mb-8 md:mb-14 px-4 md:px-0"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Left Column */}
        <div
          className="rounded-3xl md:rounded-r-3xl md:rounded-l-none p-6 md:p-8 lg:p-12"
          style={{ backgroundColor: primaryColor }}
        >
          {/* Who We Are Section */}
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 max-sm:hidden"
              style={{ backgroundColor: accentColor }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="md:w-6 md:h-6"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
              {whoWeAre.title}
            </h2>
          </div>

          {whoWeAre.description.map((text, idx) => (
            <p
              key={idx}
              className="text-white text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6 opacity-90"
            >
              {text}
            </p>
          ))}

          {/* Conditional Employee Section */}
          {showEmployees && employees.length > 0 && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6 md:mt-8">
              <div className="flex -space-x-3">
                {employees.map((emp, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full border-4 overflow-hidden"
                    style={{ borderColor: primaryColor }}
                  >
                    <img
                      src={emp.img}
                      alt={emp.alt || `Employee ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <button className="flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3 rounded-full border-1 border-white text-white text-sm md:text-base lg:text-lg font-medium hover:bg-white hover:text-[var(--primary)] transition-all">
                And more
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="md:w-5 md:h-5"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Our Vision Section */}
          <div
            className="rounded-3xl md:rounded-l-3xl md:rounded-r-none p-6 md:p-8 lg:p-12"
            style={{ backgroundColor: primaryColor }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 md:mb-6">
              {ourVision.title}
            </h2>
            {ourVision.description.map((text, idx) => (
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
            className="rounded-3xl md:rounded-l-3xl md:rounded-r-none p-6 md:p-8 lg:p-12 bg-white border-1 md:border-y-1 md:border-l-1 md:border-r-0"
            style={{ borderColor: primaryColor }}
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 md:mb-6"
              style={{ color: primaryColor }}
            >
              {ourStory.title}
            </h2>
            {ourStory.description.map((text, idx) => (
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

export default BentoGridT;