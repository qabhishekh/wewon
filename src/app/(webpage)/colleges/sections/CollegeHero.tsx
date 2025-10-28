import React from "react";
import { MapPin, Star, Bookmark, Download, Link } from "lucide-react";

interface CollegeHeroProps {
  name: string;
  location?: string;
  rating?: number;
  image?: string;
  logo: string;
  conductedBy?: string;
  tags?: string[];
  tabs?: string[];
  buttons?: {
    label: string;
    icon: string;
    function: () => void;
  }[];
}

export default function CollegeHero({
  name,
  location,
  rating,
  image,
  logo,
  tags,
  conductedBy,
  buttons,
  tabs,
}: CollegeHeroProps) {
  return (
    <div
      className="w-full px- pt-6 md:px-8 lg:px-12 md:pt-8 lg:pt-12"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Hero Image */}
      <div className="border rounded-3xl overflow-hidden border-[var(--border)]">
        {image && (
          <div className="relative w-full">
            <div className="" style={{ height: "480px" }}>
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        {/* Info Card */}
        <div className="bg-white rounded-3xl shadow-lg p-4 md:p-4 ">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-6">
            <div className="flex gap-4 md:gap-6 items-start flex-1">
              {/* Logo */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-gray-200">
                <img
                  src={logo}
                  alt={`${name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* College Info */}
              <div className="flex-1">
                <h1
                  className="text-2xl md:text-3xl font-bold mb-2"
                  style={{ color: "#1a1a1a" }}
                >
                  {name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 mb-3">
                  {conductedBy && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-bold">Conducted By</span>
                      <span className="text-sm md:text-base">
                        {conductedBy}
                      </span>
                    </div>
                  )}
                  {location && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm md:text-base">{location}</span>
                    </div>
                  )}

                  {rating && (
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-sm md:text-base">
                        {rating}/5
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {tags &&
                    tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-1.5 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: "#E8F3F1",
                          color: "var(--primary)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full md:w-auto">
              {buttons &&
                buttons.map((button, index) => {
                  const IconComponent = {
                    Bookmark: Bookmark,
                    Download: Download,
                    Link: Link,
                  }[button.icon];

                  return (
                    <button
                      key={index}
                      onClick={button.function}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity flex-1 md:flex-initial"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                      {button.label}
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Navigation Tabs */}
          {tabs && (
            <div className="border-t border-gray-200 pt-4 overflow-x-auto">
              <div className="flex gap-6 min-w-max justify-between">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className="text-sm md:text-base font-medium text-gray-600 hover:text-primary whitespace-nowrap border-b-2 border-transparent hover:border-primary transition-colors"
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
