"use client";

import React, { useState } from "react";
import { Images, Loader2 } from "lucide-react";
import { CollegeMedia } from "@/network/collegeMedia";
import ImageLightbox from "@/components/ui/ImageLightbox";

interface CollegeGalleryProps {
  gallery: CollegeMedia[];
  loading?: boolean;
  error?: string | null;
  collegeName?: string;
}

export default function CollegeGallery({
  gallery,
  loading = false,
  error = null,
  collegeName = "College",
}: CollegeGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-bold text-[#0D3A66] mb-6 flex items-center gap-2">
          <Images size={24} />
          Campus Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-bold text-[#0D3A66] mb-6 flex items-center gap-2">
          <Images size={24} />
          Campus Gallery
        </h2>
        <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  // Empty state
  if (gallery.length === 0) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-bold text-[#0D3A66] mb-6 flex items-center gap-2">
          <Images size={24} />
          Campus Gallery
        </h2>
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <Images size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">
            No gallery images available for this college yet.
          </p>
        </div>
      </section>
    );
  }

  // Prepare images for lightbox
  const lightboxImages = gallery.map((img) => ({
    url: img.url,
    alt: `${collegeName} campus`,
  }));

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-[#0D3A66] mb-6 flex items-center gap-2">
        <Images size={24} />
        Campus Gallery
        <span className="text-sm font-normal text-gray-500 ml-2">
          ({gallery.length} images)
        </span>
      </h2>

      {/* Responsive grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((image, index) => (
          <div
            key={image._id}
            onClick={() => openLightbox(index)}
            className="aspect-[4/3] relative overflow-hidden rounded-lg cursor-pointer group shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <img
              src={image.url}
              alt={`${collegeName} campus ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 rounded-full p-2">
                  <Images size={20} className="text-[#0D3A66]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={lightboxImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentImageIndex}
      />
    </section>
  );
}
