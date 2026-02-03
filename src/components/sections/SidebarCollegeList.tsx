"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Building2, GraduationCap } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectRecommendedColleges,
  selectRecommendedLoading,
  selectNearbyColleges,
  selectNearbyLoading,
  selectSimilarColleges,
  selectSimilarLoading,
} from "@/store/college/collegeSlice";
import {
  fetchRecommendedColleges,
  fetchNearbyColleges,
  fetchSimilarColleges,
} from "@/store/college/collegeThunk";

interface SidebarCollegeListProps {
  type: "recommended" | "nearby" | "similar";
  collegeId?: string;
  limit?: number;
}

interface CollegeItem {
  _id: string;
  slug?: string;
  Name: string;
  City: string;
  State: string;
  Type: string;
  Est_Year: number;
  logoUrl?: string;
}

const SidebarCollegeList: React.FC<SidebarCollegeListProps> = ({
  type,
  collegeId,
  limit = 3,
}) => {
  const dispatch = useAppDispatch();

  // Select data based on type
  const recommendedColleges = useAppSelector(selectRecommendedColleges);
  const recommendedLoading = useAppSelector(selectRecommendedLoading);
  const nearbyColleges = useAppSelector(selectNearbyColleges);
  const nearbyLoading = useAppSelector(selectNearbyLoading);
  const similarColleges = useAppSelector(selectSimilarColleges);
  const similarLoading = useAppSelector(selectSimilarLoading);

  // Get the right data based on type
  const getCollegesAndLoading = (): {
    colleges: CollegeItem[];
    loading: boolean;
  } => {
    switch (type) {
      case "recommended":
        return { colleges: recommendedColleges, loading: recommendedLoading };
      case "nearby":
        return { colleges: nearbyColleges, loading: nearbyLoading };
      case "similar":
        return { colleges: similarColleges, loading: similarLoading };
      default:
        return { colleges: [], loading: false };
    }
  };

  const { colleges, loading } = getCollegesAndLoading();

  // Fetch data on mount
  useEffect(() => {
    switch (type) {
      case "recommended":
        dispatch(fetchRecommendedColleges(limit));
        break;
      case "nearby":
        if (collegeId) dispatch(fetchNearbyColleges(collegeId));
        break;
      case "similar":
        if (collegeId) dispatch(fetchSimilarColleges(collegeId));
        break;
    }
  }, [dispatch, type, collegeId, limit]);

  // Get title based on type
  const getTitle = () => {
    switch (type) {
      case "recommended":
        return "Recommended";
      case "nearby":
        return "Nearby Colleges";
      case "similar":
        return "Similar Colleges";
      default:
        return "Colleges";
    }
  };

  // Get icon based on type
  const getIcon = () => {
    switch (type) {
      case "recommended":
        return <GraduationCap className="w-4 h-4" />;
      case "nearby":
        return <MapPin className="w-4 h-4" />;
      case "similar":
        return <Building2 className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  // Loading skeleton
  if (loading && colleges.length === 0) {
    return (
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-md bg-gray-200 animate-pulse" />
          <div className="h-5 w-28 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-2 animate-pulse">
              <div className="w-10 h-10 rounded-lg bg-gray-200" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-1.5 w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Don't render if no colleges
  if (!loading && colleges.length === 0) {
    return null;
  }

  // Limit the colleges shown
  const displayColleges = colleges.slice(0, limit);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-[#0D3A66]/10 flex items-center justify-center text-[#0D3A66]">
          {getIcon()}
        </div>
        <h3 className="text-base font-bold text-[#0D3A66]">{getTitle()}</h3>
      </div>

      {/* College List */}
      <div className="space-y-2">
        {displayColleges.map((college) => (
          <Link
            key={college._id}
            href={`/colleges/${college.slug || college._id}`}
            className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-100"
          >
            {/* College Logo/Icon */}
            {college.logoUrl ? (
              <div className="w-11 h-11 rounded-lg overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                <Image
                  src={college.logoUrl}
                  alt={college.Name}
                  width={44}
                  height={44}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#0D3A66] to-[#1a5490] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm">
                {college.Name.substring(0, 2).toUpperCase()}
              </div>
            )}

            {/* College Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-800 truncate group-hover:text-[#0D3A66] transition-colors">
                {college.Name}
              </h4>
              <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">
                  {college.City}, {college.State}
                </span>
              </div>
            </div>

            {/* Arrow */}
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#0D3A66] transition-colors flex-shrink-0">
              <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <Link
        href="/colleges"
        className="mt-3 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-[#0D3A66] hover:text-[#FFD700] transition-colors"
      >
        <span>View All Colleges</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default SidebarCollegeList;
