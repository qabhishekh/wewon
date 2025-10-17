import MainHeading from "@/components/sections/MainHeading";
import React from "react";

type Value = {
  number: string;
  title: string;
  description: string;
};

export default function CoreValues({ values }: { values: Value[] }) {
  return (
    <div
      className="px-4 md:px-8 pb-14"
      style={{ backgroundColor: "#F9FAFB", fontFamily: "Poppins, sans-serif" }}
    >
      <MainHeading top={"Our Core Values"} />
      <div className="max-w-7xl mx-auto mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex gap-6 md:gap-8 items-center">
                <div
                  className="text-7xl md:text-8xl flex-shrink-0 leading-none"
                  style={{ color: "#8BA5B8" }}
                >
                  {value.number}
                </div>

                <div className="pt-2">
                  <h2
                    className="text-xl md:text-2xl font-bold mb-3 md:mb-4"
                    style={{ color: "var(--primary)" }}
                  >
                    {value.title}
                  </h2>
                  <p
                    className="text-base md:text-lg leading-relaxed"
                    style={{ color: "#8BA5B8" }}
                  >
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
