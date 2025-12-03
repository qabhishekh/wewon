"use client";

import React, { useState } from "react";
import {
  X,
  GraduationCap,
  Briefcase,
  Languages,
  Star,
  Globe,
  Plus,
  Trash2,
  Loader2,
  Youtube,
  Linkedin,
} from "lucide-react";
import { Counsellor } from "@/store/types";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  counsellorData: Counsellor;
  onSave: (data: Counsellor) => Promise<void>;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  counsellorData,
  onSave,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<Counsellor>(counsellorData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "bio" | "specialization" | "qualifications" | "social" | "languages"
  >("bio");

  if (!isOpen) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const addQualification = () => {
    setFormData({
      ...formData,
      qualifications: [
        ...formData.qualifications,
        { degree: "", institution: "", year: new Date().getFullYear() },
      ],
    });
  };

  const removeQualification = (index: number) => {
    setFormData({
      ...formData,
      qualifications: formData.qualifications.filter((_, i) => i !== index),
    });
  };

  const updateQualification = (
    index: number,
    field: "degree" | "institution" | "year",
    value: any
  ) => {
    const updated = [...formData.qualifications];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, qualifications: updated });
  };

  const addSpecialization = () => {
    setFormData({
      ...formData,
      specialization: [...formData.specialization, ""],
    });
  };

  const updateSpecialization = (index: number, value: string) => {
    const updated = [...formData.specialization];
    updated[index] = value;
    setFormData({ ...formData, specialization: updated });
  };

  const removeSpecialization = (index: number) => {
    setFormData({
      ...formData,
      specialization: formData.specialization.filter((_, i) => i !== index),
    });
  };

  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [...formData.languages, ""],
    });
  };

  const updateLanguage = (index: number, value: string) => {
    const updated = [...formData.languages];
    updated[index] = value;
    setFormData({ ...formData, languages: updated });
  };

  const removeLanguage = (index: number) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[var(--primary)]">
            Edit Counsellor Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            disabled={loading}
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          {[
            { id: "bio", label: "Profile Info", icon: GraduationCap },
            { id: "specialization", label: "Specialization", icon: Briefcase },
            { id: "qualifications", label: "Qualifications", icon: Star },
            { id: "social", label: "Social Links", icon: Globe },
            { id: "languages", label: "Languages", icon: Languages },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-3 font-semibold transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-[var(--primary)] text-[var(--primary)]"
                    : "border-transparent text-gray-600 hover:text-[var(--primary)]"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Bio Tab */}
          {activeTab === "bio" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm h-32 resize-none focus:ring-2 focus:ring-[var(--primary)] outline-none"
                  placeholder="Write something about your counselling experience..."
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Experience (in years)
                    </label>
                    <input
                      type="number"
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          experience: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                      placeholder="8"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sessions Completed
                    </label>
                    <input
                      type="number"
                      value={formData.sessionsCompleted}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sessionsCompleted: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                      placeholder="320"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Profile Video (YouTube URL)
                    </label>
                    <input
                      type="url"
                      value={formData.profileVideo || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          profileVideo: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Specialization Tab */}
          {activeTab === "specialization" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Add your areas of counselling expertise
                </p>
                <button
                  onClick={addSpecialization}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Add Specialization
                </button>
              </div>

              {formData.specialization.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No specialization added yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.specialization.map((spec, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-2xl relative">
                      <button
                        onClick={() => removeSpecialization(idx)}
                        className="absolute top-1/2 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors transform -translate-y-1/2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <input
                        type="text"
                        value={spec}
                        onChange={(e) =>
                          updateSpecialization(idx, e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                        placeholder="e.g., Study Abroad, Engineering, Medical"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Qualifications Tab */}
          {activeTab === "qualifications" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Add your educational qualifications
                </p>
                <button
                  onClick={addQualification}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Add Qualification
                </button>
              </div>

              {formData.qualifications.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <GraduationCap className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No qualifications added yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.qualifications.map((q, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-2xl p-6 relative"
                    >
                      <button
                        onClick={() => removeQualification(idx)}
                        className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-12">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Degree
                          </label>
                          <input
                            type="text"
                            value={q.degree}
                            onChange={(e) =>
                              updateQualification(idx, "degree", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                            placeholder="e.g., M.A. in Psychology"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Year
                          </label>
                          <input
                            type="number"
                            value={q.year}
                            onChange={(e) =>
                              updateQualification(
                                idx,
                                "year",
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                            placeholder="2015"
                          />
                        </div>
                        <div className="md:col-span-3">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Institution
                          </label>
                          <input
                            type="text"
                            value={q.institution}
                            onChange={(e) =>
                              updateQualification(
                                idx,
                                "institution",
                                e.target.value
                              )
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                            placeholder="e.g., Delhi University"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Social Links Tab */}
          {activeTab === "social" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[var(--primary)] mb-4">
                  Social Links
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={formData.socialLinks?.linkedin || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: {
                            ...formData.socialLinks,
                            linkedin: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                      placeholder="LinkedIn profile URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      YouTube
                    </label>
                    <input
                      type="url"
                      value={formData.socialLinks?.youtube || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: {
                            ...formData.socialLinks,
                            youtube: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                      placeholder="YouTube channel URL"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Personal Website
                    </label>
                    <input
                      type="url"
                      value={formData.socialLinks?.website || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: {
                            ...formData.socialLinks,
                            website: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Languages Tab */}
          {activeTab === "languages" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Add languages you can communicate in
                </p>
                <button
                  onClick={addLanguage}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Add Language
                </button>
              </div>

              {formData.languages.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Languages className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No languages added yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.languages.map((lang, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-2xl p-6 relative"
                    >
                      <button
                        onClick={() => removeLanguage(idx)}
                        className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="pr-12">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Language
                        </label>
                        <input
                          type="text"
                          value={lang}
                          onChange={(e) => updateLanguage(idx, e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                          placeholder="e.g., English, Hindi"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity bg-[var(--accent)]"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
