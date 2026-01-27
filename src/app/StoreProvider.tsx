"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useEffect } from "react";
import apiClient from "@/hooks/Axios";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Wake up the server
    apiClient.get("/").catch(() => {
      // Ignore errors from wake-up call
    });
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
