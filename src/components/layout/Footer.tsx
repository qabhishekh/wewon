import React from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { div } from "framer-motion/client";

// Data is separated into two rows to match the image layout perfectly
const topRowLinks = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Counselling", href: "/counselling" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "College Predictor", href: "/predictor" },
      { label: "Rank Analysis", href: "/percentile" },
      { label: "Mentorship", href: "/counselling" },
    ],
  },
];

const bottomRowLinks = [
  {
    title: "Colleges",
    links: [
      { label: "Statewise Colleges", href: "/colleges" },
      { label: "Colleges in Delhi NCR", href: "/colleges" },
      { label: "Explore All IITs", href: "/colleges" },
      { label: "Explore All NITs", href: "/colleges" },
      { label: "Explore All IIITs", href: "/colleges" },
    ],
  },
  {
    title: "Exams",
    links: [
      { label: "JEE (Main)", href: "/exams" },
      { label: "JEE (Advanced)", href: "/exams" },
      { label: "BITSAT", href: "/exams" },
      { label: "MHT-CET", href: "/exams" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Percentile Converter", href: "/percentile" },
      {
        label: "JEE Early College Predictor",
        href: "/jee-early-predictor",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[var(--primary)] px-4 text-white font-sans rounded-t-4xl">
      <div className="container mx-auto pt-16 pb-8 px-2">
        {/* Main content section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-8 gap-y-12">
          {/* Brand Info - spans 2 columns on large screens */}
          <div className="space-y-6 lg:col-span-2">
            <h2 className="text-3xl font-bold">We Won Academy</h2>
            <p className="text-base text-gray-300 max-w-sm">
              Empowering students to find their perfect college with AI-driven
              insights and expert guidance.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center text-[#0D2847]  transition-colors"
              >
                <Facebook
                  size={20}
                  color="transparent"
                  fill="var(--background)"
                />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center text-[#0D2847]  transition-colors"
              >
                <Instagram
                  size={20}
                  color="var(--accent)"
                  fill="var(--background)"
                />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center text-[#0D2847]  transition-colors"
              >
                <Linkedin
                  size={20}
                  color="transparent"
                  fill="var(--background)"
                />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center text-[#0D2847]  transition-colors"
              >
                <Youtube
                  size={20}
                  color="var(--accent)"
                  fill="var(--background)"
                />
              </a>
            </div>
          </div>

          {/* All other sections: TopRowLinks, Support, BottomRowLinks */}
          {[
            ...topRowLinks,
            {
              title: "Support",
              links: [
                {
                  label: "Email: collegeskhojoyt@gmail.com",
                  href: "mailto:collegeskhojoyt@gmail.com",
                },
                {
                  label: "Phone: +91-9532845978 (WhatsApp Only)",
                  href: "tel:+919532845978",
                },
                { label: "Terms of Service", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Refund Policy", href: "/refund" },
              ],
            },
            ...bottomRowLinks,
          ].map((section, idx) => (
            <div key={section.title || idx}>
              <h3 className="font-semibold tracking-wider text-white">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link, i) => {
                  const isObject =
                    typeof link === "object" &&
                    "label" in link &&
                    "href" in link;
                  const label = isObject ? (link as any).label : link;
                  const href = isObject ? (link as any).href : "#";
                  return (
                    <li
                      key={typeof label === "string" ? label : i}
                      className={
                        section.title === "Support" && i < 2
                          ? "text-gray-300"
                          : ""
                      }
                    >
                      {isObject ? (
                        <a
                          href={href}
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          {label}
                        </a>
                      ) : (
                        // fallback for React elements (if any)
                        label
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-16 border-t border-gray-700 py-8 text-center container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-base text-gray-300">
          &copy; 2026 We Won Academy. All rights reserved.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          All predictions are based on advanced AI algorithms and historical
          data. Actual results may vary.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
