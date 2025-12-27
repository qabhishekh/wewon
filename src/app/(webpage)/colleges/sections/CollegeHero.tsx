import React from "react";
import {
  MapPin,
  Star,
  Building2,
  GraduationCap,
  IndianRupee,
  Award,
  TrendingUp,
  Users,
  BookOpen,
} from "lucide-react";

interface CollegeHeroProps {
  name: string;
  location?: string;
  rating?: number;
  image?: string;
  logo: string;
  conductedBy?: string;
  tags?: string[];
  tabs?: string[];
  onTabChange?: (tabName: string) => void;
  buttons?: {
    label: string;
    icon: string;
    function: () => void;
  }[];
}

const tabIcons: { [key: string]: React.ReactNode } = {
  "Admission Rules": <BookOpen size={20} />,
  Connectivity: <MapPin size={20} />,
  Courses: <GraduationCap size={20} />,
  Facilities: <Building2 size={20} />,
  Fees: <IndianRupee size={20} />,
  "Fee Waivers": <Award size={20} />,
  Placements: <TrendingUp size={20} />,
  Rankings: <Star size={20} />,
  "Seat Matrix": <Users size={20} />,
};

export default function CollegeHero({
  name,
  location,
  rating,
  logo,
  tags,
  tabs,
  onTabChange,
}: CollegeHeroProps) {
  return (
    <div className="bg-[#0f3a67] text-white">
      {/* Hero Content */}
      <div className="w-full mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-6">
          {/* Logo */}
          <div className="w-32 h-32 mb-4 bg-white rounded-full overflow-hidden flex items-center justify-center border-4 border-white shadow-lg">
            <img
              src={logo}
              alt={name}
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.innerHTML = `<div class="text-4xl font-bold text-[#0D3A66]">${name.charAt(
                    0
                  )}</div>`;
                }
              }}
            />
          </div>

          {/* College Name */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{name}</h1>

          {/* Location and Rating */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            {location && (
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-5 h-5" />
                <span className="text-sm md:text-base">{location}</span>
              </div>
            )}

            {rating && (
              <div className="flex items-center gap-2 text-white/90">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm md:text-base font-semibold">
                  {rating}/5
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        {tabs && tabs.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange?.(tab)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all bg-transparent text-white hover:bg-white/10 hover:scale-105"
              >
                {tabIcons[tab]}
                <span className="text-sm md:text-base">{tab}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
