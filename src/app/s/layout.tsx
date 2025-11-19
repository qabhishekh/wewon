"use client";
import Loader from "@/components/loader/Loader";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAppSelector } from "@/store/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WebpageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading, user } = useAppSelector(
    (state) => state.auth
  );
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (loading) return; // wait for auth to finish

    if (!isAuthenticated) {
      router.replace("/auth");
      return;
    }

    // If user is authenticated, check role and redirect
    const role = user?.userId?.role;

    if (role === "student") {
      // If already on /s or inside it, do nothing
      if (!path.startsWith("/s")) router.replace("/s");
    } else if (role === "counsellor") {
      // Redirect to /c or same path under /c
      if (!path.startsWith("/c")) {
        const subPath = path.split("/").slice(2).join("/"); // remove role prefix if any
        router.replace(`/c/${subPath}`);
      }
    } else if (role === "admin") {
      // Redirect admins to external URL
      window.location.href = "https://www.youtube.com";
    }
  }, [isAuthenticated, loading, user, path, router]);

  if (loading) {
    return <Loader manualLoading={true} />;
  }

  if (!isAuthenticated) {
    return <Loader manualLoading={true} />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      {children}
    </SidebarProvider>
  );
}
