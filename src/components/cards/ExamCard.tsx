import React from "react";
import { Calendar, MapPin, GraduationCap, ArrowRight } from "lucide-react";

const ExamCard = ({
  exam,
  handleKnowMore,
}: {
  exam: any;
  handleKnowMore: (id: string) => void;
}) => {
  return (
    <div
      key={exam?.id}
      className="rounded-xl overflow-hidden transition-all hover:shadow-lg"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid rgba(13, 58, 102, 0.1)",
      }}
    >
      {/* exam Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={exam?.image}
          alt={exam?.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* exam Info */}
      <div className="p-4">
        <h3 className="text-lg text-center font-bold mb-1" style={{ color: "#0D3A66" }}>
          {exam?.name}
        </h3>
        <p className="text-sm text-center mb-4" style={{ color: "rgba(13, 58, 102, 0.6)" }}>
          {exam?.description}
        </p>


        {/* Know More Button */}
        <button
          onClick={() => handleKnowMore(exam?.id)}
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
