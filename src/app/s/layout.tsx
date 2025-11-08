"use client";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

export default function WebpageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  const route = useRouter();
  console.log({isAuthenticated});
  console.log({loading});

  if (loading) {
    return null;
  }
  

  if (!isAuthenticated) {
    setTimeout(() => {
      route.replace("/auth");
    }, 1000);
    return null;
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />

        <SidebarTrigger />
        {children}
      </SidebarProvider>
    </>
  );
}
