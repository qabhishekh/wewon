// components/AuthForm.jsx
"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterFormStep1 from "./RegisterFormStep1";
import RegisterFormStep2 from "./RegisterFormStep2";

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState("login"); // 'login' or 'register'
  const [registerStep, setRegisterStep] = useState(1); // 1 or 2 for registration

  const handleNextStep = () => {
    setRegisterStep((prev) => prev + 1);
  };

  const handleRegisterSubmit = () => {
    alert("Registration Complete!");
    setRegisterStep(1); // Reset to first step after submission
    setActiveTab("login"); // Optionally switch to login after successful registration
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--muted-background)] p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-[var(--background)] rounded-2xl shadow-xl overflow-hidden max-w-6xl w-full">
        {/* Left Section: Image */}
        <div className="hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740" // Replace with your image path
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
                setRegisterStep(1); // Reset register step if switching back
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
              onClick={() => setActiveTab("register")}
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
            <LoginForm />
          ) : (
            <>
              {registerStep === 1 && <RegisterFormStep1 onNext={handleNextStep} />}
              {registerStep === 2 && (
                <RegisterFormStep2 onSubmit={handleRegisterSubmit} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}