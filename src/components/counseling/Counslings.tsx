"use client";
import React, { useState } from "react";
import CounselingCard from "../cards/CounselingCard";
import Pagination from "@/components/sections/Pagination";

// Dummy counseling data
const counselingData = [
  {
    id: 1,
    title: "JEE Advanced Mentorship Program",
    description: "Comprehensive guidance for JEE Advanced preparation with expert mentors. Get personalized study plans, mock tests, and one-on-one sessions.",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1974&auto=format&fit=crop",
    originalPrice: 4999,
    currentPrice: 2999,
    buttonText: "Get Guidance",
    href: "#"
  },
  {
    id: 2,
    title: "NEET UG Counselling Support",
    description: "Complete NEET counselling assistance including college selection, document verification, and seat allocation guidance.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop",
    originalPrice: 2999,
    currentPrice: 1999,
    buttonText: "Get Guidance",
    href: "#"
  },
  {
    id: 3,
    title: "MBA Entrance Preparation",
    description: "Expert coaching for CAT, XAT, GMAT and other MBA entrance exams with comprehensive study material and practice tests.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    originalPrice: 3499,
    currentPrice: 2499,
    buttonText: "Get Guidance",
    href: "#"
  },
  {
    id: 4,
    title: "Engineering College Selection",
    description: "Get expert advice on choosing the right engineering college based on your JEE rank, preferences, and career goals.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    originalPrice: 1999,
    currentPrice: 1499,
    buttonText: "Get Guidance",
    href: "#"
  },
  {
    id: 5,
    title: "UPSC Civil Services Coaching",
    description: "Complete UPSC preparation program with current affairs, answer writing practice, and personality development sessions.",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
    originalPrice: 5999,
    currentPrice: 3999,
    buttonText: "Get Guidance",
    href: "#"
  },
  {
    id: 6,
    title: "Medical College Admission Guidance",
    description: "Expert assistance for medical college admissions including NEET counselling, college ranking, and fee structure analysis.",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1931&auto=format&fit=crop",
    originalPrice: 2499,
    currentPrice: 1799,
    buttonText: "Get Guidance",
    href: "#"
  },
  {
    id: 7,
    title: "Class 12 Board Exam Strategy",
    description: "Strategic preparation for Class 12 board exams with subject-wise guidance, time management, and stress management techniques.",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
    originalPrice: 1999,
    currentPrice: 1299,
    buttonText: "Get Guidance",
    href: "#"
  },
  {
    id: 8,
    title: "Career Counselling for Science Students",
    description: "Comprehensive career guidance for science students exploring options in engineering, medicine, research, and other fields.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    originalPrice: 1499,
    currentPrice: 999,
    buttonText: "Get Guidance",
    href: "#"
  },
  {
    id: 9,
    title: "Study Abroad Consultation",
    description: "Complete guidance for studying abroad including university selection, application process, visa assistance, and scholarship opportunities.",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1974&auto=format&fit=crop",
    originalPrice: 7999,
    currentPrice: 5999,
    buttonText: "Get Guidance",
    href: "#"
  },
  {
    id: 10,
    title: "Entrance Exam Time Management",
    description: "Master time management techniques for competitive exams with proven strategies, practice sessions, and performance analysis.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    originalPrice: 999,
    currentPrice: 699,
    buttonText: "Get Guidance",
    href: "#"
  },
  {
    id: 11,
    title: "Interview Preparation Masterclass",
    description: "Complete interview preparation for college admissions and placements with mock interviews and personality development.",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1931&auto=format&fit=crop",
    originalPrice: 1799,
    currentPrice: 1299,
    buttonText: "Get Guidance",
    href: "#"
  },
  {
    id: 12,
    title: "Scholarship Application Guidance",
    description: "Expert assistance in finding and applying for scholarships with application review and documentation support.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop",
    originalPrice: 1299,
    currentPrice: 899,
    buttonText: "Get Guidance",
    href: "#"
  }
];

export default function Counslings() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 3x3 grid on desktop
  
  // Calculate pagination
  const totalPages = Math.ceil(counselingData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = counselingData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="px-4 md:px-0">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {currentItems.map((item) => (
          <CounselingCard
            key={item.id}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            imageAlt={item.title}
            originalPrice={item.originalPrice}
            currentPrice={item.currentPrice}
            buttonText={item.buttonText}
            href={item.href}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 md:mt-12 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
