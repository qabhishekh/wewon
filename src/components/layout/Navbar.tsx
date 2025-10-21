"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react'; // Using Lucide icons for menu toggle
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const navLinks = [
    { name: "College Predictors", href: "/predictors" },
    { name: "Counseling", href: "/counseling" },
    { name: "Colleges", href: "/colleges" },
    { name: "Exams", href: "/exams" },
    { name: "Mentorship", href: "/mentorship" },
  ];

  return (
    <nav className="bg-[var(--background)] text-white flex items-center shadow-md w-full relative z-50 py-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center h-full">
          <a href='/' className="h-full py-2">
            <Image src="/logo.svg" alt="We Won Academy Logo" width={70} height={30} className="h-full object-contain" />
          </a>
        </div>
        <div className='flex gap-6 items-center'>
          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-4 h-full">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[var(--primary)] text-sm font-semibold hover:text-[var(--accent)] transition-colors h-full flex items-center"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Get Started Button - Desktop */}
          <div className="hidden xl:flex h-full items-center py-2">
            <button className="bg-[var(--accent)] text-[var(--background)] text-sm font-semibold px-8 py-2 rounded-3xl shadow-lg hover:bg-[var(--primary)] transition-colors h-full flex items-center justify-center cursor-pointer">
              Get Started
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="xl:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-[var(--primary)] focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay (Hidden by default, shown when isOpen is true) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Topbar stays fixed and visible */}
            <div className='shadow-md xl:hidden fixed top-0 left-0 right-0 bg-[var(--background)] z-[51]'>
              <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
                <Image src="/logo.svg" alt="We Won Academy Logo" width={70} height={30} className="h-full object-contain" />
                <button onClick={() => setIsOpen(false)} className="text-[var(--primary)] focus:outline-none">
                  <X size={32} />
                </button>
              </div>
            </div>
            {/* Animated menu slides in from left */}
            <motion.div
              className="xl:hidden fixed top-0 left-0 h-full w-4/5 max-w-xs bg-[var(--background)] z-50 flex flex-col pt-20 shadow-2xl"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="flex-1 flex flex-col gap-3 px-5 py-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-[var(--primary)] text-base font-semibold hover:text-[var(--accent)] transition-colors py-3 px-4 rounded-xl bg-white/5 shadow-sm text-left w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
                <button className="bg-[var(--accent)] text-[var(--background)] text-base font-semibold px-8 py-3 rounded-2xl shadow-lg hover:bg-[var(--primary)] transition-colors mt-4 w-full"
                  onClick={() => setIsOpen(false)}>
                  Get Started
                </button>
              </div>
            </motion.div>
            {/* Overlay for background dimming and click to close */}
            <motion.div
              className="xl:hidden fixed inset-0 bg-black bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;