"use client";
import MainHeading from "@/components/sections/MainHeading";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import CollegeHero from "../sections/CollegeHero";
import CoursesFees from "../sections/CoursesFees";
import GoogleAds from "@/components/sections/GoogleAds";
import Recommended from "@/components/sections/Recommended";
import PlacementStatistics from "../sections/PlacementStatistics";
import CutOffsFilter from "../sections/CutOffs";
import Rankings from "../sections/Rankings";
import Facilities from "../sections/Facilities";
import FeesStructure from "../sections/FeesStructure";
import Connectivity from "../sections/Connectivity";
import AdmissionRules from "../sections/AdmissionRules";
import FeeWaivers from "../sections/FeeWaivers";
import SeatMatrix from "../sections/SeatMatrix";
import Overview from "../sections/Overview";
import AlsoKnownAs from "../sections/AlsoKnownAs";
import Address from "../sections/Address";
import WebsiteLink from "../sections/WebsiteLink";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCollegeById,
  fetchCollegeDetails,
} from "@/store/college/collegeThunk";
import {
  selectSelectedCollege,
  selectCollegeDetails,
  selectCollegeDetailsLoading,
  selectCollegeDetailsError,
  clearCollegeDetails,
} from "@/store/college/collegeSlice";
import BentoGridT2 from "@/components/sections/BentoGridT2";

