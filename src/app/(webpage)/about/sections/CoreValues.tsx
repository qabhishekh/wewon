import SubHeading from "@/components/sections/SubHeading";
import React from "react";

type Value = {
  number: string;
  title: string;
  description: string;
};

export default function CoreValues({ values }: { values: Value[] }) {
  return (
    <div
      className="mx-auto p-6 lg:p-12"
      style={{ backgroundColor: "#F9FAFB", fontFamily: "Poppins, sans-serif" }}
    >
      <div className="container mx-auto">
        <SubHeading top={"Our Core Values"} />
        <div className="mt-8 md:mt-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex gap-4 md:gap-6 lg:gap-8 items-start md:items-center">
                  <div
                    className="text-5xl md:text-7xl lg:text-8xl flex-shrink-0 leading-none font"
                    style={{ color: "#869DB3" }}
                  >
                    {value.number}
                  </div>

                  <div className="pt-1 md:pt-2">
                    <h2
                      className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 lg:mb-4"
                      style={{ color: "var(--primary)" }}
                    >
                      {value.title}
                    </h2>
                    <p
                      className="text-sm md:text-base lg:text-lg leading-relaxed"
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
    </div>
  );
}
