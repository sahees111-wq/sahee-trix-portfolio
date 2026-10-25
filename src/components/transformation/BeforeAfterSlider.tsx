"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, SlidersHorizontal, ArrowLeftRight, Layers, ScanLine, Zap } from "lucide-react";

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
    beforeImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
    description: "Reimagined a legacy corporate identity into a high-octane modular grid system with bespoke geometric typography and 3D kinetic assets.",
  },
  {
    id: "campaign",
    title: "RAW CONCEPT → CAMPAIGN KEY VISUAL",
    category: "AI Concepting & Retouching",
    beforeLabel: "BEFORE (RAW UNGRADED PROTOTYPE)",
    afterLabel: "AFTER (MASTER 8K COLOR GRADED)",
    beforeImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    description: "Transformed flat conceptual prototypes into an ultra-sharp luxury fashion key visual using frequency separation retouching and studio lighting grades.",
  },
  {
    id: "apparel",
    title: "FLAT VECTOR → PRINTED ATHLETIC JERSEY",
    category: "Screen to Physical Manufacturing",
    beforeLabel: "BEFORE (2D FLAT VECTOR ARTWORK)",
    afterLabel: "AFTER (SUBLIMATED FABRIC PRODUCT)",
    beforeImage: "https://images.unsplash.com/photo-1618354691373-d851c5c3c990?q=80&w=1200&auto=format&fit=crop",
    afterImage: "/images/Valkyrie Championship Pro Jersey Showcase.png",
    description: "Bridging 2D vector die-cut patterns into 215°C sublimation heat transfer onto 180 GSM moisture-wicking interlock fabric.",
  },
];

const TRANSFORM_META: Record<string, { source: string; output: string; palette: string; signal: string }> = {
  branding: { source: "ARCHIVE IDENTITY", output: "3D BRAND SYSTEM", palette: "RGB + HEX", signal: "MODULAR GRID" },
  campaign: { source: "RAW CONCEPT", output: "8K KEY VISUAL", palette: "RGB + CMYK", signal: "COLOR GRADE" },
  apparel: { source: "VECTOR MASTER", output: "FABRIC PRODUCT", palette: "CMYK + SPOT", signal: "PRESS READY" },
};

export function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState<string>("branding");
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeItem = COMPARISONS.find((c) => c.id === activeTab) || COMPARISONS[0];
  const activeMeta = TRANSFORM_META[activeItem.id] || TRANSFORM_META.branding;

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
    <section className="fx-animated-section fx-spectrum fx-streak relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#08080a] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 px-1 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00e5ff] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00e5ff]" />
            </span>
            <span>LIVE TRANSFORMATION ENGINE</span>
            <span className="hidden sm:inline text-[#00e5ff]">/ ONLINE</span>
          </div>
          <span>SAHEETRIX // 06</span>
        </div>

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
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-900/80 border border-white/10 self-start shadow-[0_0_25px_rgba(139,92,246,0.12)]">
            <SlidersHorizontal className="w-4 h-4 ml-2 text-[#00e5ff]" />
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
        <div className="glass-panel relative p-3 sm:p-5 lg:p-6 rounded-[2rem] border border-white/10 space-y-6 overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.08)]">
          <div className="absolute -top-32 -right-24 w-80 h-80 rounded-full bg-[#8b5cf6]/10 blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-40 -left-24 w-96 h-96 rounded-full bg-[#00e5ff]/[0.06] blur-[110px] pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 sm:px-3">
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

          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 px-2 sm:px-3">
            {[
              ["SOURCE", activeMeta.source],
              ["OUTPUT", activeMeta.output],
              ["COLOR", activeMeta.palette],
              ["SIGNAL", activeMeta.signal],
            ].map(([label, value], index) => (
              <div key={label} className="rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 hover:border-[#00e5ff]/40 transition-colors">
                <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                  {index === 0 ? <Layers className="w-3 h-3 text-[#8b5cf6]" /> : index === 1 ? <Sparkles className="w-3 h-3 text-[#ec4899]" /> : index === 2 ? <Zap className="w-3 h-3 text-amber-300" /> : <ScanLine className="w-3 h-3 text-[#00e5ff]" />}
                  {label}
                </div>
                <div className="mt-1 truncate font-mono text-[10px] font-bold text-white">{value}</div>
              </div>
            ))}
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
            
            className="relative isolate w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl bg-black ring-1 ring-inset ring-white/5"
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

            <div className="absolute inset-0 z-[5] pointer-events-none opacity-25 mix-blend-screen bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
            <motion.div
              aria-hidden="true"
              animate={{ x: ["-140%", "360%"] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-y-0 left-0 z-[6] w-1/3 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl"
            />
            <div className="absolute top-3 left-3 z-[11] rounded-md border border-white/10 bg-black/50 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-white/70 backdrop-blur-sm">
              INPUT // {activeMeta.source}
            </div>
            <div className="absolute bottom-3 right-3 z-[11] rounded-md border border-[#00e5ff]/20 bg-black/50 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-[#00e5ff] backdrop-blur-sm">
              OUTPUT // {activeMeta.output}
            </div>

            {/* DRAG HANDLE BAR */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00e5ff] via-white to-[#ec4899] shadow-[0_0_18px_rgba(0,229,255,0.9)] z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#08080a] border-2 border-[#00e5ff] text-[#00e5ff] flex items-center justify-center shadow-[0_0_25px_rgba(0,229,255,0.55)]"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 sm:px-3 text-xs font-mono text-zinc-300">
            <span className="flex items-center gap-2 text-zinc-400"><ScanLine className="w-4 h-4 text-[#00e5ff]" /> ← DRAG OR CLICK TO REVEAL BEFORE / AFTER</span>
            <span className="flex items-center gap-2"><span className="text-[10px] uppercase tracking-widest text-zinc-500">LIVE SPLIT</span><span className="rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/10 px-3 py-1 text-[#00e5ff]">{Math.round(sliderPosition)}%</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}
