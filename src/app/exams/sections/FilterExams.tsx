"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import Pagination from "@/components/sections/Pagination";
import { useRouter } from "next/navigation";
import ExamCard from "@/components/cards/ExamCard";

interface Exams {
  id: string;
  name: string;
  description: string;
  image: string;
}

export default function FilterExams() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const exams: Exams[] = [
    {
      id: "1",
      name: "JEE Advanced",
      description: "The IIT JEE Advanced exam is held annually for admission to the 23 IITs in India",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    {
      id: "2",
      name: "JEE Advanced",
      description: "The IIT JEE Advanced exam is held annually for admission to the 23 IITs in India",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    {
      id: "3",
      name: "JEE Advanced",
      description: "The IIT JEE Advanced exam is held annually for admission to the 23 IITs in India",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    {
      id: "4",
      name: "JEE Advanced",
      description: "The IIT JEE Advanced exam is held annually for admission to the 23 IITs in India",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    {
      id: "5",
      name: "JEE Advanced",
      description: "The IIT JEE Advanced exam is held annually for admission to the 23 IITs in India",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    {
      id: "6",
      name: "JEE Advanced",
      description: "The IIT JEE Advanced exam is held annually for admission to the 23 IITs in India",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    {
      id: "7",
      name: "JEE Advanced",
      description: "The IIT JEE Advanced exam is held annually for admission to the 23 IITs in India",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    {
      id: "8",
      name: "JEE Advanced",
      description: "The IIT JEE Advanced exam is held annually for admission to the 23 IITs in India",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    // Add more colleges to see pagination in action
    ...Array.from({ length: 72 }, (_, i) => ({
      id: `${i + 9}`,
      name: `JEE Advanced ${i + 9}`,
      description: "The IIT JEE Advanced exam is held annually for admission to the 23 IITs in India",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    })),
  ];
  
  const totalPages = Math.ceil(exams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentExams = exams.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleKnowMore = (collegeId: string) => {
    router.push(`/exams/${collegeId}`);
  };

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <h1
          className="text-3xl md:text-4xl font-bold"
          style={{ color: "#0D3A66" }}
        >
          Filter Exams
        </h1>

        {/* Search and Filter */}
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2"
              size={20}
              style={{ color: "rgba(13, 58, 102, 0.4)" }}
            />
            <input
              type="text"
              placeholder="Search for Exams"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-12 pr-4 rounded-lg outline-none transition-all"
              style={{
                border: "1px solid rgba(13, 58, 102, 0.2)",
                color: "#0D3A66",
                backgroundColor: "#ffffff",
              }}
            />
          </div>

          <button
            className="p-3 rounded-lg transition-all hover:opacity-90"
            style={{ backgroundColor: "#0D3A66" }}
          >
            <Search size={20} style={{ color: "#ffffff" }} />
          </button>

          <button
            className="p-3 rounded-lg transition-all hover:opacity-90"
            style={{ backgroundColor: "#0D3A66" }}
          >
            <Filter size={20} style={{ color: "#ffffff" }} />
          </button>
        </div>
      </div>

      {/* College Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentExams.map((exam) => (
          <ExamCard exam={exam} key={exam.id} handleKnowMore={handleKnowMore} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
