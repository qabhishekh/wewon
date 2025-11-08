"use client";

import React, { useState } from "react";
import {
  X,
  GraduationCap,
  Trophy,
  Settings,
  Plus,
  Trash2,
  MapPin,
  Loader2,
} from "lucide-react";

interface AcademicRecord {
  board?: string;
  year?: number;
  percentage?: number;
  school?: string;
  stream?: string;
}

interface ExamRecord {
  name: string;
  score?: number;
  rank?: number;
  year: number;
}

interface Preferences {
  stream?: string;
  courseType?: string;
  preferredStates?: string[];
  preferredCollegeType?: "government" | "private" | "any";
}

interface StudentProfileData {
  academics: {
    tenth?: AcademicRecord;
    twelfth?: AcademicRecord;
  };
  exams: ExamRecord[];
  preferences: Preferences;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: StudentProfileData;
  onSave: (data: StudentProfileData) => Promise<void>;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  profileData,
  onSave,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<StudentProfileData>(profileData);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"academics" | "exams" | "preferences">("academics");
  const [newState, setNewState] = useState("");

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

  const addExam = () => {
    setFormData({
      ...formData,
      exams: [
        ...formData.exams,
        { name: "", score: 0, rank: 0, year: new Date().getFullYear() },
      ],
    });
  };

  const removeExam = (index: number) => {
    setFormData({
      ...formData,
      exams: formData.exams.filter((_, i) => i !== index),
    });
  };

  const updateExam = (index: number, field: keyof ExamRecord, value: any) => {
    const updatedExams = [...formData.exams];
    updatedExams[index] = { ...updatedExams[index], [field]: value };
    setFormData({ ...formData, exams: updatedExams });
  };

  const addState = () => {
    if (newState.trim()) {
      setFormData({
        ...formData,
        preferences: {
          ...formData.preferences,
          preferredStates: [
            ...(formData.preferences.preferredStates || []),
            newState.trim(),
          ],
        },
      });
      setNewState("");
    }
  };

