import React from "react";
import { MapPin, Star, Bookmark, Download } from "lucide-react";

interface CollegeHeroProps {
  name: string;
  location: string;
  rating: number;
  image: string;
  logo: string;
  type: string;
  established: string;
  tabs?: string[];
  onSave?: () => void;
  onDownloadBrochure?: () => void;
}

export default function CollegeHero({
  name,
  location,
  rating,
  image,
  logo,
  type,
  established,
  tabs = [
    "Info & Courses",
    "Seats",
    "Cut-Offs",
    "Fee Structure",
    "Placement",
    "How to Reach",
    "Ranking",
    "Mode of Admission",
    "Placements",
  ],
  onSave,
  onDownloadBrochure,
}: CollegeHeroProps) {
  return (
    <div
      className="w-full py-6 md:py-8 lg:py-12"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Hero Image */}
      <div className="border rounded-3xl overflow-hidden border-[var(--border)]">
        <div className="relative w-full">
          <div
            className=""
            style={{ height: "480px" }}
          >
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* Info Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-6 ">
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
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm md:text-base">{location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm md:text-base">
                      {rating}/5
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span
                    className="px-4 py-1.5 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: "#E8F3F1",
                      color: "var(--primary)",
                    }}
                  >
                    {type}
                  </span>
                  <span
                    className="px-4 py-1.5 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: "#E8F3F1",
                      color: "var(--primary)",
                    }}
                  >
                    Estd. {established}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={onSave}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity flex-1 md:flex-initial"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <Bookmark className="w-5 h-5" />
                Save
              </button>
              <button
                onClick={onDownloadBrochure}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity flex-1 md:flex-initial"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <Download className="w-5 h-5" />
                Brochure
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-t border-gray-200 pt-4 overflow-x-auto">
            <div className="flex gap-6 min-w-max">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className="text-sm md:text-base font-medium text-gray-600 hover:text-primary whitespace-nowrap pb-2 border-b-2 border-transparent hover:border-primary transition-colors"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
