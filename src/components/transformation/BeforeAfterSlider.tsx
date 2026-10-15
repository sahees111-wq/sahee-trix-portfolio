"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, SlidersHorizontal, ArrowLeftRight, Layers } from "lucide-react";

interface ComparisonItem {
  id: string;
  title: string;
  category: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

const COMPARISONS: ComparisonItem[] = [
  {
    id: "branding",
    title: "BRAND IDENTITY EVOLUTION",
    category: "Corporate Rebrand & Modernization",
    beforeLabel: "BEFORE (OUTDATED 2020 IDENTITY)",
    afterLabel: "AFTER (SAHEE TRIX 3D SYSTEM)",
    beforeImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
    description: "Reimagined a legacy corporate identity into a high-octane modular grid system with bespoke geometric typography and 3D kinetic assets.",
  },
  {
    id: "campaign",
    title: "RAW CONCEPT → CAMPAIGN KEY VISUAL",
    category: "AI Concepting & Retouching",
    beforeLabel: "BEFORE (RAW UNGRADED PROTOTYPE)",
    afterLabel: "AFTER (MASTER 8K COLOR GRADED)",
    beforeImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    description: "Transformed flat conceptual prototypes into an ultra-sharp luxury fashion key visual using frequency separation retouching and studio lighting grades.",
  },
  {
    id: "apparel",
    title: "FLAT VECTOR → PRINTED ATHLETIC JERSEY",
    category: "Screen to Physical Manufacturing",
    beforeLabel: "BEFORE (2D FLAT VECTOR ARTWORK)",
    afterLabel: "AFTER (SUBLIMATED FABRIC PRODUCT)",
    beforeImage: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop",
    description: "Bridging 2D vector die-cut patterns into 215°C sublimation heat transfer onto 180 GSM moisture-wicking interlock fabric.",
  },
];

export function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState<string>("branding");
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = COMPARISONS.find((c) => c.id === activeTab) || COMPARISONS[0];

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#08080a] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#8b5cf6] uppercase tracking-widest font-bold flex items-center gap-1.5">
                <ArrowLeftRight className="w-4 h-4" />
                // 06. TRANSFORMATION BENCHMARK
              </span>
              <div className="h-[1px] w-12 bg-[#8b5cf6]/30" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              BEFORE & AFTER <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#00e5ff] bg-clip-text text-transparent">
                VISUAL MASTERY.
              </span>
            </h2>
          </div>

          {/* Switcher tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-zinc-900/80 border border-white/10 self-start">
            {COMPARISONS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase transition-all duration-300 ${
                  activeTab === item.id
                    ? "bg-[#8b5cf6] text-white font-bold shadow-lg"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {item.id}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Container */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-[#8b5cf6] uppercase font-bold">
                {activeItem.category}
              </span>
              <h3 className="font-display font-bold text-2xl text-white">
                {activeItem.title}
              </h3>
            </div>
            <p className="font-sans text-xs text-zinc-400 max-w-md">
              {activeItem.description}
            </p>
          </div>

          {/* Draggable Dual View Canvas */}
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onClick={(e) => handleMove(e.clientX)}
            
            className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl bg-black"
          >
            {/* AFTER IMAGE (Background / Full Width) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeItem.afterImage}
              alt={activeItem.afterLabel}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 font-mono text-[10px] sm:text-xs px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#00e5ff] border border-[#00e5ff]/30 font-bold z-10">
              {activeItem.afterLabel}
            </div>

            {/* BEFORE IMAGE (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeItem.beforeImage}
                alt={activeItem.beforeLabel}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%",
                  maxWidth: "none",
                }}
              />
              <div className="absolute top-4 left-4 font-mono text-[10px] sm:text-xs px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-zinc-300 border border-white/20 font-bold z-10">
                {activeItem.beforeLabel}
              </div>
            </div>

            {/* DRAG HANDLE BAR */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#08080a] border-2 border-[#00e5ff] text-[#00e5ff] flex items-center justify-center shadow-2xl">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
            <span>← DRAG OR CLICK TO REVEAL BEFORE / AFTER</span>
            <span>SPLIT: {Math.round(sliderPosition)}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
