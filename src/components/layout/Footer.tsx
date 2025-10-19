import React from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

// Data is separated into two rows to match the image layout perfectly
const topRowLinks = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "College Predictor", href: "/tools/college-predictor" },
      { label: "Rank Analysis", href: "/tools/rank-analysis" },
      { label: "Mentorship", href: "/mentorship" },
      { label: "Exam Alerts", href: "/alerts" },
    ],
  },
];

const bottomRowLinks = [
  {
    title: "Colleges",
    links: [
      { label: "Statewise Colleges", href: "/colleges/statewise" },
      { label: "Colleges in Delhi NCR", href: "/colleges/delhi-ncr" },
      { label: "Explore All IITs", href: "/colleges/iits" },
      { label: "Explore All NITs", href: "/colleges/nits" },
      { label: "Explore All IIITs", href: "/colleges/iiits" },
    ],
  },
  {
    title: "Exams",
    links: [
      { label: "JEE (Main)", href: "/exams/jee-main" },
      { label: "JEE (Advanced)", href: "/exams/jee-advanced" },
      { label: "BITSAT", href: "/exams/bitsat" },
      { label: "MHT-CET", href: "/exams/mht-cet" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "College Finder", href: "/tools/college-finder" },
      { label: "JEE (Main) Rank Predictor", href: "/tools/jee-main-rank-predictor" },
      { label: "JEE (Main) College Predictor", href: "/tools/jee-main-college-predictor" },
      { label: "JEE (Advanced) College Predictor", href: "/tools/jee-advanced-college-predictor" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[var(--primary)] text-white font-sans rounded-t-4xl">
      <div className="container mx-auto pt-16 pb-8">
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
                <Facebook size={20} color="transparent" fill="var(--background)"/>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center text-[#0D2847]  transition-colors"
              >
                <Instagram size={20} color="var(--accent)" fill="var(--background)"/>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center text-[#0D2847]  transition-colors"
              >
                <Linkedin size={20} color="transparent" fill="var(--background)"/>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 bg-[var(--accent)] rounded-full flex items-center justify-center text-[#0D2847]  transition-colors"
              >
                <Youtube size={20} color="var(--accent)" fill="var(--background)"/>
              </a>
            </div>
          </div>

          {/* All other sections: TopRowLinks, Support, BottomRowLinks */}
          {[
            ...topRowLinks,
            {
              title: "Support",
              links: [
                { label: "Email: support@gmail.com", href: "mailto:support@gmail.com" },
                { label: "Phone: +91-XXXX-XXXXXX", href: "tel:+911234567890" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
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
                  const isObject = typeof link === 'object' && 'label' in link && 'href' in link;
                  const label = isObject ? (link as any).label : link;
                  const href = isObject ? (link as any).href : '#';
                  return (
                    <li
                      key={typeof label === 'string' ? label : i}
                      className={section.title === 'Support' && i < 2 ? 'text-gray-300' : ''}
                    >
                      {isObject ? (
                        <a href={href} className="text-gray-300 hover:text-white transition-colors">
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
