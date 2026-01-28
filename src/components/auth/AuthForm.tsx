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
  const [phone, setPhone] = useState("");

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
        phone,
      });
      // server should respond with message "OTP sent..."
      setRegisterStep(2);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Registration request failed",
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
        phone,
      });
      // keep user on OTP step; show a small notice (alert used for brevity)
      toast.success("OTP resent to your email");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || err?.message || "Resend failed",
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
      toast.success(res?.data?.message || "Verification successful");
      setRegisterStep(1);
      setActiveTab("login");
      router.push("/");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "OTP verification failed",
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
        loginUser({ email: loginEmail, password: loginPassword }),
      ).unwrap();
      toast.success(`Welcome back, ${user.name}!`);
      const token = localStorage.getItem("token");
      if (token) {
        await dispatch(fetchUserProfile()).unwrap();
      }
      router.push("/");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || err?.message || err || "Login failed",
      );
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden max-w-[1200px] w-full min-h-[600px]">
        {/* Left Section: Image with Overlay */}
        <div className="hidden lg:block relative overflow-hidden bg-blue-50/50">
          <div className="absolute inset-0 w-full h-full flex items-center justify-center p-12">
            <img
              src={
                activeTab === "login" ? "/auth/login.png" : "/auth/register.png"
              }
              alt={activeTab === "login" ? "Login" : "Register"}
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>

          {/* subtle overlay to ensure text contrast if we ever add text over image */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" /> */}
        </div>

        {/* Right Section: Form */}
        <div className="p-8 sm:p-12 xl:p-16 flex flex-col justify-center bg-white relative">
          {/* Header Content with Animation */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--primary)] mb-3 text-center lg:text-left tracking-tight">
              {activeTab === "register" ? "Start your journey" : "Welcome Back"}
              <span className="block text-black font-normal mt-1">
                to COLLEGES KHOJO
              </span>
            </h2>
            <p className="text-sm font-medium text-gray-400 mb-8 text-center lg:text-left uppercase tracking-wider">
              Associated with We Won Academy
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-gray-100/80 rounded-2xl p-1.5 mb-10 max-w-sm mx-auto lg:mx-0 relative">
            <button
              onClick={() => {
                setActiveTab("login");
                setRegisterStep(1);
              }}
              className={`flex-1 py-3 px-6 rounded-xl cursor-pointer text-sm font-bold transition-colors z-10 relative ${
                activeTab === "login"
                  ? "bg-white shadow-sm text-[var(--primary)]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setActiveTab("register");
              }}
              className={`flex-1 py-3 px-6 rounded-xl cursor-pointer text-sm font-bold transition-colors z-10 relative ${
                activeTab === "register"
                  ? "bg-white shadow-sm text-[var(--primary)]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Register
            </button>
          </div>

          <p className="text-gray-600 text-sm md:text-base mb-8 text-center lg:text-left leading-relaxed max-w-md mx-auto lg:mx-0">
            {activeTab === "register" ? (
              <>
                Register now to get expert college counselling, personalized
                guidance, and the right direction for your future.
                <br className="hidden sm:block" />
                Your dream college starts here.
              </>
            ) : (
              <>
                Log in to continue your college counselling journey.
                <br className="hidden sm:block" />
                Get personalized guidance, college insights, and expert support
                — all in one place.
              </>
            )}
          </p>

          <div className="relative min-h-[300px]">
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
              <div>
                {registerStep === 1 && (
                  <RegisterFormStep1
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    phone={phone}
                    setPhone={setPhone}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