  const removeState = (state: string) => {
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        preferredStates: formData.preferences.preferredStates?.filter(
          (s) => s !== state
        ),
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[var(--primary)]">
            Edit Profile Details
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
          <button
            onClick={() => setActiveTab("academics")}
            className={`flex items-center gap-2 px-4 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === "academics"
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-gray-600 hover:text-[var(--primary)]"
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            Academics
          </button>
          <button
            onClick={() => setActiveTab("exams")}
            className={`flex items-center gap-2 px-4 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === "exams"
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-gray-600 hover:text-[var(--primary)]"
            }`}
          >
            <Trophy className="w-5 h-5" />
            Exams
          </button>
          <button
            onClick={() => setActiveTab("preferences")}
            className={`flex items-center gap-2 px-4 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === "preferences"
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-gray-600 hover:text-[var(--primary)]"
            }`}
          >
            <Settings className="w-5 h-5" />
            Preferences
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Academics Tab */}
          {activeTab === "academics" && (
            <div className="space-y-6">
              {/* 10th Standard */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[var(--primary)] mb-4">
                  10th Standard
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Board
                    </label>
                    <input
                      type="text"
                      value={formData.academics.tenth?.board || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          academics: {
                            ...formData.academics,
                            tenth: {
                              ...formData.academics.tenth,
                              board: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                      placeholder="e.g., CBSE, ICSE, State Board"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Year
                    </label>
                    <input
                      type="number"
                      value={formData.academics.tenth?.year || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          academics: {
                            ...formData.academics,
                            tenth: {
                              ...formData.academics.tenth,
                              year: parseInt(e.target.value) || undefined,
                            },
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                      placeholder="2020"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Percentage
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.academics.tenth?.percentage || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          academics: {
                            ...formData.academics,
                            tenth: {
                              ...formData.academics.tenth,
                              percentage: parseFloat(e.target.value) || undefined,
                            },
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                      placeholder="85.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      School Name
                    </label>
                    <input
                      type="text"
                      value={formData.academics.tenth?.school || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          academics: {
                            ...formData.academics,
                            tenth: {
                              ...formData.academics.tenth,
                              school: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                      placeholder="School name"
                    />
                  </div>
                </div>
              </div>

              {/* 12th Standard */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[var(--primary)] mb-4">
                  12th Standard
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Board
                    </label>
                    <input
                      type="text"
                      value={formData.academics.twelfth?.board || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          academics: {
                            ...formData.academics,
                            twelfth: {
                              ...formData.academics.twelfth,
                              board: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                      placeholder="e.g., CBSE, ICSE, State Board"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Year
                    </label>
                    <input
                      type="number"
                      value={formData.academics.twelfth?.year || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          academics: {
                            ...formData.academics,
                            twelfth: {
                              ...formData.academics.twelfth,
                              year: parseInt(e.target.value) || undefined,
                            },
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                      placeholder="2022"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Percentage
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.academics.twelfth?.percentage || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          academics: {
                            ...formData.academics,
                            twelfth: {
                              ...formData.academics.twelfth,
                              percentage: parseFloat(e.target.value) || undefined,
                            },
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                      placeholder="90.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Stream
                    </label>
                    <input
                      type="text"
                      value={formData.academics.twelfth?.stream || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          academics: {
                            ...formData.academics,
                            twelfth: {
                              ...formData.academics.twelfth,
                              stream: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                      placeholder="e.g., Science, Commerce, Arts"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      School Name
                    </label>
                    <input
                      type="text"
                      value={formData.academics.twelfth?.school || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          academics: {
                            ...formData.academics,
                            twelfth: {
                              ...formData.academics.twelfth,
                              school: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                      placeholder="School name"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Exams Tab */}
          {activeTab === "exams" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Add your entrance exam scores and rankings
                </p>
                <button
                  onClick={addExam}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  Add Exam
                </button>
              </div>

              {formData.exams.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No entrance exams added yet</p>
                  <p className="text-sm mt-2">Click "Add Exam" to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.exams.map((exam, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-2xl p-6 relative"
                    >
                      <button
                        onClick={() => removeExam(idx)}
                        className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-12">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Exam Name *
                          </label>
                          <input
                            type="text"
                            value={exam.name}
                            onChange={(e) =>
                              updateExam(idx, "name", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                            placeholder="e.g., JEE Main, NEET, CAT"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Score
                          </label>
                          <input
                            type="number"
                            value={exam.score || ""}
                            onChange={(e) =>
                              updateExam(
                                idx,
                                "score",
                                parseFloat(e.target.value) || undefined
                              )
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                            placeholder="Score"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Rank
                          </label>
                          <input
                            type="number"
                            value={exam.rank || ""}
                            onChange={(e) =>
                              updateExam(
                                idx,
                                "rank",
                                parseInt(e.target.value) || undefined
                              )
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                            placeholder="Rank"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Year *
                          </label>
                          <input
                            type="number"
                            value={exam.year}
                            onChange={(e) =>
                              updateExam(idx, "year", parseInt(e.target.value))
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                            placeholder="2024"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[var(--primary)] mb-4">
                  Course Preferences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Stream
                    </label>
                    <input
                      type="text"
                      value={formData.preferences.stream || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferences: {
                            ...formData.preferences,
                            stream: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                      placeholder="e.g., Engineering, Medical, Commerce"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Course Type
                    </label>
                    <input
                      type="text"
                      value={formData.preferences.courseType || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferences: {
                            ...formData.preferences,
                            courseType: e.target.value,
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                      placeholder="e.g., B.Tech, MBBS, B.Com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      College Type
                    </label>
                    <select
                      value={formData.preferences.preferredCollegeType || "any"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferences: {
                            ...formData.preferences,
                            preferredCollegeType: e.target.value as any,
                          },
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                    >
                      <option value="any">Any</option>
                      <option value="government">Government</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[var(--primary)] mb-4">
                  Preferred States
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.preferences.preferredStates?.map((state) => (
                    <span
                      key={state}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium"
                    >
                      <MapPin className="w-4 h-4 text-[var(--primary)]" />
                      {state}
                      <button
                        onClick={() => removeState(state)}
                        className="ml-1 hover:text-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addState()}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[var(--primary)] outline-none"
                    placeholder="Add state (e.g., Maharashtra, Delhi)"
                  />
                  <button
                    onClick={addState}
                    className="px-4 py-2.5 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
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