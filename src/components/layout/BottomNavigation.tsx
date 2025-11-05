"use client";
import React, { useState } from "react";
import { Home, FileText, Monitor, BarChart3, User } from "lucide-react";

interface NavItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface BottomNavigationProps {
  items?: NavItem[];
  onItemClick?: (itemId: string) => void;
  defaultActive?: string;
}

export default function BottomNavigation({
  items = [
    { id: "home", icon: Home, label: "Home" },
    { id: "docs", icon: FileText, label: "Docs" },
    { id: "monitor", icon: Monitor, label: "Monitor" },
    { id: "stats", icon: BarChart3, label: "Stats" },
    { id: "profile", icon: User, label: "Profile" },
  ],
  onItemClick,
  defaultActive = "home",
}: BottomNavigationProps) {
  const [activeItem, setActiveItem] = useState(defaultActive);

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-10 flex justify-center pb-6 px-4"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div
        className="bg-white rounded-full shadow-2xl lg:px-8 lg:py-4 px-4 py-2 flex items-center lg:gap-8 gap-4"
        style={{
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className="relative flex flex-col items-center justify-center transition-all duration-200 hover:scale-110 group"
              aria-label={item.label}
            >
              <div
                className={`p-3 rounded-2xl transition-all duration-200 ${
                  isActive ? "scale-110" : "group-hover:bg-gray-50"
                }`}

              >
                <Icon
                  className={`w-6 h-6 transition-colors duration-200 text-primary`}
                />
              </div>

              {/* Active indicator dot */}
              {isActive && (
                <div
                  className="absolute -bottom-1 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--primary)" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
