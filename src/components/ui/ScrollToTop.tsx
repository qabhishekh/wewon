"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-btn"
          aria-label="Scroll to top"
        >
          <ArrowUp className="scroll-to-top-icon" />
        </button>
      )}

      <style jsx global>{`
        .scroll-to-top-btn {
          position: fixed;
          bottom: 44px;
          right: 44px;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background: var(--primary);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .scroll-to-top-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          padding: 2px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .scroll-to-top-btn:hover {
          transform: translateY(-4px) scale(1.05);
          
        }

        .scroll-to-top-btn:active {
          transform: translateY(-2px) scale(1.02);
        }

        .scroll-to-top-icon {
          width: 24px;
          height: 24px;
          color: white;
          stroke-width: 2.5;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
          transition: transform 0.3s ease;
        }

        .scroll-to-top-btn:hover .scroll-to-top-icon {
          transform: translateY(-2px);
          animation: bounce 0.6s ease infinite;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(-2px);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .scroll-to-top-btn {
            bottom: 20px;
            right: 20px;
            width: 46px;
            height: 46px;
          }

          .scroll-to-top-icon {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </>
  );
}
