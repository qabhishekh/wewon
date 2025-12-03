"use client";
import AuthForm from "@/components/auth/AuthForm";
import Loader from "@/components/loader/Loader";
import { setLoadingFalse } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { loading, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch()
  const router = useRouter();

  useEffect(() => {
    dispatch(setLoadingFalse())
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <Loader manualLoading={true} />;
  }

  if (isAuthenticated) {
    return <Loader manualLoading={true} />; // briefly show loader during redirect
  }

  // Only show AuthForm when user is NOT logged in
  return (
    <main>
      <AuthForm />
    </main>
  );
}
