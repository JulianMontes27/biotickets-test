"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <div className="absolute top-6 left-0 right-0 z-10">
      <div className="container mx-auto px-6">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/70 transition-all duration-300 w-fit"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Volver</span>
        </Link>
      </div>
    </div>
  );
}
