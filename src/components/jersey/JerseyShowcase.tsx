"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shirt, Sparkles, Layers, Sliders, CheckCircle2, ArrowRight } from "lucide-react";

interface JerseyStage {
  id: string;
  stepNumber: string;
  name: string;
  shortDesc: string;
  title: string;
  specs: string[];
  imageUrl: string;
  caption: string;
}

const JERSEY_STAGES: JerseyStage[] = [
  {
    id: "stage-1",
    stepNumber: "01",
    name: "FLAT VECTOR ARTWORK",
    shortDesc: "1:1 Precision Seam Grids & Bleed Patterns",
    title: "Digital Vector Master & Spot Separation",
    specs: [
      "100% Scalable Vector Gradients & Seam Matching",
      "Dedicated Spot-Fluorescent Ink Channels",
      "Size-Graded Patterns (XS through 4XL)",
      "3mm Seam Overlap Tolerance",
    ],
    imageUrl: "https://img.magnific.com/psd-premium/mockup-de-camisa-de-futebol-preto-e-dourado-com-opcoes-de-personalizacao_691590-211.jpg?q=80&semt=ais_hybrid&w=1400",
    caption: "High-resolution vector layout showing front, back, collar, and raglan sleeve panels.",
  },
  {
    id: "stage-2",
    stepNumber: "02",
    name: "3D DIGITAL MOCKUP",
    shortDesc: "Fabric Drape & Athletic Tension Simulation",
    title: "Photorealistic 3D Cloth Physics & Fit Review",
    specs: [
      "Simulated on Pro Athlete 3D Body Scan",
      "Dynamic Light Reflections & Sublimation Preview",
      "360° Sponsor Placement Verification",
      "Stitch Tension & Hem Line Inspection",
    ],
    imageUrl: "/images/Valkyrie Championship Pro Jersey Showcase.png",
    caption: "3D parametric drape simulation validating chest sponsor readability and shoulder alignment.",
  },
  {
    id: "stage-3",
    stepNumber: "03",
    name: "FACTORY PRODUCTION",
    shortDesc: "215°C Sublimation Transfer & DTF Badging",
    title: "Sub-surface Dye Infusion & Precision Assembly",
    specs: [
      "High-Speed Epson F-Series Sublimation Inks",
      "215°C Industrial Rotary Heat Calendering",
      "3D Silicone High-Density Heat-Transfer Crests",
      "Flatlock Anti-Chafe Heavy-Duty Stitching",
    ],
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    caption: "Physical heat-press transfer onto 180 GSM moisture-wicking interlock poly-spandex.",
  },
  {
    id: "stage-4",
    stepNumber: "04",
    name: "FINAL ARENA PRODUCT",
    shortDesc: "Worn by Championship Athletes on Global Stage",
    title: "Live Game-Day Execution & Durability",
    specs: [
      "Zero Color Fading After 100+ Commercial Washes",
      "Hydrophilic Breathability & Aerodynamic Fit",
      "Vibrant Stadium Lighting Pop",
      "International Tournament Certified",
    ],
    imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200&auto=format&fit=crop",
    caption: "Final championship kit worn in international arena finals with zero distortion.",
  },
];

export function JerseyShowcase() {
  const [activeStageId, setActiveStageId] = useState<string>("stage-1");
  const currentStage = JERSEY_STAGES.find((s) => s.id === activeStageId) || JERSEY_STAGES[0];

  return (
    <section id="jersey" className="fx-animated-section fx-orbit-drift fx-streak relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#08080a] border-t border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#00e5ff]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#3b82f6]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#3b82f6] uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Shirt className="w-4 h-4" />
                // 04. APPAREL & ATHLETIC TECH
              </span>
              <div className="h-[1px] w-12 bg-[#3b82f6]/30" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              FROM SCREEN <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#00e5ff] via-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">
                TO FABRIC.
              </span>
            </h2>
          </div>

          <p className="font-sans text-sm text-zinc-400 max-w-md">
            Step inside the 4-stage pipeline that takes athletic apparel from a concept vector sketch into a durable, tournament-ready physical jersey.
          </p>
        </div>

        {/* 4-Stage Interactive Selector Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {JERSEY_STAGES.map((stage) => {
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 relative border ${
                  isActive
                    ? "bg-zinc-900/90 border-[#3b82f6] shadow-[0_0_25px_rgba(59,130,246,0.2)]"
                    : "glass-panel hover:bg-zinc-900/40 border-white/5 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold ${isActive ? "text-[#00e5ff]" : "text-zinc-300"}`}>
                    STAGE {stage.stepNumber}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
                  )}
                </div>

                <h4 className="font-display font-bold text-sm text-white leading-snug">
                  {stage.name}
                </h4>
                <p className="font-sans text-[11px] text-zinc-400 mt-1 line-clamp-1">
                  {stage.shortDesc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Stage Comparison Showcase Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel p-6 sm:p-10 rounded-3xl border border-white/10"
          >
            {/* Left Image Visual */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentStage.imageUrl}
                  alt={currentStage.name}
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full ${currentStage.id === "stage-2" ? "object-contain p-3 sm:p-6" : "object-cover"} transition-transform duration-500`}
                />
                <div className="absolute top-4 left-4 font-mono text-xs px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#00e5ff] border border-white/10">
                  STAGE {currentStage.stepNumber} // {currentStage.name}
                </div>
              </div>
              <p className="font-mono text-xs text-zinc-300 italic px-2">
                {currentStage.caption}
              </p>
            </div>

            {/* Right Technical Specs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-[#3b82f6] uppercase tracking-wider font-bold">
                  TECHNICAL PIPELINE
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
                  {currentStage.title}
                </h3>
                <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                  {currentStage.shortDesc}
                </p>
              </div>

              {/* Spec Checklist */}
              <div className="space-y-3 pt-2">
                {currentStage.specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                    <span className="font-sans text-xs text-zinc-200 leading-relaxed">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stage Progress Indicator */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-300">
                  COMPLETE PRODUCTION FLOW
                </span>
                <div className="flex items-center gap-1.5 font-mono text-xs text-[#00e5ff]">
                  <span>STEP {currentStage.stepNumber} OF 04</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
