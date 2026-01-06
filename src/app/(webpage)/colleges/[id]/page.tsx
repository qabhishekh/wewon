"use client";
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
import CollegeGallery from "@/components/sections/CollegeGallery";
import useCollegeMedia from "@/hooks/useCollegeMedia";
import SubHeading from "@/components/sections/SubHeading";

export default function CollegePage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  // Redux state
  const college = useAppSelector(selectSelectedCollege);
  const collegeDetails = useAppSelector(selectCollegeDetails);
  const loading = useAppSelector(selectCollegeDetailsLoading);
  const error = useAppSelector(selectCollegeDetailsError);

  // Fetch college media (logo, gallery, banner)
  const collegeId = typeof id === "string" ? id : null;
  const {
    logo,
    gallery,
    loading: mediaLoading,
    error: mediaError,
  } = useCollegeMedia(collegeId);

  // Refs for scroll navigation - each tab maps to a section
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
    "Admission Rules": null,
    Connectivity: null,
    Courses: null,
    Facilities: null,
    Fees: null,
    "Fee Waivers": null,
    Gallery: null,
    Placements: null,
    Rankings: null,
    "Seat Matrix": null,
  });

  // Handle tab click - scroll to section
  const handleTabChange = (tabName: string) => {
    const element = sectionRefs.current[tabName];

    if (element) {
      const yOffset = 100; // Account for fixed header
      const y =
        element.getBoundingClientRect().top + window.pageYOffset - yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
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
        totalReviews: 0,
        totalCourses: courses.length,
        exams: [...new Set(courses.map((c) => c.Entrance_Exam))],
        fees: "Contact College",
        graduationScore: "60%",
      },
      courses: courses.map((course, index) => ({
        id: course._id,
        name: `${degree} in ${course.Branch_Name}`,
        duration: course.Duration,
        seatsOffered: course.Total_Seats,
        examsAccepted: course.Entrance_Exam,
        seatsGenderNeutral: course.Seats_Gender_Neutral,
        seatsFemaleOnly: course.Seats_Female_Only,
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

  return (
    <div>
      <div className="mx-auto">
        <CollegeHero
          name={college.Name}
          location={`${college.City}, ${college.State}`}
          logo={
            logo ||
            "https://images.unsplash.com/photo-1738464024478-2a60ac914513?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZSUyMGxvZ298ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=900"
          }
          tags={[college.Type, `Estd. ${college.Est_Year}`]}
          tabs={[
            "Admission Rules",
            "Connectivity",
            "Courses",
            "Facilities",
            "Fees",
            "Fee Waivers",
            "Gallery",
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

      <div className="container mx-auto px-4 md:px-12 py-8">
        {/* Overview Section */}
        <Overview
          collegeInfo={{
            name: college?.Name,
            abbreviation: college?.Abbreviation,
            type: college?.Type,
            estYear: college?.Est_Year,
            city: college?.City,
            state: college?.State,
            address: college?.Address,
          }}
        />

        {/* Also Known As */}
        <AlsoKnownAs alternateNames={[]} />

        {/* Admission Rules Section */}
        <div
          ref={(el) => {
            sectionRefs.current["Admission Rules"] = el;
          }}
        >
          {collegeDetails?.admissionRules &&
            collegeDetails.admissionRules.length > 0 && (
              <AdmissionRules admissionRules={collegeDetails.admissionRules} />
            )}
        </div>

        {/* Connectivity Section */}
        <div
          ref={(el) => {
            sectionRefs.current["Connectivity"] = el;
          }}
        >
          <SubHeading align="left" top="How to Reach" />
          <Address
            address={college?.Address || ""}
            city={college?.City}
            state={college?.State}
            pincode=""
            phone=""
            email=""
          />
          <div className="text-xl text-[var(--primary)] font-bold mt-4">
            Transportation and connectivity options
          </div>
          {collegeDetails?.connectivity &&
            collegeDetails.connectivity.length > 0 && (
              <Connectivity connectivity={collegeDetails.connectivity} />
            )}
        </div>

        {/* Address */}

        {/* Courses Section */}
        <div
          ref={(el) => {
            sectionRefs.current["Courses"] = el;
          }}
        >
          {tabsData.length > 0 && <CoursesFees tabsData={tabsData} />}
        </div>

        {/* Fees Section */}
        <div
          ref={(el) => {
            sectionRefs.current["Fees"] = el;
          }}
        >
          {collegeDetails?.fees && collegeDetails.fees.length > 0 && (
            <FeesStructure fees={collegeDetails.fees} />
          )}
        </div>

        {/* Fee Waivers Section */}
        <div
          ref={(el) => {
            sectionRefs.current["Fee Waivers"] = el;
          }}
        >
          {collegeDetails?.feeWaivers &&
            collegeDetails.feeWaivers.length > 0 && (
              <FeeWaivers feeWaivers={collegeDetails.feeWaivers} />
            )}
        </div>

        {/* Gallery Section */}
        <div
          ref={(el) => {
            sectionRefs.current["Gallery"] = el;
          }}
        >
          <CollegeGallery
            gallery={gallery}
            loading={mediaLoading}
            error={mediaError}
            collegeName={college?.Name}
          />
        </div>

        {/* Placements Section */}
        <div
          ref={(el) => {
            sectionRefs.current["Placements"] = el;
          }}
        >
          {yearsData.length > 0 && (
            <PlacementStatistics
              yearsData={yearsData}
              eligibleColor="var(--primary)"
              placedColor="#FF7A3D"
            />
          )}
        </div>

        {/* Rankings Section */}
        <div
          ref={(el) => {
            sectionRefs.current["Rankings"] = el;
          }}
        >
          {collegeDetails?.rankings && collegeDetails.rankings.length > 0 && (
            <Rankings rankings={collegeDetails.rankings} />
          )}
        </div>

        {/* Seat Matrix Section */}
        <div
          ref={(el) => {
            sectionRefs.current["Seat Matrix"] = el;
          }}
        >
          {collegeDetails?.seatMatrix &&
            collegeDetails.seatMatrix.length > 0 && (
              <SeatMatrix seatMatrix={collegeDetails.seatMatrix} />
            )}
        </div>

        {/* Cutoff Ranks */}
        <CutOffsFilter />

        {/* Website Link */}
        <WebsiteLink
          websiteUrl={college?.Website || ""}
          collegeName={college?.Name || ""}
        />
        {/* Facilities Section */}
        <div
          ref={(el) => {
            sectionRefs.current["Facilities"] = el;
          }}
        >
          {collegeDetails?.facilities &&
            collegeDetails.facilities.length > 0 && (
              <Facilities facilities={collegeDetails.facilities} />
            )}
        </div>
        {/* Ads and Recommended */}
        <GoogleAds />
        <Recommended />
      </div>
    </div>
  );
}