export default function CollegePage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  // Redux state
  const college = useAppSelector(selectSelectedCollege);
  const collegeDetails = useAppSelector(selectCollegeDetails);
  const loading = useAppSelector(selectCollegeDetailsLoading);
  const error = useAppSelector(selectCollegeDetailsError);

  // Refs for scroll navigation
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeTab, setActiveTab] = useState("Admission Rules");

  // Handle tab click - scroll to section
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    const element = sectionRefs.current[tabName];

    if (element) {
      element.scrollIntoView({
        behavior: "auto",
        block: "start",
        inline: "nearest",
      });
      const yOffset = 120;
      window.scrollBy({ top: -yOffset, behavior: "auto" });
    }
  };

  // Fetch college data on mount
  useEffect(() => {
    if (id && typeof id === "string") {
      dispatch(fetchCollegeById(id));
      dispatch(fetchCollegeDetails(id));
    }

    return () => {
      dispatch(clearCollegeDetails());
    };
  }, [id, dispatch]);

  // Transform courses data to tabs format
  const transformCoursesToTabs = () => {
    if (!collegeDetails?.courses || collegeDetails.courses.length === 0) {
      return [];
    }

    // Group courses by degree
    const coursesByDegree: { [key: string]: any[] } = {};
    collegeDetails.courses.forEach((course) => {
      if (!coursesByDegree[course.Degree]) {
        coursesByDegree[course.Degree] = [];
      }
      coursesByDegree[course.Degree].push(course);
    });

    // Transform to tabs format
    return Object.entries(coursesByDegree).map(([degree, courses]) => ({
      name: degree,
      summary: {
        description: `${degree} program at ${college?.Name || "this college"}`,
        rating: 4.5,
        totalReviews: 0,
        totalCourses: courses.length,
        exams: [...new Set(courses.map((c) => c.Entrance_Exam))],
        fees: "Contact College",
        graduationScore: "60%",
      },
      courses: courses.map((course, index) => ({
        id: course._id,
        name: `${degree} in ${course.Branch_Name}`,
        rating: 4.5,
        duration: course.Duration,
        seatsOffered: course.Total_Seats,
        examsAccepted: course.Entrance_Exam,
        medianSalary: "N/A",
        totalFees: "Contact College",
      })),
    }));
  };

  // Transform placements data to years format
  const transformPlacementsToYears = () => {
    if (!collegeDetails?.placements || collegeDetails.placements.length === 0) {
      return [];
    }

    // Group placements by year
    const placementsByYear: { [key: number]: any[] } = {};
    collegeDetails.placements.forEach((placement) => {
      if (!placementsByYear[placement.Batch_Year]) {
        placementsByYear[placement.Batch_Year] = [];
      }
      placementsByYear[placement.Batch_Year].push(placement);
    });

    // Transform to years format
    return Object.entries(placementsByYear)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, placements]) => ({
        year: year,
        data: placements.map((p) => ({
          branch: p.Branch_Name,
          eligible: 100,
          placed: Math.round(p.Placed_Percentage),
        })),
        placed: [
          {
            branch: "All Branches",
            columns: [
              { key: "branch", label: "Branch", align: "left" as const },
              { key: "placed", label: "Placed (%)", align: "right" as const },
            ],
            data: placements.map((p) => ({
              branch: p.Branch_Name,
              placed: `${p.Placed_Percentage}%`,
            })),
          },
        ],
        median: [
          {
            branch: "All Branches",
            columns: [
              { key: "branch", label: "Branch", align: "left" as const },
              {
                key: "placed",
                label: "Median CTC (in LPA)",
                align: "right" as const,
              },
            ],
            data: placements.map((p) => ({
              branch: p.Branch_Name,
              placed: p.Median_CTC_LPA.toString(),
            })),
          },
        ],
        highest: [
          {
            branch: "All Branches",
            columns: [
              { key: "branch", label: "Branch", align: "left" as const },
              {
                key: "placed",
                label: "Max CTC (in LPA)",
                align: "right" as const,
              },
            ],
            data: placements.map((p) => ({
              branch: p.Branch_Name,
              placed: p.Max_CTC_LPA.toString(),
            })),
          },
        ],
        average: [
          {
            branch: "All Branches",
            columns: [
              { key: "branch", label: "Branch", align: "left" as const },
              {
                key: "placed",
                label: "Avg CTC (in LPA)",
                align: "right" as const,
              },
            ],
            data: placements.map((p) => ({
              branch: p.Branch_Name,
              placed: p.Avg_CTC_LPA.toString(),
            })),
          },
        ],
      }));
  };

  const onCompare = (courseId: string, tabName: string) => {
    console.log(`Comparing course ${courseId} in tab ${tabName}`);
  };

  const onDownloadBrochure = (courseId: string, tabName: string) => {
    console.log(
      `Downloading brochure for course ${courseId} in tab ${tabName}`
    );
  };

  const onDownloadMainBrochure = (tabName: string) => {
    console.log(`Downloading main brochure for tab ${tabName}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading college details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <button
            onClick={() => {
              if (id && typeof id === "string") {
                dispatch(fetchCollegeById(id));
                dispatch(fetchCollegeDetails(id));
              }
            }}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No college found
  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">College not found</p>
        </div>
      </div>
    );
  }

  const tabsData = transformCoursesToTabs();
  const yearsData = transformPlacementsToYears();

  // Get highlights from facilities and rankings
  const highlights = [];
  if (college.Est_Year) {
    highlights.push(`Established in ${college.Est_Year}`);
  }
  if (college.Type) {
    highlights.push(`${college.Type} Institution`);
  }
  if (collegeDetails?.rankings && collegeDetails.rankings.length > 0) {
    const topRanking = collegeDetails.rankings[0];
    highlights.push(
      `Ranked ${topRanking.Rank_Range} by ${topRanking.Agency} (${topRanking.Year})`
    );
  }
  if (collegeDetails?.facilities && collegeDetails.facilities.length > 0) {
    highlights.push(
      `${collegeDetails.facilities.length}+ campus facilities available`
    );
  }

  return (
    <div>
      <div className="mx-auto">
        <CollegeHero
          name={college.Name}
          location={`${college.City}, ${college.State}`}
          rating={4.5}
          logo="https://images.unsplash.com/photo-1738464024478-2a60ac914513?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZSUyMGxvZ298ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900"
          tags={[college.Type, `Estd. ${college.Est_Year}`]}
          tabs={[
            "Admission Rules",
            "Connectivity",
            "Courses",
            "Facilities",
            "Fees",
            "Fee Waivers",
            "Placements",
            "Rankings",
            "Seat Matrix",
          ]}
          onTabChange={handleTabChange}
          buttons={[
            {
              label: "Save",
              icon: "Bookmark",
              function: () => console.log("Saved!"),
            },
            {
              label: "Brochure",
              icon: "Download",
              function: () => console.log("Downloading..."),
            },
          ]}
        />
      </div>

      <div className="container mx-auto px-12">
        {/* 1. Overview */}
        <Overview
          admissionHighlights={
            collegeDetails?.admissionRules
              ?.slice(0, 1)
              .map((r) => r.Eligibility_Criteria || "") || []
          }
          topRankings={
            collegeDetails?.rankings
              ?.slice(0, 3)
              .map((r) => ({
                category: r.Category,
                rank: parseInt(r.Rank_Range),
              })) || []
          }
          feeRange={
            collegeDetails?.fees && collegeDetails.fees.length > 0
              ? {
                  min: Math.min(...collegeDetails.fees.map((f) => f.Amount)),
                  max: Math.max(...collegeDetails.fees.map((f) => f.Amount)),
                }
              : undefined
          }
        />

        {/* 2. Also Known As */}
        <AlsoKnownAs alternateNames={[]} />

        {/* 3. Address */}
        <Address
          address={college?.Address || ""}
          city={college?.City}
          state={college?.State}
          pincode=""
          phone=""
          email=""
        />

        {/* 4. Nearest Airport & Railway Station */}
        {collegeDetails?.connectivity &&
          collegeDetails.connectivity.length > 0 && (
            <Connectivity connectivity={collegeDetails.connectivity} />
          )}

        {/* 5. Campus Facilities */}
        {collegeDetails?.facilities && collegeDetails.facilities.length > 0 && (
          <Facilities facilities={collegeDetails.facilities} />
        )}

        {/* 6. Rankings */}
        {collegeDetails?.rankings && collegeDetails.rankings.length > 0 && (
          <Rankings rankings={collegeDetails.rankings} />
        )}

        {/* 7. Mode of Admission */}
        {collegeDetails?.admissionRules &&
          collegeDetails.admissionRules.length > 0 && (
            <AdmissionRules admissionRules={collegeDetails.admissionRules} />
          )}

        {/* 8. Courses Offered */}
        {tabsData.length > 0 && (
          <CoursesFees
            tabsData={tabsData}
            onCompare={onCompare}
            onDownloadBrochure={onDownloadBrochure}
            onDownloadMainBrochure={onDownloadMainBrochure}
          />
        )}

        {/* 9. Seat Matrix */}
        {collegeDetails?.seatMatrix && collegeDetails.seatMatrix.length > 0 && (
          <SeatMatrix seatMatrix={collegeDetails.seatMatrix} />
        )}

        {/* 10. Cutoff Ranks */}
        <CutOffsFilter />

        {/* 11. Fee Structure */}
        {collegeDetails?.fees && collegeDetails.fees.length > 0 && (
          <FeesStructure fees={collegeDetails.fees} />
        )}

        {/* 12. Fee Waivers */}
        {collegeDetails?.feeWaivers && collegeDetails.feeWaivers.length > 0 && (
          <FeeWaivers feeWaivers={collegeDetails.feeWaivers} />
        )}

        {/* 13. Placements */}
        {yearsData.length > 0 && (
          <PlacementStatistics
            yearsData={yearsData}
            eligibleColor="var(--primary)"
            placedColor="#FF7A3D"
          />
        )}

        {/* 14. Website */}
        <WebsiteLink
          websiteUrl={college?.Website || ""}
          collegeName={college?.Name || ""}
        />

        {/* 15-17. Similar, Nearby, Explore More Colleges */}

        <GoogleAds />
        <Recommended />
      </div>
    </div>
  );
}
