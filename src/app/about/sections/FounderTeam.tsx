import MainHeading from "@/components/sections/MainHeading";
import React from "react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export default function FounderTeam({ team }: { team: TeamMember[] }) {
  return (
    <div
      className="px-4 md:px-12 bg-white"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <MainHeading top={"Founder & Team"} />
      <div className="max-w-7xl mx-auto mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl hover:shadow-2xl transition-all duration-300"
              style={{ aspectRatio: "3/4" }}
            >
              {/* Image Container */}
              <div className="absolute inset-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--primary)] opacity-90"
                  style={{
                    background: `linear-gradient(to bottom, transparent 0%, transparent 50%, var(--primary) 100%)`,
                  }}
                ></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <h2 className="text-xl md:text-2xl font-bold mb-2">
                  {member.name}
                </h2>
                <p className="text-sm md:text-base opacity-90">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
