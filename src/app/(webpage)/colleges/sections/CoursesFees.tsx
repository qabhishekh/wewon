import React, { useState } from "react";
import SubHeading from "@/components/sections/SubHeading";

interface Course {
  id: string;
  name: string;
  duration: string;
  seatsOffered: number;
  examsAccepted: string;
  seatsGenderNeutral: number;
  seatsFemaleOnly: number;
}

interface CourseSummary {
  description: string;
  totalReviews: number;
  totalCourses: number;
  exams: string[];
  fees: string;
  graduationScore: string;
}

interface TabData {
  name: string;
  summary: CourseSummary;
  courses: Course[];
}

interface CoursesFeesProps {
  tabsData: TabData[];
}

export default function CoursesFees({ tabsData }: CoursesFeesProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  console.log(tabsData);

  const activeTab = tabsData[activeTabIndex];

  const handleTabChange = (index: number) => {
    setActiveTabIndex(index);
  };

  return (
    <div className="w-full" style={{ fontFamily: "Poppins, sans-serif" }}>
      <SubHeading top={"Courses & Fees"} align="left" />
      <div className="w-full mx-auto mt-10">
        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-[var(--border)] p-2 mb-6 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {tabsData.map((tab, index) => (
              <button
                key={tab.name}
                onClick={() => handleTabChange(index)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all whitespace-nowrap ${
                  activeTabIndex === index
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                style={
                  activeTabIndex === index
                    ? { backgroundColor: "var(--primary)" }
                    : {}
                }
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Course Summary */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl p-6 text-white sticky top-6 h-fit lg:min-h-[550px]"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                {activeTab.name}
              </h2>
              <p className="text-sm opacity-90 mb-6">
                {activeTab.summary.description}
              </p>

              {/* Course Count */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/20">
                <span className="font-semibold">
                  {activeTab.summary.totalCourses} Courses
                </span>
              </div>

              {/* Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-start">
                  <span className="text-sm opacity-90">Exams:</span>
                  <div className="text-right">
                    {activeTab.summary.exams.map((exam, idx) => (
                      <div key={idx} className="font-semibold text-sm">
                        {exam}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/20">
                  <span className="text-sm opacity-90">Fees:</span>
                  <span className="font-semibold">
                    {activeTab.summary.fees}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Course List (Scrollable) */}
          <div className="lg:col-span-9">
            <div
              className="space-y-4 overflow-y-auto pr-2"
              style={{ maxHeight: "550px" }}
            >
              {activeTab.courses.length > 0 ? (
                activeTab.courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-[var(--border)] p-6 transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">
                          {course.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Course Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Seats Offered
                        </div>
                        <div className="font-bold text-gray-900">
                          {course.seatsOffered}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Exams Accepted
                        </div>
                        <div className="font-bold text-gray-900">
                          {course.examsAccepted}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Seats Gender Neutral
                        </div>
                        <div className="font-bold text-gray-900">
                          {course.seatsGenderNeutral}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Seats Female Only
                        </div>
                        <div className="font-bold text-gray-900">
                          {course.seatsFemaleOnly}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                  <p className="text-gray-500 text-lg">
                    No courses available for {activeTab.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
