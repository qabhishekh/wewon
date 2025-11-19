"use client";

import React from "react";
import CounsellorProfilePage from "./sections/CounsellorProfilePage";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { Counsellor } from "@/store/types";

const Page = () => {
  const { user, loading } = useAppSelector((state) => state.counsellor);
  const typedUser = user as Counsellor;
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <Loader2 className="w-10 h-10 text-[var(--primary)] animate-spin" />
      </div>
    );
  }

  // ✅ Build counsellor data dynamically with fallbacks
  const counsellorData = {
    userId: {
      _id: typedUser.userId?._id || "unknown-id",
      name: typedUser.userId?.name || "Unknown Counsellor",
      email: typedUser.userId?.email || "N/A",
      phone: typedUser.userId?.phone || "",
      avatar:
        typedUser.userId?.avatar ||
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      role: typedUser.userId?.role || "counsellor",
    },
    bio: typedUser.bio || "No bio added yet.",
    specialization: typedUser.specialization || [],
    experience: typedUser.experience || 0,
    qualifications: typedUser.qualifications || [],
    languages: typedUser.languages || [],
    rating: {
      average: typedUser.rating?.average || 0,
      totalReviews: typedUser.rating?.totalReviews || 0,
    },
    sessionsCompleted: typedUser.sessionsCompleted || 0,
    profileVideo: typedUser.profileVideo || "",
    verified: typedUser.verified || false,
    socialLinks: {
      linkedin: typedUser.socialLinks?.linkedin || "",
      youtube: typedUser.socialLinks?.youtube || "",
      website: typedUser.socialLinks?.website || "",
    },
    createdAt: typedUser.createdAt || new Date().toISOString(),
    updatedAt: typedUser.updatedAt || new Date().toISOString(),
  };
  if (typedUser.userId?.role !== "counsellor") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">
          No counsellor profile found or unauthorized access.
        </p>
      </div>
    );
  }
  return (
    <div className="w-full">
      <CounsellorProfilePage
        counsellorData={counsellorData}
        onEditAvatar={() => console.log("Avatar edit triggered")}
      />
    </div>
  );
};

export default Page;
