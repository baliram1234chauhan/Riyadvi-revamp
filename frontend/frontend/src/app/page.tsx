"use client";

import HeroGlobe from "@/components/3d/HeroGlobe";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center relative p-6">
      {/* Hero 3D Globe */}
      <div className="w-full h-[400px] max-w-4xl">
        <HeroGlobe />
      </div>

      <div className="text-center z-10 max-w-2xl mt-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-amber-400 mb-4">
          Riyadvi Software Technologies
        </h1>
        <p className="text-slate-300 text-lg mb-8">
          Next-Gen Web, Mobile & 3D Interactive Solutions for Digital Growth.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/business-health-checkup"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition"
          >
            Business Health Checkup
          </Link>
          <Link
            href="/admin"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold rounded-lg transition"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}