"use client";
import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import Pagination from "@/components/sections/Pagination";
import { useRouter } from "next/navigation";
import CollegeCard from "@/components/cards/CollegeCard";
import FilterModal from "@/components/filter/FilterModal";

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
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);
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
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
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
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
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
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
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
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
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
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
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
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
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
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
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
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    },
    // Add more colleges to see pagination in action
    ...Array.from({ length: 72 }, (_, i) => ({
      id: `${i + 9}`,
      name: `IIT, BHUBANESWAR ${i + 9}`,
      location: "Bhubaneswar, Odisha",
      city: "Bhubaneswar",
      established: "Estd. 1885",
      nirf: "Top 5 NIRF",
      naac: "NAAC A++",
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=900",
    })),
  ];

  const totalPages = Math.ceil(colleges.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentColleges = colleges.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleKnowMore = (collegeId: string) => {
    router.push(`/colleges/${collegeId}`);
  };

  const handleApplyFilter = (filters: any) => {
    console.log(filters);
    
  }

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-12">
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
            onClick={() => setIsFilterOpen(true)}
          >
            <Filter size={20} style={{ color: "#ffffff" }} />
          </button>
        </div>
      </div>

      {/* College Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentColleges.map((college) => (
          <CollegeCard
            college={college}
            key={college.id}
            handleKnowMore={handleKnowMore}
          />
        ))}
      </div>

      <FilterModal
      handleApplyFilter={handleApplyFilter}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
