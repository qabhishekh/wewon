import React from "react";
import { Instagram, Youtube,Send } from "lucide-react";
import Link from "next/link";

interface PopularExam {
  id: string;
  name: string;
  logoUrl?: string;
  description?: string;
}

interface ExamSidebarProps {
  socialLinks?: {
    youtube?: string;
    telegram?: string;
    instagram?: string;
  };
  popularExams?: PopularExam[];
}

export default function ExamSidebar({
  socialLinks,
  popularExams = [],
}: ExamSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Social Media Links */}
      {socialLinks && (
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#0D3A66] mb-4">
            Connect With Us
          </h3>
          <div className="flex flex-col gap-3">
            {socialLinks.youtube && (
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-[#FF0000]/10 hover:bg-[#FF0000]/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center text-white">
                  <Youtube size={20} />
                </div>
                <span className="text-[#0D3A66] font-medium group-hover:underline">
                  Youtube
                </span>
              </a>
            )}

            {socialLinks.telegram && (
              <a
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white">
                  <Send size={20} />
                </div>
                <span className="text-[#0D3A66] font-medium group-hover:underline">
                  Telegram
                </span>
              </a>
            )}

            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 hover:from-[#833AB4]/20 hover:via-[#FD1D1D]/20 hover:to-[#F77737]/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] flex items-center justify-center text-white">
                  <Instagram size={20} />
                </div>
                <span className="text-[#0D3A66] font-medium group-hover:underline">
                  Instagram
                </span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Popular Exams */}
      {popularExams.length > 0 && (
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#0D3A66] mb-4">
            Popular Exams
          </h3>
          <div className="space-y-3">
            {popularExams.map((exam) => (
              <Link
                key={exam.id}
                href={`/exams/${exam.id}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group border border-gray-100"
              >
                {exam.logoUrl ? (
                  <div className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={exam.logoUrl}
                      alt={exam.name}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="text-lg font-bold text-gray-400">${exam.name.charAt(
                            0
                          )}</div>`;
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 flex-shrink-0 bg-[#0D3A66]/10 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold text-[#0D3A66]">
                      {exam.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#0D3A66] group-hover:text-[#FF7A3D] transition-colors truncate">
                    {exam.name}
                  </h4>
                  {exam.description && (
                    <p className="text-sm text-gray-600 truncate">
                      {exam.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}