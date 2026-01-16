"use client";

import React, { useState } from "react";
import {
  Info,
  Target,
  CheckCircle,
  BookOpen,
  DollarSign,
  ClipboardList,
  BarChart3,
  Calendar,
  ChevronDown,
} from "lucide-react";

interface ExamHeroProps {
  logoUrl?: string;
  examName: string;
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabIcons: { [key: string]: React.ReactNode } = {
  Overview: <Info size={20} />,
  Pattern: <Target size={20} />,
  Eligibility: <CheckCircle size={20} />,
  Syllabus: <BookOpen size={20} />,
  Fees: <DollarSign size={20} />,
  Application: <ClipboardList size={20} />,
  Result: <BarChart3 size={20} />,
  Dates: <Calendar size={20} />,
};

export default function ExamHero({
  logoUrl,
  examName,
  tabs,
  activeTab,
  onTabChange,
}: ExamHeroProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTabSelect = (tab: string) => {
    onTabChange(tab);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-[#0f3a67] text-white">
      {/* Hero Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-6">
          {/* Logo */}
          {logoUrl && (
            <div className="w-32 h-32 mb-4 bg-white rounded-full overflow-hidden flex items-center justify-center shadow-lg ring-2 ring-white ring-offset-6 ring-offset-[#0f3a67]">
              <img
                src={logoUrl}
                alt={examName}
                className="w-full h-full object-contain p-3"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="text-4xl font-bold text-[#0D3A66]">${examName.charAt(
                      0
                    )}</div>`;
                  }
                }}
              />
            </div>
          )}

          {/* Exam Name */}
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{examName}</h1>
        </div>

        {/* Mobile Dropdown - visible on small screens */}
        <div className="md:hidden relative mb-4">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-lg bg-white text-[#0D3A66] font-semibold shadow-md"
          >
            <div className="flex items-center gap-2">
              <span>Quick Navigation</span>
            </div>
            <ChevronDown
              size={20}
              className={`transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabSelect(tab)}
                  className={`w-full flex items-center gap-2 px-4 py-3 transition-all ${
                    activeTab === tab
                      ? "bg-[#0D3A66] text-white font-semibold"
                      : "text-[#0D3A66] hover:bg-gray-100"
                  }`}
                >
                  {tabIcons[tab]}
                  <span>{tab}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Tabs - hidden on small screens */}
        <div className="hidden md:flex flex-wrap justify-center gap-2 md:gap-4 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-white text-[#0D3A66] font-semibold shadow-md"
                  : "bg-transparent text-white hover:bg-white/10"
              }`}
            >
              {tabIcons[tab]}
              <span className="text-sm md:text-base">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {/* WhatsApp Banner */}
      {/* <div className="bg-[#4c97d7] border-t border-white/10">
        <div className="container mx-auto px-4 py-3 text-center">
          <a
            href="https://wa.me/your-number"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base hover:underline inline-flex items-center gap-2"
          >
            <span>Follow us on WhatsApp</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
        </div>
      </div> */}
    </div>
  );
}
