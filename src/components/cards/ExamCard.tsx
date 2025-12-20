import React from "react";
import { Calendar, MapPin, GraduationCap, ArrowRight } from "lucide-react";
import { Exam } from "@/store/types";

const ExamCard = ({
  exam,
  handleKnowMore,
}: {
  exam: Exam;
  handleKnowMore: (id: string) => void;
}) => {
  // Create a brief description from the first section if available
  const description =
    exam.sections && exam.sections.length > 0
      ? exam.sections[0].sectionTitle
      : "Click to learn more about this exam";

  return (
    <div
      key={exam._id}
      className="rounded-xl overflow-hidden transition-all hover:shadow-lg"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid rgba(13, 58, 102, 0.1)",
      }}
    >
      {/* exam Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
        {exam.logoUrl ? (
          <img
            src={exam.logoUrl}
            alt={exam.examName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement!.innerHTML = `<div class="text-4xl font-bold text-gray-400">${
                exam.examName?.charAt(0) || "E"
              }</div>`;
            }}
          />
        ) : (
          <div className="text-4xl font-bold text-gray-400">
            {exam.examName?.charAt(0) || "E"}
          </div>
        )}
      </div>

      {/* exam Info */}
      <div className="p-4">
        <h3
          className="text-lg text-center font-bold mb-1"
          style={{ color: "#0D3A66" }}
        >
          {exam.examName}
        </h3>
        <p
          className="text-sm text-center mb-4 line-clamp-2"
          style={{ color: "rgba(13, 58, 102, 0.6)" }}
        >
          {description}
        </p>

        {/* Tags */}
        {exam.tags && exam.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {exam.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full"
                style={{
                  backgroundColor: "rgba(13, 58, 102, 0.1)",
                  color: "#0D3A66",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Know More Button */}
        <button
          onClick={() => handleKnowMore(exam._id)}
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

export default ExamCard;
