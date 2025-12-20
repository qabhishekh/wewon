"use client";
import MainHeading from "@/components/sections/MainHeading";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Popular from "@/components/sections/Popular";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectSelectedExam,
  selectSelectedExamLoading,
  selectSelectedExamError,
} from "@/store/exam/examSlice";
import { fetchExamById } from "@/store/exam/examThunk";
import { ExternalLink, ArrowLeft } from "lucide-react";

export default function ExamDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const exam = useAppSelector(selectSelectedExam);
  const loading = useAppSelector(selectSelectedExamLoading);
  const error = useAppSelector(selectSelectedExamError);

  useEffect(() => {
    if (id) {
      dispatch(fetchExamById(id as string));
    }
  }, [id, dispatch]);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-300 rounded mb-6"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !exam) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-red-500 text-xl font-semibold mb-4">
            {error || "Exam not found"}
          </div>
          <button
            onClick={() => router.push("/exams")}
            className="px-6 py-2 bg-[#0D3A66] text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-4">
        <MainHeading
          top={"Stay Updated With Upcoming"}
          bottom={"Exams And Results"}
        />

        {/* Back Button */}
        <button
          onClick={() => router.push("/exams")}
          className="flex items-center gap-2 text-[#0D3A66] hover:opacity-70 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Exams</span>
        </button>

        {/* Exam Hero Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Logo */}
            {exam.logoUrl && (
              <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={exam.logoUrl}
                  alt={exam.examName}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML = `<div class="text-4xl font-bold text-gray-400">${exam.examName.charAt(
                      0
                    )}</div>`;
                  }}
                />
              </div>
            )}

            {/* Exam Info */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-[#0D3A66] mb-4">
                {exam.examName}
              </h1>

              {/* Tags */}
              {exam.tags && exam.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {exam.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm rounded-full font-medium"
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

              {/* Website Link */}
              {exam.websiteUrl && (
                <a
                  href={exam.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D3A66] text-white rounded-lg hover:opacity-90 transition-all"
                >
                  <ExternalLink size={18} />
                  <span>Official Website</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Sections */}
        {exam.sections && exam.sections.length > 0 && (
          <div className="space-y-6 mb-8">
            {exam.sections.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 md:p-8"
              >
                <h2 className="text-2xl font-bold text-[#0D3A66] mb-4">
                  {section.sectionTitle}
                </h2>
                <div
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: section.description }}
                  style={{
                    lineHeight: "1.8",
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* No Sections Message */}
        {(!exam.sections || exam.sections.length === 0) && (
          <div className="bg-gray-50 rounded-xl p-8 text-center mb-8">
            <p className="text-gray-600">
              No additional information available for this exam.
            </p>
          </div>
        )}

        <Popular />
      </div>
    </div>
  );
}
