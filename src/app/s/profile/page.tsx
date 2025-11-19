"use client";
import React from "react";
import StudentProfilePage from "./sections/StudentProfilePage";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { User } from "@/store/types";

const Page = () => {
  const { loading, user } = useAppSelector((state) => state.auth);
  const typedUser = user as User;
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-10 h-10 text-[var(--primary)] animate-spin" />
      </div>
    );
  }

  const profileData = {
    userId: {
      _id: typedUser.userId?._id || "unknown-id",
      name: typedUser.userId?.name || "Unknown",
      email: typedUser.userId?.email || "N/A",
      phone: typedUser.userId?.phone || "",
      avatar:
        typedUser.userId?.avatar ||
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      role: typedUser.userId?.role || "student",
      verified: typedUser.userId?.role === "student" ? true : false,
    },
    academics: typedUser.academics || {
      tenth: undefined,
      twelfth: undefined,
    },
    exams: typedUser.exams || [],

    preferences: typedUser.preferences || {
      stream: "",
      courseType: "",
      preferredStates: [],
      preferredCollegeType: "any",
    },

    savedColleges: typedUser.savedColleges || [],
    appliedColleges: typedUser.appliedColleges || [],
  };

  return (
    <div className="w-full">
      <StudentProfilePage
        profileData={profileData} // getting error in this line
        onEditAvatar={() => console.log("Avatar edit triggered")}
      />
    </div>
  );
};

export default Page;
