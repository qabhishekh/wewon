"use client";
import React, { useEffect } from "react";
import CollegeCard from "../cards/CollegeCard";
import { useRouter } from "next/navigation";
import SubHeading from "./SubHeading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectSimilarColleges,
  selectSimilarLoading,
  selectSimilarError,
} from "@/store/college/collegeSlice";
import { fetchSimilarColleges } from "@/store/college/collegeThunk";

interface SimilarCollegesProps {
  collegeId: string;
}

const SimilarColleges: React.FC<SimilarCollegesProps> = ({ collegeId }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const similarColleges = useAppSelector(selectSimilarColleges);
  const loading = useAppSelector(selectSimilarLoading);
  const error = useAppSelector(selectSimilarError);

  useEffect(() => {
    if (collegeId) {
      dispatch(fetchSimilarColleges(collegeId));
    }
  }, [dispatch, collegeId]);

  const handleKnowMore = (collegeSlug: string) => {
    router.push(`/colleges/${collegeSlug}`);
  };

  // Map API data to match CollegeCard props
  const mappedColleges = similarColleges.map((college) => ({
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

  if (loading && similarColleges.length === 0) {
    return (
      <div>
        <SubHeading top="Similar Colleges" align={"left"} />
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
    return (
      <div>
        <SubHeading top="Similar Colleges" align={"left"} />
        <div className="mt-14 text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchSimilarColleges(collegeId))}
            className="px-6 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--primary)] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!loading && similarColleges.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <SubHeading top="Similar Colleges" align={"left"} />
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

export default SimilarColleges;
