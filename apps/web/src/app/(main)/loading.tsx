"use client";

import { Loader } from "@/components/shared/Loader";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <Loader />
    </div>
  );
}
