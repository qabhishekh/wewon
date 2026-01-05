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

// Helper function to remove 'open' attribute from details elements
// This ensures accordions are closed by default
const removeDetailsOpen = (html: string): string => {
  if (!html) return "";
  // Remove open="" or open from <details> tags
  return html.replace(/<details\s+open(?:="[^"]*")?/gi, "<details");
};

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

  // Set initial active tab to first available tab
  useEffect(() => {
    if (exam?.sections && exam.sections.length > 0) {
      const firstSection = exam.sections.find((section) => {
        const title = section.sectionTitle.toLowerCase();
        const isActualOverview =
          title.includes("overview") || title.includes("about");
        return isActualOverview || !title.includes("overview");
      });

      if (firstSection) {
        const firstTab = getSectionTab(firstSection.sectionTitle);
        setActiveTab(firstTab);
      }
    }
  }, [exam?.sections]);

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

    // Find the element for this tab
    const element = sectionRefs.current[tabName];

    if (element) {
      // Use scrollIntoView with instant behavior
      element.scrollIntoView({
        behavior: "auto",
        block: "start",
        inline: "nearest",
      });

      // Add additional offset for fixed header
      const yOffset = 120; // Offset for fixed header
      window.scrollBy({ top: -yOffset, behavior: "auto" });
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
    youtube: "https://youtube.com",
    telegram: "https://telegram.com",
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

  // Filter tabs to only show those that have sections
  const availableTabs = tabs.filter((tab) => {
    return (
      groupedSections && groupedSections[tab] && groupedSections[tab].length > 0
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Custom Styles for Accordion */}
      <style jsx global>{`
        .prose details {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 0;
          margin: 1rem 0;
          overflow: hidden;
        }

        .prose summary {
          cursor: pointer;
          padding: 1rem 1.25rem;
          font-weight: 600;
          font-size: 1rem;
          color: #1f2937;
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          user-select: none;
        }

        .prose summary::-webkit-details-marker {
          display: none;
        }

        .prose summary::after {
          content: "+";
          font-size: 1.25rem;
          font-weight: 600;
          color: #6b7280;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .prose details[open] summary::after {
          content: "−";
          transform: rotate(180deg);
        }

        .prose details[open] summary {
          border-bottom: 1px solid #e5e7eb;
        }

        .prose details > *:not(summary) {
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease;
        }

        .prose details[open] > *:not(summary) {
          grid-template-rows: 1fr;
        }

        .prose details > *:not(summary) > * {
          overflow: visible;
        }

        .prose details p {
          padding: 1rem 1.25rem;
          margin: 0;
          color: #4b5563;
          line-height: 1.6;
        }

        /* Ordered Lists */
        .prose ol {
          list-style-type: decimal;
          padding-left: 2rem;
          margin: 1rem 0;
          color: #374151;
        }

        .prose ol li {
          margin: 0.5rem 0;
          padding-left: 0.5rem;
        }

        .prose ol li p {
          margin: 0;
          display: inline;
        }

        /* Unordered Lists */
        .prose ul {
          list-style-type: disc;
          padding-left: 2rem;
          margin: 1rem 0;
          color: #374151;
          list-style-position: outside;
        }

        .prose ul li {
          margin: 0.5rem 0;
          padding-left: 0.5rem;
          display: list-item;
        }

        .prose ul li p {
          margin: 0;
          display: inline;
        }

        /* Lists inside details/accordions */
        .prose details ul,
        .prose details ol {
          padding: 0.5rem 1.25rem 1rem 2.5rem;
          margin: 0;
        }

        .prose details ul {
          list-style-type: disc;
          list-style-position: outside;
        }

        .prose details ol {
          list-style-type: decimal;
          list-style-position: outside;
        }

        .prose details ul li,
        .prose details ol li {
          display: list-item;
          padding-left: 0.25rem;
        }

        /* Tables */
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .prose table th {
          background: #f9fafb;
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 600;
          color: #111827;
          border-bottom: 2px solid #e5e7eb;
        }

        .prose table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e5e7eb;
          color: #374151;
        }

        .prose table tr:last-child td {
          border-bottom: none;
        }

        .prose table tr:hover {
          background: #f9fafb;
        }

        .prose table th p,
        .prose table td p {
          margin: 0;
        }

        /* Paragraphs */
        .prose p {
          margin: 0.75rem 0;
          color: #374151;
          line-height: 1.6;
        }

        /* Strong/Bold */
        .prose strong {
          font-weight: 600;
          color: #111827;
        }
      `}</style>

      {/* Hero Section */}
      <ExamHero
        logoUrl={exam.logoUrl}
        examName={exam.examName}
        tabs={availableTabs}
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
            {availableTabs.map((tabName) => {
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
                    <div key={index} className="rounded-xl mb-6">
                      <h2 className="text-2xl font-bold text-[#0D3A66] py-4 border-b">
                        {section.sectionTitle}
                      </h2>
                      <div
                        className="prose prose-lg max-w-none text-gray-700 py-4"
                        dangerouslySetInnerHTML={{
                          __html: removeDetailsOpen(section.description),
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
                        __html: removeDetailsOpen(section.description),
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
            <div className="sticky top-24 self-start">
              <ExamSidebar
                socialLinks={socialLinks}
                popularExams={popularExams}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
