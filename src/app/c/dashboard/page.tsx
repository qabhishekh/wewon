"use client";

import { useAppSelector } from "@/store/hooks";
import {
  Users,
  Calendar,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";
import { useEffect, useState } from "react";
import apiClient from "@/hooks/Axios";

interface DashboardData {
  assignedStudents: number;
  pendingSessions: number;
  completedSessions: number;
}

export default function Page() {
  const { user } = useAppSelector((state) => state.auth);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/api/counsellor/dashboard");

        if (response.data.success) {
          setDashboardData(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch dashboard data");
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Error fetching dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#073d68] mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="mb-8 bg-[#073d68] rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-6 h-6" />
            <h1 className="text-3xl font-bold">
              Welcome back, {user?.userId?.name?.split(" ")[0] || "Counsellor"}!
              👋
            </h1>
          </div>
          <p className="text-blue-100 text-lg">
            Here's an overview of your counseling activity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Assigned Students */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-blue-600">
                {dashboardData?.assignedStudents || 0}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Assigned Students
            </h3>
            <p className="text-xs text-gray-500">
              {dashboardData?.assignedStudents === 0
                ? "No students assigned yet"
                : `You are guiding ${dashboardData?.assignedStudents} student${
                    dashboardData?.assignedStudents! > 1 ? "s" : ""
                  }`}
            </p>
          </div>

          {/* Pending Sessions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-500 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-yellow-600">
                {dashboardData?.pendingSessions || 0}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Pending Sessions
            </h3>
            <p className="text-xs text-gray-500">
              {dashboardData?.pendingSessions === 0
                ? "All caught up!"
                : `${dashboardData?.pendingSessions} session${
                    dashboardData?.pendingSessions! > 1 ? "s" : ""
                  } awaiting completion`}
            </p>
          </div>

          {/* Completed Sessions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-green-600">
                {dashboardData?.completedSessions || 0}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Completed Sessions
            </h3>
            <p className="text-xs text-gray-500">
              {dashboardData?.completedSessions === 0
                ? "Start your first session"
                : `Great work! ${dashboardData?.completedSessions} session${
                    dashboardData?.completedSessions! > 1 ? "s" : ""
                  } completed`}
            </p>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#073d68]" />
            Quick Insights
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="p-2 bg-blue-500 rounded-lg flex-shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Student Management
                </h4>
                <p className="text-sm text-gray-600">
                  {dashboardData?.assignedStudents === 0
                    ? "You don't have any assigned students yet. Students will appear here once they are assigned to you."
                    : `You are currently managing ${
                        dashboardData?.assignedStudents
                      } student${
                        dashboardData?.assignedStudents! > 1 ? "s" : ""
                      }. Keep up the great mentorship!`}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-xl">
              <div className="p-2 bg-yellow-500 rounded-lg flex-shrink-0">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Session Schedule
                </h4>
                <p className="text-sm text-gray-600">
                  {dashboardData?.pendingSessions === 0
                    ? "No pending sessions at the moment. You're all caught up!"
                    : `You have ${
                        dashboardData?.pendingSessions
                      } pending session${
                        dashboardData?.pendingSessions! > 1 ? "s" : ""
                      }. Make sure to complete them on time.`}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
              <div className="p-2 bg-green-500 rounded-lg flex-shrink-0">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  Your Performance
                </h4>
                <p className="text-sm text-gray-600">
                  {dashboardData?.completedSessions === 0
                    ? "Start your counseling journey by completing your first session!"
                    : `Excellent work! You've successfully completed ${
                        dashboardData?.completedSessions
                      } session${
                        dashboardData?.completedSessions! > 1 ? "s" : ""
                      }. Your students appreciate your guidance.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
