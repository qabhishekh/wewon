"use client";
import MainHeading from "@/components/sections/MainHeading";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectSelectedExam,
  selectSelectedExamLoading,
  selectSelectedExamError,
} from "@/store/exam/examSlice";
import { fetchExamById } from "@/store/exam/examThunk";
import { ArrowLeft } from "lucide-react";
import ExamHero from "../sections/ExamHero";
import ExamSidebar from "../sections/ExamSidebar";

export default function ExamDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const exam = useAppSelector(selectSelectedExam);
  const loading = useAppSelector(selectSelectedExamLoading);
  const error = useAppSelector(selectSelectedExamError);

  // Tab state for active highlighting
  const [activeTab, setActiveTab] = useState("Overview");

  // Refs for sections
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Available tabs
  const tabs = [
    "Overview",
    "Pattern",
    "Eligibility",
    "Syllabus",
    "Fees",
    "Application",
    "Result",
    "Dates",
  ];

  useEffect(() => {
    if (id) {
      dispatch(fetchExamById(id as string));
    }
  }, [id, dispatch]);

  // Map section titles to tabs (case-insensitive matching)
  const getSectionTab = (sectionTitle: string): string => {
    const title = sectionTitle.toLowerCase();
    if (title.includes("overview") || title.includes("about"))
      return "Overview";
    if (title.includes("pattern") || title.includes("exam pattern"))
      return "Pattern";
    if (title.includes("eligibility") || title.includes("criteria"))
      return "Eligibility";
    if (title.includes("syllabus") || title.includes("curriculum"))
      return "Syllabus";
    if (title.includes("fee") || title.includes("cost")) return "Fees";
    if (title.includes("application") || title.includes("apply"))
      return "Application";
    if (title.includes("result") || title.includes("score")) return "Result";
    if (title.includes("date") || title.includes("schedule")) return "Dates";
    return "Overview"; // Default to Overview
  };

  // Handle tab click - scroll to section
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);

    // Find the first section that matches this tab
    const matchingSection = exam?.sections?.find(
      (section) => getSectionTab(section.sectionTitle) === tabName
    );

    if (matchingSection) {
      const sectionId = getSectionTab(matchingSection.sectionTitle);
      const element = sectionRefs.current[sectionId];

      if (element) {
        // Scroll to section with offset for fixed header
        const yOffset = -100; // Adjust this value based on your header height
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0D3A66] mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading exam details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">
            {error || "Exam not found"}
          </p>
          <button
            onClick={() => router.push("/exams")}
            className="px-6 py-3 bg-[#0D3A66] text-white rounded-lg hover:opacity-90"
          >
            Back to Exams
          </button>
        </div>
      </div>
    );
  }

  // Mock data for sidebar (replace with real data when available)
  const socialLinks = {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  };

  const popularExams = [
    { id: "1", name: "Joint Entrance Examination (Main)", logoUrl: "" },
    { id: "2", name: "Joint Entrance Examination (Advanced)", logoUrl: "" },
  ];

  // Get sections that don't match any tab (extra sections)
  const extraSections =
    exam.sections?.filter((section) => {
      const tabName = getSectionTab(section.sectionTitle);
      // A section is "extra" if it was mapped to Overview by default but doesn't actually contain overview keywords
      const title = section.sectionTitle.toLowerCase();
      const isActualOverview =
        title.includes("overview") || title.includes("about");
      return tabName === "Overview" && !isActualOverview;
    }) || [];

  // Group sections by their tab category (excluding extra sections)
  const groupedSections = exam.sections?.reduce((acc, section) => {
    // Skip sections that are in extraSections
    if (extraSections.includes(section)) {
      return acc;
    }

    const tabName = getSectionTab(section.sectionTitle);
    if (!acc[tabName]) {
      acc[tabName] = [];
    }
    acc[tabName].push(section);
    return acc;
  }, {} as { [key: string]: typeof exam.sections });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <ExamHero
        logoUrl={exam.logoUrl}
        examName={exam.examName}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Render all sections grouped by tabs */}
            {tabs.map((tabName) => {
              const sectionsForTab = groupedSections?.[tabName] || [];

              if (sectionsForTab.length === 0) return null;

              return (
                <div
                  key={tabName}
                  ref={(el) => {
                    sectionRefs.current[tabName] = el;
                  }}
                  id={`section-${tabName.toLowerCase()}`}
                >
                  {sectionsForTab.map((section, index) => (
                    <div
                      key={index}
                      className="rounded-xl mb-6"
                    >
                      <h2 className="text-2xl font-bold text-[#0D3A66] py-4 border-b">
                        {section.sectionTitle}
                      </h2>
                      <div
                        className="prose prose-lg max-w-none text-gray-700 py-4"
                        dangerouslySetInnerHTML={{
                          __html: section.description,
                        }}
                        style={{
                          lineHeight: "1.8",
                        }}
                      />
                    </div>
                  ))}
                </div>
              );
            })}

            {/* Extra Sections (not matching any tab) */}
            {extraSections.length > 0 && (
              <div className="space-y-6">
                {extraSections.map((section, index) => (
                  <div
                    key={`extra-${index}`}
                    className="bg-white rounded-xl p-6 md:p-8"
                  >
                    <h2 className="text-2xl font-bold text-[#0D3A66] mb-4">
                      {section.sectionTitle}
                    </h2>
                    <div
                      className="prose prose-lg max-w-none text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: section.description,
                      }}
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
              <div className="bg-white rounded-xl  p-8 text-center">
                <p className="text-gray-600">
                  No additional information available for this exam.
                </p>
              </div>
            )}

            {/* Website Link Card */}
            {exam.websiteUrl && (
              <div className="bg-gradient-to-r from-[#0D3A66] to-[#1a5490] rounded-xl  p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Official Website</h3>
                <p className="mb-4 text-white/90">
                  Visit the official website for more information and updates
                </p>
                <a
                  href={exam.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-white text-[#0D3A66] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Visit Website →
                </a>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ExamSidebar
              socialLinks={socialLinks}
              popularExams={popularExams}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
