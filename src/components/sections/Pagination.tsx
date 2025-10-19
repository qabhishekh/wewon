import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-lg border transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "rgba(13, 58, 102, 0.15)",
          color: "rgba(13, 58, 102, 0.6)",
        }}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <div
              className="w-10 h-10 flex items-center justify-center text-sm font-medium"
              style={{ color: "rgba(13, 58, 102, 0.4)" }}
            >
              •••
            </div>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className="w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-semibold transition-all hover:opacity-90"
              style={{
                backgroundColor: currentPage === page ? "#0D3A66" : "#ffffff",
                borderColor:
                  currentPage === page ? "#0D3A66" : "rgba(13, 58, 102, 0.15)",
                color: currentPage === page ? "#ffffff" : "#0D3A66",
              }}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-lg border transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
        style={{
          backgroundColor: "#ffffff",
          borderColor: "rgba(13, 58, 102, 0.15)",
          color: "rgba(13, 58, 102, 0.6)",
        }}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
