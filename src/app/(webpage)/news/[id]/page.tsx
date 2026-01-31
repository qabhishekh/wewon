"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft, Share2, Loader2, Tag, Clock } from "lucide-react";
import MainHeading from "@/components/sections/MainHeading";
import apiClient from "@/hooks/Axios";

interface Alert {
  _id: string;
  title: string;
  message: string;
  type: string;
  link: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const categoryLabels: { [key: string]: string } = {
  exam: "Exam Alert",
  college: "College Alert",
  admission: "Admission Alert",
  notification: "Notification",
};

// Get type badge color
const getTypeBadgeColor = (type: string): string => {
  switch (type) {
    case "exam":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "college":
      return "bg-green-100 text-green-700 border-green-200";
    case "admission":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "notification":
      return "bg-orange-100 text-orange-700 border-orange-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

// Format date helper
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// Format time ago
const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
};

// Helper to strip HTML for description
const stripHtml = (html: string): string => {
  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>/g, "");
  }
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export default function SingleNewsPage() {
  const params = useParams();
  const id = params.id as string;

  const [alert, setAlert] = useState<Alert | null>(null);
  const [relatedAlerts, setRelatedAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlert = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch all alerts and find the one with matching ID
        const response = await apiClient.get("/api/alerts", {
          params: {
            isActive: true,
            limit: 50,
          },
        });

        const allAlerts = response.data?.data || [];
        const foundAlert = allAlerts.find((a: Alert) => a._id === id);

        if (foundAlert) {
          setAlert(foundAlert);

          // Get related alerts of same type (excluding current)
          const related = allAlerts
            .filter((a: Alert) => a._id !== id && a.type === foundAlert.type)
            .slice(0, 3);
          setRelatedAlerts(related);
        } else {
          setError("News article not found");
        }
      } catch (err) {
        console.error("Failed to fetch alert:", err);
        setError("Failed to load news article");
      } finally {
        setLoading(false);
      }
    };

    fetchAlert();
  }, [id]);

  const handleShare = async () => {
    if (navigator.share && alert) {
      try {
        await navigator.share({
          title: alert.title,
          text: stripHtml(alert.message).substring(0, 100),
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  if (loading) {
    return (
      <div>
        <MainHeading top={"Loading"} bottom={"..."} />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-12 h-12 animate-spin text-[var(--primary)]" />
        </div>
      </div>
    );
  }

  if (error || !alert) {
    return (
      <div>
        <MainHeading top={"News"} bottom={"Not Found"} />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-gray-500 text-lg mb-6">
            {error || "The news article you're looking for doesn't exist."}
          </p>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white rounded-xl hover:opacity-90 transition-opacity font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <MainHeading
        top={categoryLabels[alert.type] || "News"}
        bottom={"Details"}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:gap-3 transition-all mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to all news
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Article Header */}
              <div className="p-6 sm:p-8 border-b border-gray-100">
                {/* Type Badge */}
                <span
                  className={`inline-block px-4 py-1.5 text-sm font-semibold rounded-full border ${getTypeBadgeColor(
                    alert.type,
                  )}`}
                >
                  <Tag className="w-4 h-4 inline mr-1.5" />
                  {categoryLabels[alert.type] || alert.type}
                </span>

                {/* Title */}
                <h1 className="mt-5 text-2xl sm:text-3xl font-bold text-[var(--primary)] leading-tight">
                  {alert.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 mt-5 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {formatDate(alert.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      {formatTimeAgo(alert.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6 sm:p-8">
                <div
                  className="prose prose-lg max-w-none prose-headings:text-[var(--primary)] prose-a:text-[var(--secondary)] prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: alert.message }}
                />
              </div>

              {/* Article Footer */}
              <div className="p-6 sm:p-8 border-t border-gray-100 bg-gray-50/50">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {alert.link && (
                    <a
                      href={alert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
                    >
                      Visit Official Link
                    </a>
                  )}
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Related News */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h3 className="text-lg font-bold text-[var(--primary)] mb-5">
                Related News
              </h3>

              {relatedAlerts.length > 0 ? (
                <div className="space-y-4">
                  {relatedAlerts.map((relatedAlert) => (
                    <Link
                      key={relatedAlert._id}
                      href={`/news/${relatedAlert._id}`}
                      className="block p-4 rounded-xl bg-gray-50 hover:bg-[var(--primary)]/5 transition-colors group"
                    >
                      <h4 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                        {relatedAlert.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-2">
                        {formatDate(relatedAlert.createdAt)}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  No related news available.
                </p>
              )}

              {/* View All Link */}
              <Link
                href="/news"
                className="block mt-6 text-center py-3 px-4 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 rounded-xl text-[var(--primary)] font-semibold hover:from-[var(--primary)]/20 hover:to-[var(--secondary)]/20 transition-colors"
              >
                View All News
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
