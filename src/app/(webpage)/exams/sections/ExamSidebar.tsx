import React from "react";
import { Instagram, Youtube, Send, MessageCircle } from "lucide-react";
import Link from "next/link";

interface PopularExam {
  id: string;
  name: string;
  logoUrl?: string;
  description?: string;
  websiteUrl?: string;
  tags?: string[];
}

interface ExamSidebarProps {
  socialLinks?: {
    youtube?: string;
    telegram?: string;
    instagram?: string;
    whatsapp?: string;
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

            {socialLinks.whatsapp && (
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                  <MessageCircle size={20} />
                </div>
                <span className="text-[#0D3A66] font-medium group-hover:underline">
                  WhatsApp
                </span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Popular Exams Section */}
      {popularExams.length > 0 && (
        <div className="bg-gradient-to-br from-[#0D3A66] to-[#1a5490] rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
                <path d="m9 9.5 2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Popular Exams</h3>
          </div>
          <div className="flex flex-col gap-3">
            {popularExams.map((exam) => (
              <Link
                key={exam.id}
                href={exam.websiteUrl || `/exams/${exam.id}`}
                className="group relative overflow-hidden bg-white/10 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] hover:shadow-xl border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white p-1.5 flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                    <img
                      src={exam.logoUrl}
                      alt={exam.name}
                      className="w-full h-full object-contain rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="text-sm font-bold text-[#0D3A66] flex items-center justify-center h-full w-full">${exam.name.charAt(
                            0,
                          )}</div>`;
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-sm leading-tight mb-1.5 group-hover:text-[#FFD700] transition-colors line-clamp-2">
                      {exam.name}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {exam.tags &&
                        exam.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[10px] font-medium bg-white/20 text-white/90 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-[#FFD700] group-hover:text-[#0D3A66] transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white group-hover:text-[#0D3A66]"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                {/* Decorative gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700]/5 to-[#FFD700]/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Link>
            ))}
          </div>
          <Link
            href="/exams"
            className="mt-4 flex items-center justify-center gap-2 py-2.5 px-4 bg-[#FFD700] text-[#0D3A66] font-semibold rounded-lg hover:bg-[#FFC107] transition-all duration-300 hover:shadow-lg"
          >
            <span>View All Exams</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
