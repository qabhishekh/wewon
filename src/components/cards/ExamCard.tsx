import React from "react";
import { Calendar, MapPin, GraduationCap, ArrowRight } from "lucide-react";
import { Exam } from "@/store/types";

// Helper function to strip HTML tags and get plain text
const stripHtmlTags = (html: string): string => {
  if (!html) return "";
  // Remove HTML tags and decode entities
  const text = html
    .replace(/<[^>]*>/g, " ") // Remove HTML tags
    .replace(/&nbsp;/g, " ") // Replace &nbsp; with space
    .replace(/&amp;/g, "&") // Replace &amp; with &
    .replace(/&lt;/g, "<") // Replace &lt; with <
    .replace(/&gt;/g, ">") // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, "'") // Replace &#39; with '
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim();
  return text;
};

const ExamCard = ({
  exam,
  handleKnowMore,
}: {
  exam: Exam;
  handleKnowMore: (id: string) => void;
}) => {
  // Create a brief description from the first section's description content
  const getDescription = (): string => {
    if (exam.sections && exam.sections.length > 0) {
      const firstSection = exam.sections[0];
      if (firstSection.description) {
        const plainText = stripHtmlTags(firstSection.description);
        return plainText || "Click to learn more about this exam";
      }
    }
    return "Click to learn more about this exam";
  };

  const description = getDescription();

  return (
    <div
      key={exam._id}
      className="rounded-xl overflow-hidden transition-all hover:shadow-lg flex flex-col h-full"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid rgba(13, 58, 102, 0.1)",
      }}
    >
      {/* exam Image */}
      <div className="relative h-48 overflow-hidden flex items-center justify-center border-b">
        {exam.logoUrl ? (
          <img
            src={exam.logoUrl}
            alt={exam.examName}
            className="w-full h-full object-contain"
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
      <div className="p-4 flex flex-col flex-grow">
        <h3
          className="text-lg text-center font-bold mb-1 truncate"
          style={{ color: "#0D3A66" }}
          title={exam.examName}
        >
          {exam.examName}
        </h3>
        <p
          className="text-sm text-center mb-4 line-clamp-2"
          style={{ color: "rgba(13, 58, 102, 0.6)" }}
        >
          {description}
        </p>

        {/* Tags - always render container for consistent spacing */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center min-h-[2rem]">
          {exam.tags && exam.tags.length > 0 && (
            <>
              {exam.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs rounded-full flex items-center"
                  style={{
                    backgroundColor: "rgba(13, 58, 102, 0.1)",
                    color: "#0D3A66",
                  }}
                >
                  {tag}
                </span>
              ))}
            </>
          )}
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>

        {/* Know More Button */}
        <button
          onClick={() => handleKnowMore(exam._id)}
          className="w-full py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 cursor-pointer"
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
