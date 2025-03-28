"use client";
import RedRectangle from "@/components/red-rectangle";
import ShimmerButton from "@/components/magicui/shimmer-button";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="relative h-screen w-screen bg-red-500 flex overflow-hidden">
      <RedRectangle />
      <div className="w-3/5 h-screen bg-white pt-10 pl-10 pr-10 absolute top-40 right-10 shadow-2xl flex flex-col items-center justify-center">
        <div
          className={`flex flex-col items-center transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-3xl font-bold mb-10 text-center">
            Que voulez-vous calculer?
          </h1>

          <div className="flex flex-col md:flex-row gap-8 w-full max-w-2xl justify-center">
            <Link href="/gpa" className="w-full md:w-1/2">
              <ShimmerButton className="w-full py-8 h-auto">
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold mb-2">
                    Calculer ma cote
                  </span>
                </div>
              </ShimmerButton>
            </Link>

            <Link href="/grade-calculator" className="w-full md:w-1/2">
              <ShimmerButton className="w-full py-8 h-auto">
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold mb-2">
                    Note minimale requise
                  </span>
                </div>
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
