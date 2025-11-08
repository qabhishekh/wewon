"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { fetchUserProfile } from "@/store/auth/authThunk";

export default function UserInitializer() {
  const dispatch = useAppDispatch();

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await dispatch(fetchUserProfile()).unwrap();
    }
  };
  useEffect(() => {
    getUser();
  }, [dispatch]);

  return null; // nothing to render
}
