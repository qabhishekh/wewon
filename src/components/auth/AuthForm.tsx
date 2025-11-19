// components/AuthForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";
import RegisterFormStep1 from "./RegisterFormStep1";
import OTPForm from "./OTPForm";
import apiClient from "../../hooks/Axios";
import { toast } from "sonner";
import { fetchUserProfile, loginUser } from "@/store/auth/authThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

export default function AuthForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [registerStep, setRegisterStep] = useState<number>(1);

  // Registration form state (moved to parent)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login form state (parent-managed)
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // UX state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [otpLoading, setOtpLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Login UX state
  const [loginLoading, setLoginLoading] = useState(false);

  // Step 1: send register request (server sends OTP)
  const handleNextStep = async () => {
    setError(null);
    setLoading(true);
    try {
      // Use full backend URL per API doc
      await apiClient.post("/api/auth/register", {
        name,
        email,
        password,
      });
      // server should respond with message "OTP sent..."
      setRegisterStep(2);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Registration request failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // Allow resending OTP from OTPForm
  const handleResend = async () => {
    setResendLoading(true);

    try {
      await apiClient.post("/api/auth/register", {
        name,
        email,
        password,
      });
      // keep user on OTP step; show a small notice (alert used for brevity)
      alert("OTP resent to your email");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || err?.message || "Resend failed"
      );
    } finally {
      setResendLoading(false);
    }
  };

  // Step 2: verify OTP
  const handleOTPSubmit = async (otp: string) => {
    setOtpLoading(true);
    try {
      const res = await apiClient.post("/api/auth/verify-otp", {
        email,
        otp,
      });

      // Expected: { message, token, user }
      const token = res?.data?.token;
      if (token) {
        try {
          localStorage.setItem("token", token);
        } catch (e) {
          // ignore storage errors
        }
      }

      // success -> navigate to dashboard (or desired route)
      alert(res?.data?.message || "Verification successful");
      setRegisterStep(1);
      setActiveTab("login");
      router.push("/");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "OTP verification failed"
      );
    } finally {
      setOtpLoading(false);
    }
  };

  // Login handler (password-based)
  const handleLogin = async () => {
    setLoginLoading(true);
    try {
      const { user } = await dispatch(
        loginUser({ email: loginEmail, password: loginPassword })
      ).unwrap();
      toast.success(`Welcome back, ${user.name}!`);
      const token = localStorage.getItem("token");
      if (token) {
        await dispatch(fetchUserProfile()).unwrap();
      }
      router.push("/");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || err?.message || err || "Login failed"
      );
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--muted-background)] p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[var(--background)] rounded-2xl shadow-xl overflow-hidden max-w-6xl w-full">
        {/* Left Section: Image */}
        <div className="hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740"
            alt="Students collaborating"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section: Form */}
        <div className="p-6 sm:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[var(--primary)] mb-6 text-center lg:text-left">
            Welcome to We Won Academy
          </h2>

          {/* Tab Buttons */}
          <div className="flex bg-[var(--muted-background)] rounded-full p-1 mb-8 max-w-sm mx-auto lg:mx-0">
            <button
              onClick={() => {
                setActiveTab("login");
                setRegisterStep(1);
              }}
              className={`flex-1 py-2.5 px-6 rounded-full cursor-pointer text-sm font-semibold transition ${
                activeTab === "login"
                  ? "bg-[var(--primary)] text-white shadow"
                  : "text-[var(--primary)] hover:bg-[var(--light-blue)]"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setActiveTab("register");
                // keep registerStep as-is if switching back to register
              }}
              className={`flex-1 py-2.5 px-6 rounded-full cursor-pointer text-sm font-semibold transition ${
                activeTab === "register"
                  ? "bg-[var(--primary)] text-white shadow"
                  : "text-[var(--primary)] hover:bg-[var(--light-blue)]"
              }`}
            >
              Register
            </button>
          </div>

          <p className="text-[var(--muted-text)] text-sm mb-8 text-center lg:text-left">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>

          {activeTab === "login" ? (
            <LoginForm
              handleLogin={handleLogin}
              email={loginEmail}
              setEmail={setLoginEmail}
              password={loginPassword}
              setPassword={setLoginPassword}
              loading={loginLoading}
            />
          ) : (
            <>
              {registerStep === 1 && (
                <RegisterFormStep1
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  onNext={handleNextStep}
                  loading={loading}
                  error={error}
                />
              )}
              {registerStep === 2 && (
                <OTPForm
                  onSubmit={handleOTPSubmit}
                  loading={otpLoading}
                  onResend={handleResend}
                  resendLoading={resendLoading}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
