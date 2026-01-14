import React, { useState } from "react";
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
  ChevronDown,
  Images,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Globe,
} from "lucide-react";

interface SocialMediaLink {
  _id: string;
  Platform: string;
  Url: string;
}

interface CollegeHeroProps {
  name: string;
  location?: string;
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
  socialMedia?: SocialMediaLink[];
}

const tabIcons: { [key: string]: React.ReactNode } = {
  "Admission Rules": <BookOpen size={20} />,
  Connectivity: <MapPin size={20} />,
  Courses: <GraduationCap size={20} />,
  Facilities: <Building2 size={20} />,
  Fees: <IndianRupee size={20} />,
  "Fee Waivers": <Award size={20} />,
  Gallery: <Images size={20} />,
  Placements: <TrendingUp size={20} />,
  Rankings: <Star size={20} />,
  "Seat Matrix": <Users size={20} />,
};

// Social media platform icons and colors
const getSocialMediaIcon = (platform: string) => {
  const platformLower = platform.toLowerCase();

  switch (platformLower) {
    case "linkedin":
      return {
        icon: <Linkedin size={20} />,
        color: "#0A66C2",
        hoverColor: "#0A66C2",
      };
    case "twitter":
    case "x":
      return {
        icon: <Twitter size={20} />,
        color: "#1DA1F2",
        hoverColor: "#1DA1F2",
      };
    case "instagram":
      return {
        icon: <Instagram size={20} />,
        color: "#E4405F",
        hoverColor: "#E4405F",
      };
    case "facebook":
      return {
        icon: <Facebook size={20} />,
        color: "#1877F2",
        hoverColor: "#1877F2",
      };
    case "youtube":
      return {
        icon: <Youtube size={20} />,
        color: "#FF0000",
        hoverColor: "#FF0000",
      };
    default:
      return {
        icon: <Globe size={20} />,
        color: "#ffffff",
        hoverColor: "#ffffff",
      };
  }
};

export default function CollegeHero({
  name,
  location,
  logo,
  tags,
  tabs,
  onTabChange,
  socialMedia,
}: CollegeHeroProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(tabs?.[0] || "");

  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
    setIsDropdownOpen(false);
    onTabChange?.(tab);
  };

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

          {/* Location */}
          {location && (
            <div className="flex items-center justify-center gap-2 text-white/90 mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-sm md:text-base">{location}</span>
            </div>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-4">
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

          {/* Social Media Links */}
          {socialMedia && socialMedia.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {socialMedia.map((social) => {
                const { icon, color } = getSocialMediaIcon(social.Platform);
                return (
                  <a
                    key={social._id}
                    href={social.Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/20"
                    title={`Follow on ${social.Platform}`}
                  >
                    <span
                      className="transition-colors duration-300"
                      style={{ color: color }}
                    >
                      {icon}
                    </span>
                    <span className="text-sm font-medium text-white/90 group-hover:text-white">
                      {social.Platform}
                    </span>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        {tabs && tabs.length > 0 && (
          <>
            {/* Mobile Dropdown */}
            <div className="md:hidden relative mb-4">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className="flex items-center gap-2">
                  {tabIcons[selectedTab]}
                  <span className="text-sm font-medium">
                    {selectedTab || "Select Section"}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#0D3A66] rounded-lg border border-white/20 shadow-lg z-50 max-h-64 overflow-y-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabSelect(tab)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-white/10 ${
                        selectedTab === tab ? "bg-white/20" : ""
                      }`}
                    >
                      {tabIcons[tab]}
                      <span>{tab}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Horizontal Tabs */}
            <div className="hidden md:flex flex-wrap justify-center gap-2 md:gap-4 mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabSelect(tab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                    selectedTab === tab
                      ? "bg-white text-[#0D3A66] font-semibold shadow-md"
                      : "bg-transparent text-white hover:bg-white/10"
                  }`}
                >
                  {tabIcons[tab]}
                  <span className="text-sm md:text-base">{tab}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
