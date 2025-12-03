"use client";
import React, { useState } from "react";
import {
  FileText,
  Video,
  PlayCircle,
  Lock,
  ChevronDown,
  ChevronUp,
  Wrench,
} from "lucide-react";

interface LearningMaterial {
  id: string;
  title: string;
  type: "video" | "pdf" | "tool";
  icon: React.ReactNode;
}

interface LearningMaterialsSectionProps {
  totalMaterialCount: number;
  isPurchased: boolean;
  onLockedClick: () => void;
  onMaterialClick?: (materialId: string) => void;
}

export default function LearningMaterialsSection({
  totalMaterialCount,
  isPurchased,
  onLockedClick,
  onMaterialClick,
}: LearningMaterialsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Preview materials (always visible)
  const previewMaterials: LearningMaterial[] = [
    {
      id: "intro-video",
      title: "How We Work - Introduction Video",
      type: "video",
      icon: <PlayCircle size={24} className="text-[var(--accent)]" />,
    },
    {
      id: "course-pdf",
      title: "Course Overview PDF",
      type: "pdf",
      icon: <FileText size={24} className="text-[var(--accent)]" />,
    },
    {
      id: "full-description",
      title: "Full Program Description Video",
      type: "video",
      icon: <Video size={24} className="text-[var(--accent)]" />,
    },
    {
      id: "choice-filling-tool",
      title: "Choice Filling Tool (3 uses available)",
      type: "tool",
      icon: <Wrench size={24} className="text-[var(--accent)]" />,
    },
  ];

  const handleMaterialClick = (materialId: string) => {
    if (!isPurchased) {
      onLockedClick();
    } else if (onMaterialClick) {
      onMaterialClick(materialId);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-2">
            Learning Materials
          </h2>
          <p className="text-gray-600">
            {totalMaterialCount}+ comprehensive learning resources
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <span className="font-medium text-gray-700">
            {isExpanded ? "Collapse" : "Expand"}
          </span>
          {isExpanded ? (
            <ChevronUp size={20} className="text-gray-700" />
          ) : (
            <ChevronDown size={20} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Materials List */}
      {isExpanded && (
        <div className="space-y-3">
          {previewMaterials.map((material) => (
            <button
              key={material.id}
              onClick={() => handleMaterialClick(material.id)}
              className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 group"
            >
              {/* Icon */}
              <div className="flex-shrink-0">{material.icon}</div>

              {/* Title */}
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-800 group-hover:text-[var(--accent)] transition-colors">
                  {material.title}
                </h3>
              </div>

              {/* Lock Icon */}
              {!isPurchased && (
                <div className="flex-shrink-0">
                  <Lock size={20} className="text-gray-400" />
                </div>
              )}
            </button>
          ))}

          {/* Additional Materials Indicator */}
          {totalMaterialCount > 4 && (
            <div className="text-center py-4 text-gray-600">
              + {totalMaterialCount - 4} more materials available after purchase
            </div>
          )}
        </div>
      )}

      {/* Locked Message */}
      {!isPurchased && isExpanded && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-center">
            <Lock size={16} className="inline mr-2" />
            All materials are locked. Purchase the program to unlock full
            access.
          </p>
        </div>
      )}
    </div>
  );
}
