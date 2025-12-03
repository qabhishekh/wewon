"use client";

import React, { useState } from "react";
import {
  User,
  Trophy,
  Heart,
  Building2,
  Edit2,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  MapPin,
  LogOut,
} from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "sonner";
import { User as UserTypes } from "@/store/types";
import EditProfileModal from "./EditProfileModal";
import { updateStudentProfile } from "@/store/auth/authThunk";

interface StudentProfilePageProps {
  profileData: UserTypes;
  onEditAvatar?: () => void;
}

export default function StudentProfilePage({
  profileData,
}: StudentProfilePageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  // Transform profileData to match EditProfileModal's expected format
  const modalProfileData = {
    academics: profileData.academics || { tenth: {}, twelfth: {} },
    exams: profileData.exams || [],
    preferences: profileData.preferences || {
      stream: "",
      courseType: "",
      preferredStates: [],
      preferredCollegeType: "any" as const,
    },
  };

  // ✅ Save updated profile
  const handleSaveProfile = async (updatedData: typeof modalProfileData) => {
    try {
      // Merge the updated academic/exam/preference data with the full user profile
      const fullUpdatedData = {
        ...profileData,
        academics: updatedData.academics,
        exams: updatedData.exams,
        preferences: updatedData.preferences,
      };

      // Dispatch your updateStudentProfile action
      await dispatch(updateStudentProfile(fullUpdatedData)).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error || "Failed to update profile");
      throw error;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div>
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 flex items-center justify-center"
                  style={{ borderColor: "var(--primary)" }}
                >
                  {profileData.userId.avatar ? (
                    <img
                      src={profileData.userId.avatar}
                      alt={profileData.userId.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      <User className="w-12 h-12 md:w-16 md:h-16 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div>
                <h1
                  className="text-2xl md:text-3xl font-bold mb-1"
                  style={{ color: "var(--primary)" }}
                >
                  {profileData.userId.name}
                </h1>

                <div className="flex flex-col gap-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{profileData.userId.email}</span>
                  </div>

                  {profileData.userId.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">
                        {profileData.userId.phone}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex gap-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <Edit2 className="w-5 h-5" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "var(--primary)" }}
              >
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#F0F7FF]">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-[var(--accent)]" />
                    <span className="font-medium">Saved Colleges</span>
                  </div>
                  <span className="text-xl font-bold text-[var(--primary)]">
                    {profileData.savedColleges?.length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#F0F7FF]">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-[var(--accent)]" />
                    <span className="font-medium">Applied</span>
                  </div>
                  <span className="text-xl font-bold text-[var(--primary)]">
                    {profileData.appliedColleges?.length || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#F0F7FF]">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-[var(--accent)]" />
                    <span className="font-medium">Exams Taken</span>
                  </div>
                  <span className="text-xl font-bold text-[var(--primary)]">
                    {profileData.exams?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "var(--primary)" }}
              >
                Preferences
              </h3>
              <div className="space-y-4">
                {profileData.preferences?.stream && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Preferred Stream
                    </p>
                    <p className="font-semibold text-gray-800">
                      {profileData.preferences.stream}
                    </p>
                  </div>
                )}
                {profileData.preferences?.courseType && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Course Type</p>
                    <p className="font-semibold text-gray-800">
                      {profileData.preferences.courseType}
                    </p>
                  </div>
                )}
                {profileData.preferences?.preferredCollegeType && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">College Type</p>
                    <p className="font-semibold text-gray-800 capitalize">
                      {profileData.preferences.preferredCollegeType}
                    </p>
                  </div>
                )}
                {profileData.preferences?.preferredStates &&
                  profileData.preferences.preferredStates.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Preferred States
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {profileData.preferences.preferredStates.map(
                          (state) => (
                            <span
                              key={state}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-[#F0F7FF] rounded-full text-sm font-medium"
                              style={{ color: "var(--primary)" }}
                            >
                              <MapPin className="w-3 h-3" />
                              {state}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Academic Records */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 text-[var(--primary)]" />
                <h3 className="text-xl font-bold text-[var(--primary)]">
                  Academic Records
                </h3>
              </div>

              {profileData.academics?.tenth ||
              profileData.academics?.twelfth ? (
                <div className="space-y-6">
                  {/* 10th Standard */}
                  {profileData.academics?.tenth && (
                    <div className="p-5 rounded-2xl bg-[#F0F7FF]">
                      <h4 className="font-bold text-lg mb-3 text-[var(--primary)]">
                        10th Standard
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {profileData.academics.tenth.board && (
                          <div>
                            <p className="text-sm text-gray-600">Board</p>
                            <p className="font-semibold">
                              {profileData.academics.tenth.board}
                            </p>
                          </div>
                        )}
                        {profileData.academics.tenth.year && (
                          <div>
                            <p className="text-sm text-gray-600">Year</p>
                            <p className="font-semibold">
                              {profileData.academics.tenth.year}
                            </p>
                          </div>
                        )}
                        {profileData.academics.tenth.percentage && (
                          <div>
                            <p className="text-sm text-gray-600">Percentage</p>
                            <p className="font-semibold text-[var(--accent)]">
                              {profileData.academics.tenth.percentage}%
                            </p>
                          </div>
                        )}
                        {profileData.academics.tenth.school && (
                          <div className="col-span-2">
                            <p className="text-sm text-gray-600">School</p>
                            <p className="font-semibold">
                              {profileData.academics.tenth.school}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 12th Standard */}
                  {profileData.academics?.twelfth && (
                    <div className="p-5 rounded-2xl bg-[#F0F7FF]">
                      <h4 className="font-bold text-lg mb-3 text-[var(--primary)]">
                        12th Standard
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {profileData.academics.twelfth.board && (
                          <div>
                            <p className="text-sm text-gray-600">Board</p>
                            <p className="font-semibold">
                              {profileData.academics.twelfth.board}
                            </p>
                          </div>
                        )}
                        {profileData.academics.twelfth.year && (
                          <div>
                            <p className="text-sm text-gray-600">Year</p>
                            <p className="font-semibold">
                              {profileData.academics.twelfth.year}
                            </p>
                          </div>
                        )}
                        {profileData.academics.twelfth.percentage && (
                          <div>
                            <p className="text-sm text-gray-600">Percentage</p>
                            <p className="font-semibold text-[var(--accent)]">
                              {profileData.academics.twelfth.percentage}%
                            </p>
                          </div>
                        )}
                        {profileData.academics.twelfth.stream && (
                          <div>
                            <p className="text-sm text-gray-600">Stream</p>
                            <p className="font-semibold">
                              {profileData.academics.twelfth.stream}
                            </p>
                          </div>
                        )}
                        {profileData.academics.twelfth.school && (
                          <div className="col-span-2">
                            <p className="text-sm text-gray-600">School</p>
                            <p className="font-semibold">
                              {profileData.academics.twelfth.school}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // 🌸 Empty state (no records)
                <div className="flex flex-col items-center justify-center text-center py-10 px-6 rounded-2xl border border-dashed border-gray-300 bg-gray-50">
                  <GraduationCap className="w-12 h-12 text-gray-400 mb-3" />
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    No Academic Records Found
                  </h4>
                  <p className="text-sm text-gray-500 max-w-md">
                    It looks like you haven’t added your academic details yet.
                    Add your 10th and 12th grade information to complete your
                    profile.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-5 px-5 py-2 rounded-lg font-semibold text-white shadow hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    + Add Academic Details
                  </button>
                </div>
              )}
            </div>

            {/* Entrance Exams */}
            {profileData.exams && profileData.exams.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="w-6 h-6 text-[var(--primary)]" />
                  <h3 className="text-xl font-bold text-[var(--primary)]">
                    Entrance Exams
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profileData.exams.map((exam, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border-2 border-gray-100 hover:border-[var(--primary)] transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-lg text-[var(--primary)]">
                          {exam.name}
                        </h4>
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <Calendar className="w-4 h-4" /> {exam.year}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {exam.score !== undefined && exam.score !== 0 && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Score:
                            </span>
                            <span className="font-semibold text-[var(--accent)]">
                              {exam.score}
                            </span>
                          </div>
                        )}
                        {exam.rank !== undefined && exam.rank !== 0 && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Rank:</span>
                            <span className="font-semibold text-[var(--accent)]">
                              {exam.rank}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profileData={modalProfileData}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
