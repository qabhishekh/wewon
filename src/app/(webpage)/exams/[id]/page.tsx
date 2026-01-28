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
      // Find the first section that matches a known tab
      const firstMatchedSection = exam.sections.find((section) => {
        const tabName = getSectionTab(section.sectionTitle);
        return tabName !== null;
      });

      if (firstMatchedSection) {
        const firstTab = getSectionTab(firstMatchedSection.sectionTitle);
        if (firstTab) {
          setActiveTab(firstTab);
        }
      }
    }
  }, [exam?.sections]);

  // Map section titles to tabs (case-insensitive matching)
  // Returns null if section doesn't match any known tab
  const getSectionTab = (sectionTitle: string): string | null => {
    const title = sectionTitle.toLowerCase().trim();

    // Exact matches first (for single-word titles)
    if (title === "overview") return "Overview";
    if (title === "pattern") return "Pattern";
    if (title === "eligibility") return "Eligibility";
    if (title === "syllabus") return "Syllabus";
    if (title === "fees") return "Fees";
    if (title === "application") return "Application";
    if (title === "result") return "Result";
    if (title === "dates") return "Dates";

    return null; // No match - will be treated as extra section
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

  // Hardcoded social links
  const socialLinks = {
    youtube: "https://www.youtube.com/@WeWonAcademy/videos",
    telegram: "https://t.me/wewonacademy",
    instagram:
      "https://www.instagram.com/aman.bhaiya_iiser?igsh=MWc5OTN6MGNsYjhkaw==",
    whatsapp: "https://whatsapp.com/channel/0029VamIMTD9WtC9n8tEs21V",
  };

  const popularExams = [
    { id: "1", name: "Joint Entrance Examination (Main)", logoUrl: "" },
    { id: "2", name: "Joint Entrance Examination (Advanced)", logoUrl: "" },
  ];

  // Get sections that don't match any tab (extra sections)
  const extraSections =
    exam.sections?.filter((section) => {
      const tabName = getSectionTab(section.sectionTitle);
      // A section is "extra" if getSectionTab returns null (no match)
      return tabName === null;
    }) || [];

  // Group sections by their tab category (excluding extra sections)
  const groupedSections = exam.sections?.reduce(
    (acc, section) => {
      const tabName = getSectionTab(section.sectionTitle);

      // Skip sections that don't match any tab (extra sections)
      if (tabName === null) {
        return acc;
      }

      if (!acc[tabName]) {
        acc[tabName] = [];
      }
      acc[tabName].push(section);
      return acc;
    },
    {} as { [key: string]: typeof exam.sections },
  );

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

        /* Make details content scrollable for tables */
        .prose details > *:not(summary) > * {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .prose details table {
          margin: 0;
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

        /* Tables - Responsive Container */
        .prose {
          overflow-x: hidden;
        }

        .prose table {
          display: block;
          width: max-content;
          max-width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          border-collapse: collapse;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin: 1.5rem 0;
        }

        .prose table tbody {
          display: table;
          width: 100%;
          min-width: 100%;
        }

        .prose table th {
          background: #f9fafb;
          padding: 0.75rem 1rem;
          text-align: left;
          font-weight: 600;
          color: #111827;
          border-bottom: 2px solid #e5e7eb;
          white-space: nowrap;
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

        /* Mobile Table Styles */
        @media (max-width: 768px) {
          .prose table {
            font-size: 0.875rem;
          }

          .prose table th,
          .prose table td {
            padding: 0.5rem 0.75rem;
          }
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

        /* Headings */
        .prose h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #0d3a66;
          margin: 1.5rem 0 0.75rem 0;
          line-height: 1.4;
        }

        .prose h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin: 1.25rem 0 0.5rem 0;
          line-height: 1.4;
        }

        .prose h5 {
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.4;
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
          {/* Main Content Area with Watermark and Copy Protection */}
          <div
            className="lg:col-span-2 space-y-6 relative"
            style={{ userSelect: "none" }}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* Watermark Background */}
            <div
              className="pointer-events-none fixed inset-0 z-10 overflow-hidden opacity-[0.03]"
              style={{
                background: `repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 100px,
                  rgba(13, 58, 102, 0.15) 100px,
                  rgba(13, 58, 102, 0.15) 200px
                )`,
              }}
            >
              <div
                className="absolute inset-0 flex flex-wrap items-center justify-center gap-20 p-10"
                style={{
                  transform: "rotate(-30deg) scale(1.5)",
                }}
              >
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="text-[#0D3A66] font-bold text-2xl whitespace-nowrap opacity-50"
                  >
                    We Won Academy
                  </div>
                ))}
              </div>
            </div>
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
