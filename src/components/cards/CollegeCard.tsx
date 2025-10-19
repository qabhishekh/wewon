import React from "react";
import { Calendar, MapPin, GraduationCap, ArrowRight } from "lucide-react";

const CollegeCard = ({
  college,
  handleKnowMore,
}: {
  college: any;
  handleKnowMore: (id: string) => void;
}) => {
  return (
    <div
      key={college?.id}
      className="rounded-xl overflow-hidden transition-all hover:shadow-lg"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid rgba(13, 58, 102, 0.1)",
      }}
    >
      {/* College Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={college?.image}
          alt={college?.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* College Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1" style={{ color: "#0D3A66" }}>
          {college?.name}
        </h3>
        <p className="text-sm mb-4" style={{ color: "rgba(13, 58, 102, 0.6)" }}>
          {college?.location}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div
            className="flex items-center gap-1 text-xs"
            style={{ color: "rgba(13, 58, 102, 0.7)" }}
          >
            <Calendar size={14} />
            <span>{college?.established}</span>
          </div>
          <div
            className="flex items-center gap-1 text-xs"
            style={{ color: "rgba(13, 58, 102, 0.7)" }}
          >
            <MapPin size={14} />
            <span>{college?.nirf}</span>
          </div>
          <div
            className="flex items-center gap-1 text-xs"
            style={{ color: "rgba(13, 58, 102, 0.7)" }}
          >
            <GraduationCap size={14} />
            <span>{college?.naac}</span>
          </div>
        </div>

        {/* Know More Button */}
        <button
          onClick={() => handleKnowMore(college?.id)}
          className="w-full py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
          style={{
            backgroundColor: "var(--light-blue)",
            color: "#0D3A66",
          }}
        >
          Know More
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default CollegeCard;
