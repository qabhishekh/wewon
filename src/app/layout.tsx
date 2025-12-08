import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
// @ts-ignore
import "./globals.css";
import StoreProvider from "./StoreProvider";
import UserInitializer from "./auth/UserInitializer";
import Loader from "@/components/loader/Loader";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "We Won Academy",
  description: "We Won Academy",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <Loader />

        <Toaster position="top-right" richColors />
        <StoreProvider>
          <UserInitializer />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
