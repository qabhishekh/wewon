"use client";

import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => Promise<void>;
  onBack: () => void;
  loading?: boolean;
}

export default function ForgotPasswordForm({
  onSubmit,
  onBack,
  loading,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-[var(--primary)] hover:underline text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Login
      </button>

      {/* Header */}
      <div className="text-center lg:text-left">
        <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
          <Mail className="w-8 h-8 text-[var(--primary)]" />
        </div>
        <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">
          Forgot Password?
        </h3>
        <p className="text-[var(--muted-text)] text-sm">
          No worries! Enter your email address and we'll send you an OTP to
          reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label
            htmlFor="forgot-email"
            className="block text-sm font-medium text-[var(--foreground)] mb-1.5"
          >
            Email Address
          </label>
          <input
            type="email"
            id="forgot-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your registered email"
            className="w-full p-3 border border-[var(--border)] rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition placeholder:text-[var(--muted-text)]"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !email}
          className="w-full bg-[var(--primary)] text-white font-semibold p-3.5 rounded-lg shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="animate-spin inline-block mr-2" />}
          Send OTP
        </button>
      </form>
    </div>
  );
}
