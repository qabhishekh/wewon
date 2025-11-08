import React from "react";
import SubHeading from "@/components/sections/SubHeading";

interface Impacts {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string
}

export default function OurImpact({impacts}:{impacts:Impacts[]}) {
  

  return (
    <div
      className="mx-auto p-6 lg:p-12"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <SubHeading top={"Our Impact"} />
      <div className="mx-auto mt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center"

                  >
                    <Icon
                      className="w-6 h-6 md:w-7 md:h-7 text-black"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h2
                    className="text-lg md:text-lg font-semibold leading-tight"
                    style={{ color: "#1a1a1a" }}
                  >
                    {impact.title}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
