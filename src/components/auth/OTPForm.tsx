"use client";

import React, { useRef, useState } from "react";

type OTPFormProps = {
  onSubmit?: (otp: string) => void;
  loading?: boolean;

  onResend?: () => Promise<void> | void;
  resendLoading?: boolean;
};

export default function OTPForm({
  onSubmit,
  loading,

  onResend,
  resendLoading,
}: OTPFormProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    // Only allow a single digit (0-9)
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const key = e.key;
    // Handle backspace: if current empty, move to previous
    if (key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        // clear current value on backspace
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }

    // Allow arrow navigation
    if (key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pastedData) return;

    const digits = pastedData.split("");
    const newOtp = ["", "", "", "", "", ""];
    digits.forEach((d, i) => {
      if (i < 6) newOtp[i] = d;
    });
    setOtp(newOtp);

    // Focus next empty or last filled
    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      onSubmit?.(otpValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          Enter OTP
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Please check your email for OTP
        </p>
      </div>

      <div className="flex justify-center gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-12 h-14 text-center text-2xl font-semibold border border-[var(--border)] rounded-lg shadow-sm focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition"
            required
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>

      <div>
        <button
          type="submit"
          disabled={otp.join("").length !== 6 || !!loading}
          className="w-full bg-[var(--primary)] text-white font-semibold p-3.5 rounded-lg shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>

      <div className="text-center">
        <button
          type="button"
          className="text-sm text-[var(--primary)] hover:underline transition"
          onClick={async () => {
            setOtp(["", "", "", "", "", ""]);
            // focus first
            inputRefs.current[0]?.focus();
            if (onResend) await onResend();
          }}
          disabled={!!resendLoading}
        >
          {resendLoading ? "Resending..." : "Didn't receive code? Resend"}
        </button>
      </div>
    </form>
  );
}
