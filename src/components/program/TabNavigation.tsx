"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  const activeIndex = tabs.indexOf(activeTab);

  return (
    <div className="relative border-b border-gray-200">
      <div className="flex gap-8">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`relative px-4 py-3 font-semibold transition-colors ${
              activeTab === tab
                ? "text-[var(--accent)]"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Animated Indicator */}
      <motion.div
        className="absolute bottom-0 h-0.5 bg-[var(--accent)]"
        initial={false}
        animate={{
          left: `${activeIndex * (100 / tabs.length)}%`,
          width: `${100 / tabs.length}%`,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      />
    </div>
  );
}
