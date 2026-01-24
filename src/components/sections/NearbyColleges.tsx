"use client";
import React, { useEffect } from "react";
import CollegeCard from "../cards/CollegeCard";
import { useRouter } from "next/navigation";
import SubHeading from "./SubHeading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectNearbyColleges,
  selectNearbyLoading,
  selectNearbyError,
} from "@/store/college/collegeSlice";
import { fetchNearbyColleges } from "@/store/college/collegeThunk";

interface NearbyCollegesProps {
  collegeId: string;
}

const NearbyColleges: React.FC<NearbyCollegesProps> = ({ collegeId }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const nearbyColleges = useAppSelector(selectNearbyColleges);
  const loading = useAppSelector(selectNearbyLoading);
  const error = useAppSelector(selectNearbyError);

  useEffect(() => {
    if (collegeId) {
      dispatch(fetchNearbyColleges(collegeId));
    }
  }, [dispatch, collegeId]);

  const handleKnowMore = (collegeSlug: string) => {
    router.push(`/colleges/${collegeSlug}`);
  };

  // Map API data to match CollegeCard props
  const mappedColleges = nearbyColleges.map((college) => ({
    id: college._id,
    slug: college.slug,
    name: college.Name,
    location: `${college.City}, ${college.State}`,
    city: college.City,
    established: `Estd. ${college.Est_Year}`,
    nirf: college.Type,
    naac: "NAAC A++", // Default value
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900", // Default image
  }));

  if (loading && nearbyColleges.length === 0) {
    return (
      <div>
        <SubHeading top="Nearby Colleges" align={"left"} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden animate-pulse"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(13, 58, 102, 0.1)",
              }}
            >
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return null; // Or display error message, but Recommended returns null-ish on empty usually or error message. Recommended shows a retry button.
    // Keeping it simple as per "similar like recommended"
  }

  // If error, verify if we should show retry.
  // The recommended component shows retry. I will add it.
  if (error) {
    return (
      <div>
        <SubHeading top="Nearby Colleges" align={"left"} />
        <div className="mt-14 text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchNearbyColleges(collegeId))}
            className="px-6 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--primary)] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!loading && nearbyColleges.length === 0) {
    return null; // Don't show empty section
  }

  return (
    <div className="mt-12">
      <SubHeading top="Nearby Colleges" align={"left"} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
        {mappedColleges.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
            handleKnowMore={handleKnowMore}
          />
        ))}
      </div>
    </div>
  );
};

export default NearbyColleges;
