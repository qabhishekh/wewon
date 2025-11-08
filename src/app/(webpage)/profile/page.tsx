"use client";

import React from "react";

import StudentProfilePage from "./sections/StudentProfilePage";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

const Page = () => {
  const { user, loading, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-10 h-10 text-[var(--primary)] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-600">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const profileData = {
    userId: {
      _id: user.userId?._id || "unknown-id",
      name: user.userId?.name || "Unknown",
      email: user.userId?.email || "N/A",
      phone: user.userId?.phone || "",
      avatar:
        user.userId?.avatar ||
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      role: user.userId?.role || "student",
      verified: user.userId?.role === "student" ? true : false,
    },
    academics: user.academics || {
      tenth: undefined,
      twelfth: undefined,
    },
    exams: user.exams || [],

    preferences: user.preferences || {
      stream: "",
      courseType: "",
      preferredStates: ["MP", "UP"],
      preferredCollegeType: "any",
    },

    savedColleges: user.savedColleges || [],
    appliedColleges: user.appliedColleges || [],
  };

  return (
    <div className="container mx-auto">
      <StudentProfilePage
        profileData={profileData} // getting error in this line
        onEditAvatar={() => console.log("Avatar edit triggered")}
      />
    </div>
  );
};

export default Page;
