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
      className="bg-background pt-14 mb-14"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div
          className="rounded-r-3xl p-8 md:p-12"
          style={{ backgroundColor: primaryColor }}
        >
          {/* Who We Are Section */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: accentColor }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-white">
              {whoWeAre.title}
            </h2>
          </div>

          {whoWeAre.description.map((text, idx) => (
            <p
              key={idx}
              className="text-white text-base md:text-lg leading-relaxed mb-6 opacity-90"
            >
              {text}
            </p>
          ))}

          {/* Conditional Employee Section */}
          {showEmployees && employees.length > 0 && (
            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-3">
                {employees.map((emp, idx) => (
                  <div
                    key={idx}
                    className="w-14 h-14 rounded-full border-4 overflow-hidden"
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

              <button className="flex items-center gap-2 px-8 py-3 rounded-full border-1 border-white text-white text-base md:text-lg font-medium hover:bg-white hover:text-[var(--primary)] transition-all">
                And more
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Our Vision Section */}
          <div
            className="rounded-l-3xl p-8 md:p-12"
            style={{ backgroundColor: primaryColor }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
              {ourVision.title}
            </h2>
            {ourVision.description.map((text, idx) => (
              <p
                key={idx}
                className="text-white text-base md:text-lg leading-relaxed opacity-90"
              >
                {text}
              </p>
            ))}
          </div>

          {/* Our Story Section */}
          <div
            className="rounded-l-3xl p-8 md:p-12 bg-white border-y-1 border-l-1"
            style={{ borderColor: primaryColor }}
          >
            <h2
              className="text-4xl md:text-5xl font-semibold mb-6"
              style={{ color: primaryColor }}
            >
              {ourStory.title}
            </h2>
            {ourStory.description.map((text, idx) => (
              <p
                key={idx}
                className="text-base md:text-lg leading-relaxed"
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
