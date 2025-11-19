"use client";

import React, { useState } from "react";
import {
  User,
  Edit2,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Youtube,
  Star,
  Award,
  GraduationCap,
  Languages,
  CheckCircle2,
  Video,
} from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "sonner";
import { Counsellor } from "@/store/types";
import EditProfileModal from "./EditProfileModal";
import { updateCounsellorProfile } from "@/store/counsellor/counsellorThunk";

interface CounsellorProfilePageProps {
  counsellorData: Counsellor;
  onEditAvatar?: () => void;
}

export default function CounsellorProfilePage({
  counsellorData,
}: CounsellorProfilePageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleSaveProfile = async (updatedData: Counsellor) => {
    try {
      dispatch(updateCounsellorProfile(updatedData));
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error || "Failed to update profile");
      throw error;
    }
  };

  const {
    userId,
    bio,
    specialization,
    qualifications,
    languages,
    rating,
    sessionsCompleted,
    profileVideo,
    verified,
    socialLinks,
  } = counsellorData;

  return (
    <div className="min-h-screen py-8 px-4">
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
                {userId.avatar ? (
                  <img
                    src={userId.avatar}
                    alt={userId.name}
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
                {userId.name}
              </h1>

              <div className="flex flex-col gap-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{userId.email}</span>
                </div>

                {userId.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{userId.phone}</span>
                  </div>
                )}

                {verified && (
                  <div className="flex items-center gap-2 text-green-600 mt-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Verified Counsellor
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex gap-6 mt-4 md:mt-0">
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Rating & Stats */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: "var(--primary)" }}
            >
              Performance Overview
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-[#F0F7FF] rounded-xl">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">Average Rating</span>
                </div>
                <span className="text-lg font-bold text-[var(--primary)]">
                  {rating?.average.toFixed(1)} ⭐
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-[#F0F7FF] rounded-xl">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[var(--accent)]" />
                  <span className="font-medium">Sessions Completed</span>
                </div>
                <span className="text-lg font-bold text-[var(--primary)]">
                  {sessionsCompleted}
                </span>
              </div>
            </div>
          </div>

          {/* Languages */}
          {languages.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "var(--primary)" }}
              >
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 bg-[#F0F7FF] rounded-full text-sm font-medium"
                    style={{ color: "var(--primary)" }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {socialLinks && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "var(--primary)" }}
              >
                Social Links
              </h3>
              <div className="flex flex-col gap-3 text-sm text-[var(--primary)]">
                {socialLinks?.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                )}
                {socialLinks?.youtube && (
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <Youtube className="w-4 h-4" /> YouTube
                  </a>
                )}
                {socialLinks?.website && (
                  <a
                    href={socialLinks.website}
                    target="_blank"
                    className="flex items-center gap-2 hover:underline"
                  >
                    <Globe className="w-4 h-4" /> Website
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3
              className="text-xl font-bold mb-3"
              style={{ color: "var(--primary)" }}
            >
              About
            </h3>
            <p className="text-gray-700 leading-relaxed">{bio}</p>
          </div>

          {/* Specialization */}
          {specialization.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: "var(--primary)" }}
              >
                Specialization
              </h3>
              <div className="flex flex-wrap gap-2">
                {specialization.map((spec) => (
                  <span
                    key={spec}
                    className="px-3 py-1 bg-[#F0F7FF] rounded-full text-sm font-medium"
                    style={{ color: "var(--primary)" }}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Qualifications */}
          {qualifications.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: "var(--primary)" }}
              >
                Qualifications
              </h3>
              <ul className="space-y-3">
                {qualifications.map((q, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-[#F0F7FF] rounded-xl"
                  >
                    <GraduationCap className="w-5 h-5 text-[var(--accent)] mt-1" />
                    <div>
                      <p className="font-semibold">{q.degree}</p>
                      <p className="text-sm text-gray-600">
                        {q.institution} ({q.year})
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Profile Video */}
          {profileVideo && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Video className="w-6 h-6 text-[var(--primary)]" />
                <h3 className="text-xl font-bold text-[var(--primary)]">
                  Introduction Video
                </h3>
              </div>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={profileVideo.replace("watch?v=", "embed/")}
                  className="w-full h-[315px] rounded-xl"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        counsellorData={counsellorData}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
