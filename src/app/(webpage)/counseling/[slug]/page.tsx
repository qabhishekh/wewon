"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectSelectedProduct,
  selectSelectedProductLoading,
  selectSelectedProductError,
} from "@/store/counseling/counselingSlice";
import { fetchCounselingProductBySlug } from "@/store/counseling/counselingThunk";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  FileText,
  PlayCircle,
  Video,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function CounselingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const slug = params.slug as string;

  const product = useAppSelector(selectSelectedProduct);
  const loading = useAppSelector(selectSelectedProductLoading);
  const error = useAppSelector(selectSelectedProductError);

  useEffect(() => {
    if (slug) {
      dispatch(fetchCounselingProductBySlug(slug));
    }
  }, [slug, dispatch]);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-300 rounded mb-6"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-red-500 text-xl font-semibold mb-4">
            {error || "Product not found"}
          </div>
          <button
            onClick={() => router.push("/counseling")}
            className="px-6 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--primary)] transition-colors"
          >
            Back to Counseling
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/counseling"
        className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--accent)] mb-6 transition-colors no-underline"
      >
        <ArrowLeft size={20} />
        <span className="font-semibold">Back to Counseling</span>
      </Link>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop";
            }}
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-4">
            {product.title}
          </h1>
          <p className="text-gray-600 text-lg mb-6">{product.description}</p>

          {/* Price and Validity */}
          <div className="flex items-center gap-6 mb-6">
            <div>
              <span className="text-3xl font-bold text-[var(--accent)]">
                ₹{product.price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={20} />
              <span>{product.validityInDays} days validity</span>
            </div>
          </div>

          {/* Material Count */}
          <div className="flex items-center gap-2 text-gray-600 mb-6">
            <FileText size={20} />
            <span>
              {product.totalMaterialCount} learning materials included
            </span>
          </div>

          {/* Enroll Button */}
          <button className="w-full md:w-auto px-8 py-4 bg-[var(--accent)] text-white font-bold text-lg rounded-lg hover:bg-[var(--primary)] transition-colors shadow-lg">
            Enroll Now
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
        <h2 className="text-2xl font-bold text-[var(--primary)] mb-6">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.features.choiceFilling.isEnabled && (
            <div className="flex items-start gap-3">
              <CheckCircle
                className="text-green-500 flex-shrink-0 mt-1"
                size={24}
              />
              <div>
                <h3 className="font-semibold text-lg">Choice Filling</h3>
                <p className="text-gray-600">
                  {product.features.choiceFilling.usageLimit === -1
                    ? "Unlimited usage"
                    : `${product.features.choiceFilling.usageLimit} uses available`}
                </p>
              </div>
            </div>
          )}

          {product.features.collegePredictor.isEnabled && (
            <div className="flex items-start gap-3">
              <CheckCircle
                className="text-green-500 flex-shrink-0 mt-1"
                size={24}
              />
              <div>
                <h3 className="font-semibold text-lg">College Predictor</h3>
                <p className="text-gray-600">
                  {product.features.collegePredictor.usageLimit === -1
                    ? "Unlimited usage"
                    : `${product.features.collegePredictor.usageLimit} uses available`}
                </p>
              </div>
            </div>
          )}

          {product.features.hasMentorship && (
            <div className="flex items-start gap-3">
              <CheckCircle
                className="text-green-500 flex-shrink-0 mt-1"
                size={24}
              />
              <div>
                <h3 className="font-semibold text-lg">Mentorship</h3>
                <p className="text-gray-600">
                  One-on-one guidance from experts
                </p>
              </div>
            </div>
          )}

          {product.features.hasCourseContent && (
            <div className="flex items-start gap-3">
              <CheckCircle
                className="text-green-500 flex-shrink-0 mt-1"
                size={24}
              />
              <div>
                <h3 className="font-semibold text-lg">Course Content</h3>
                <p className="text-gray-600">Comprehensive study materials</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Landing Page Highlights */}
      {(product.content.landingPageHighlights.introVideo ||
        product.content.landingPageHighlights.coursePdf ||
        product.content.landingPageHighlights.fullDescriptionVideo) && (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-6">
            Course Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.content.landingPageHighlights.introVideo && (
              <a
                href={product.content.landingPageHighlights.introVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-lg hover:border-[var(--accent)] transition-colors no-underline"
              >
                <PlayCircle className="text-[var(--accent)]" size={48} />
                <h3 className="font-semibold text-center">
                  {product.content.landingPageHighlights.introVideo.title}
                </h3>
              </a>
            )}

            {product.content.landingPageHighlights.coursePdf && (
              <a
                href={product.content.landingPageHighlights.coursePdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-lg hover:border-[var(--accent)] transition-colors no-underline"
              >
                <FileText className="text-[var(--accent)]" size={48} />
                <h3 className="font-semibold text-center">
                  {product.content.landingPageHighlights.coursePdf.title}
                </h3>
              </a>
            )}

            {product.content.landingPageHighlights.fullDescriptionVideo && (
              <a
                href={
                  product.content.landingPageHighlights.fullDescriptionVideo.url
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-lg hover:border-[var(--accent)] transition-colors no-underline"
              >
                <Video className="text-[var(--accent)]" size={48} />
                <h3 className="font-semibold text-center">
                  {
                    product.content.landingPageHighlights.fullDescriptionVideo
                      .title
                  }
                </h3>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Curriculum Section */}
      {product.content.curriculum && product.content.curriculum.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-[var(--primary)] mb-6">
            Curriculum
          </h2>
          <div className="space-y-6">
            {product.content.curriculum.map((section, index) => (
              <div
                key={section._id}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <h3 className="text-xl font-semibold text-[var(--primary)] mb-4">
                  {index + 1}. {section.sectionTitle}
                </h3>
                <div className="space-y-3">
                  {section.resources.map((resource) => (
                    <a
                      key={resource._id}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors no-underline"
                    >
                      {resource.type === "video" && (
                        <PlayCircle
                          className="text-[var(--accent)] flex-shrink-0"
                          size={24}
                        />
                      )}
                      {resource.type === "pdf" && (
                        <FileText
                          className="text-[var(--accent)] flex-shrink-0"
                          size={24}
                        />
                      )}
                      {resource.type === "link" && (
                        <ExternalLink
                          className="text-[var(--accent)] flex-shrink-0"
                          size={24}
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">
                          {resource.title}
                        </h4>
                        {resource.duration && (
                          <p className="text-sm text-gray-600">
                            Duration: {Math.floor(resource.duration / 60)} min
                          </p>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
