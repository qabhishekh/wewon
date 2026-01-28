"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

export default function LoginForm({
  handleLogin,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  onForgotPassword,
}: {
  handleLogin: () => void;
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  loading?: boolean;
  onForgotPassword?: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition placeholder:text-[var(--muted-text)]"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

      {/* Remember me & Forgot Password */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            className="h-4 w-4 text-[var(--primary)] border-gray-300 rounded focus:ring-[var(--primary)]"
          />
          <label htmlFor="rememberMe" className="ml-2 text-[var(--muted-text)]">
            Remember me
          </label>
        </div>
        <button
          type="button"
          onClick={onForgotPassword}
          className="font-medium text-[var(--primary)] hover:underline"
        >
          Forgot Password ?
        </button>
      </div>

      {/* Login Button */}
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--primary)] text-white font-semibold p-3.5 rounded-lg shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="animate-spin inline-block mr-2" />}
          Login
        </button>
      </div>
    </form>
  );
}
