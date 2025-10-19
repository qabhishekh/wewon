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

interface College {
  id: string;
  name: string;
  location: string;
  city: string;
  established: string;
  nirf: string;
  naac: string;
  image: string;
}





export default function FilterColleges() {
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const colleges: College[] = [
    {
      id: "1",
      name: "IIT, BHUBANESWAR",
      location: "Bhubaneswar, Odisha",
      city: "Bhubaneswar",
      established: "Estd. 1885",
      nirf: "Top 5 NIRF",
      naac: "NAAC A++",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2086",
    },
    {
      id: "2",
      name: "IIT, BHUBANESWAR",
      location: "Bhubaneswar, Odisha",
      city: "Bhubaneswar",
      established: "Estd. 1885",
      nirf: "Top 5 NIRF",
      naac: "NAAC A++",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2086",
    },
    {
      id: "3",
      name: "IIT, BHUBANESWAR",
      location: "Bhubaneswar, Odisha",
      city: "Bhubaneswar",
      established: "Estd. 1885",
      nirf: "Top 5 NIRF",
      naac: "NAAC A++",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2086",
    },
    {
      id: "4",
      name: "IIT, BHUBANESWAR",
      location: "Bhubaneswar, Odisha",
      city: "Bhubaneswar",
      established: "Estd. 1885",
      nirf: "Top 5 NIRF",
      naac: "NAAC A++",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2086",
    },
    {
      id: "5",
      name: "IIT, BHUBANESWAR",
      location: "Bhubaneswar, Odisha",
      city: "Bhubaneswar",
      established: "Estd. 1885",
      nirf: "Top 5 NIRF",
      naac: "NAAC A++",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2086",
    },
    {
      id: "6",
      name: "IIT, BHUBANESWAR",
      location: "Bhubaneswar, Odisha",
      city: "Bhubaneswar",
      established: "Estd. 1885",
      nirf: "Top 5 NIRF",
      naac: "NAAC A++",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2086",
    },
    {
      id: "7",
      name: "IIT, BHUBANESWAR",
      location: "Bhubaneswar, Odisha",
      city: "Bhubaneswar",
      established: "Estd. 1885",
      nirf: "Top 5 NIRF",
      naac: "NAAC A++",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2086",
    },
    {
      id: "8",
      name: "IIT, BHUBANESWAR",
      location: "Bhubaneswar, Odisha",
      city: "Bhubaneswar",
      established: "Estd. 1885",
      nirf: "Top 5 NIRF",
      naac: "NAAC A++",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2086",
    },
    // Add more colleges to see pagination in action
    ...Array.from({ length: 72 }, (_, i) => ({
      id: `${i + 9}`,
      name: "IIT, BHUBANESWAR",
      location: "Bhubaneswar, Odisha",
      city: "Bhubaneswar",
      established: "Estd. 1885",
      nirf: "Top 5 NIRF",
      naac: "NAAC A++",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2086",
    })),
  ];

  const totalPages = Math.ceil(colleges.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentColleges = colleges.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleKnowMore = (collegeId: string) => {
    router.push(`/colleges/${collegeId}`);
  };

  return (
    <div
      className="min-h-screen p-6 md:p-8 lg:p-12"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <h1
          className="text-3xl md:text-4xl font-bold"
          style={{ color: "#0D3A66" }}
        >
          Filter Colleges
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
              placeholder="Search for colleges"
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
        {currentColleges.map((college) => (
          <div
            key={college.id}
            className="rounded-xl overflow-hidden transition-all hover:shadow-lg"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid rgba(13, 58, 102, 0.1)",
            }}
          >
            {/* College Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* College Info */}
            <div className="p-4">
              <h3
                className="text-lg font-bold mb-1"
                style={{ color: "#0D3A66" }}
              >
                {college.name}
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: "rgba(13, 58, 102, 0.6)" }}
              >
                {college.location}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "rgba(13, 58, 102, 0.7)" }}
                >
                  <Calendar size={14} />
                  <span>{college.established}</span>
                </div>
                <div
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "rgba(13, 58, 102, 0.7)" }}
                >
                  <MapPin size={14} />
                  <span>{college.nirf}</span>
                </div>
                <div
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "rgba(13, 58, 102, 0.7)" }}
                >
                  <GraduationCap size={14} />
                  <span>{college.naac}</span>
                </div>
              </div>

              {/* Know More Button */}
              <button
                onClick={() => handleKnowMore(college.id)}
                className="w-full py-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
                style={{
                  backgroundColor: "rgba(13, 58, 102, 0.08)",
                  color: "#0D3A66",
                }}
              >
                Know More
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
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