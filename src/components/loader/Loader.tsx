"use client";
import { Loader2, Loader2Icon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const Loader = ({ manualLoading = false }: { manualLoading?: boolean }) => {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  if (!isLoading && !manualLoading) return null;
  return (
    <div className="h-full w-full flex items-center justify-center fixed z-90 flex-col bg-white">
      <Image src={"/logo.svg"} height={100} width={200} alt="" />
      <h2 className="text-2xl font-semibold">We Won Acedemy</h2>
      <Loader2 className="animate-spin mt-4 w-8 h-8" />
    </div>
  );
};

export default Loader;
