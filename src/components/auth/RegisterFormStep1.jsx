"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function RegisterFormStep1({ onNext }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd validate these fields before moving to the next step
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Address */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your Email Address"
          className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition placeholder:text-[var(--muted-text)]"
          required
        />
      </div>

      {/* Username */}
      <div>
        <label
          htmlFor="regUsername"
          className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
        >
          User name
        </label>
        <input
          type="text"
          id="regUsername"
          placeholder="Enter your User name"
          className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition placeholder:text-[var(--muted-text)]"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="regPassword"
          className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="regPassword"
            placeholder="Enter your Password"
            className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition placeholder:text-[var(--muted-text)] pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--muted-text)] hover:text-[var(--primary)]"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Next Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-[var(--primary)] text-white font-semibold p-3.5 rounded-lg shadow-md hover:opacity-90 transition-opacity"
        >
          Next
        </button>
      </div>
    </form>
  );
}