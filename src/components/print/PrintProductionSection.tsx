"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Printer, Gauge, Sliders, ShieldCheck, Check, Cpu, Layers, Sparkles } from "lucide-react";

interface PrintTechItem {
  id: string;
  title: string;
  category: string;
  specs: string;
  description: string;
  keyParameters: { label: string; value: string }[];
  accentColor: string;
}

const PRINT_TECH_LIST: PrintTechItem[] = [
  {
    id: "sublimation",
    title: "DYE-SUBLIMATION PRINTING",
    category: "Apparel & Polyester Fabrics",
    specs: "High-temperature gas infusion at 215°C into synthetic fibers.",
    description: "Gasifies dye directly into polyester fibers creating 100% breathable, permanent prints that never crack, peel, or fade under heavy athletic use.",
    keyParameters: [
      { label: "Ink Chemistry", value: "Aqueous Disperse Dye" },
      { label: "Transfer Temp", value: "210°C - 218°C / 45 sec" },
      { label: "Fabric Match", value: "100% Polyester / Poly-Spandex" },
      { label: "Durability", value: "Permanent Molecular Bond" },
    ],
    accentColor: "#00a4e4",
  },
  {
    id: "dtf",
    title: "DIRECT-TO-FILM (DTF) TECHNOLOGY",
    category: "Multi-Fabric Embellishment & Badging",
    specs: "High-resolution PET film with hot-melt adhesive backing.",
    description: "Enables vibrant, razor-sharp transfers onto cotton, nylon, fleece, and blends with dense opaque white underbases and high stretch elasticity.",
    keyParameters: [
      { label: "Print Heads", value: "Epson i3200-A1 Dual Array" },
      { label: "Adhesive Powder", value: "TPU Thermoplastic Polyurethane" },
      { label: "Heat Press", value: "160°C / 15s Peel / 5s Seal" },
      { label: "Resolution", value: "2400 x 1200 DPI" },
    ],
    accentColor: "#e4007f",
  },
  {
    id: "large-format",
    title: "LARGE FORMAT ECO-SOLVENT & UV",
    category: "Signage, Billboards & POS Displays",
    specs: "Weatherproof solvent & UV-curable grand format output.",
    description: "Engineered for heavy-duty outdoor longevity, architectural hoardings, backlit retail lightboxes, vehicle vinyl wraps, and trade-show backdrops.",
    keyParameters: [
      { label: "Max Width", value: "3.2m Seamless Roll Width" },
      { label: "UV Resistance", value: "3+ Years Outdoor Unlaminated" },
      { label: "Substrates", value: "Flex, Vinyl, Canvas, Backlit Film" },
      { label: "RIP Control", value: "ColorGATE / Onyx Production" },
    ],
    accentColor: "#ffea00",
  },
  {
    id: "prepress-color",
    title: "PREPRESS & RGB + CMYK COLOR MANAGEMENT",
    category: "Spectral Color Calibration & RIP",
    specs: "ICC spectrophotometer profiling for zero color variance.",
    description: "Custom profiling for distinct substrates to eliminate color shift between on-screen sRGB and on-press CMYK + Spot Pantone inks.",
    keyParameters: [
      { label: "Standards", value: "ISO 12647-2 / Fogra 51" },
      { label: "Screening", value: "Hybrid AM/FM Stochastic" },
      { label: "Dot Gain Curve", value: "GCR 40% Undercolor Removal" },
      { label: "Preflight", value: "PDF/X-1a Certified Output" },
    ],
    accentColor: "#10b981",
  },
];

export function PrintProductionSection() {
  const [selectedTech, setSelectedTech] = useState<string>("sublimation");
  const current = PRINT_TECH_LIST.find((t) => t.id === selectedTech) || PRINT_TECH_LIST[0];

  return (
    <section id="print" className="relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#08080a] border-t border-white/5 overflow-hidden">
      {/* Registration marks background decorative accents */}
      <div className="absolute top-12 left-12 opacity-20 hidden md:block">
        <span className="registration-mark inline-block" />
      </div>
      <div className="absolute bottom-12 right-12 opacity-20 hidden md:block">
        <span className="registration-mark inline-block" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#00a4e4] uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Printer className="w-4 h-4" />
                // 05. INDUSTRIAL PRINT ENGINE
              </span>
              <div className="h-[1px] w-12 bg-[#00a4e4]/30" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              DESIGN DOESN&apos;T END <br className="hidden sm:inline" />
              <span className="bg-cmyk-gradient bg-clip-text text-transparent">
                ON THE SCREEN.
              </span>
            </h2>
          </div>

          <p className="font-sans text-sm text-zinc-400 max-w-md">
            With hands-on factory floor management and prepress mastery, I ensure zero surprises between your digital proofs and final manufactured units.
          </p>
        </div>

        {/* CMYK Calibration Color Bar Visual */}
        <div className="mb-10 p-3 rounded-2xl glass-panel flex flex-wrap items-center justify-between gap-4 font-mono text-xs border border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-zinc-300">RGB + CMYK:</span>
            <div className="flex items-center gap-1">
              <span className="w-5 h-5 rounded bg-[#00a4e4] text-[9px] text-white flex items-center justify-center font-bold">C</span>
              <span className="w-5 h-5 rounded bg-[#e4007f] text-[9px] text-white flex items-center justify-center font-bold">M</span>
              <span className="w-5 h-5 rounded bg-[#ffea00] text-[9px] text-black flex items-center justify-center font-bold">Y</span>
              <span className="w-5 h-5 rounded bg-[#1e1e1e] text-[9px] text-white border border-white/20 flex items-center justify-center font-bold">K</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-zinc-400 text-[11px]">
            <span>ICC PROFILES: OK</span>
            <span>BLEED: 3.00mm</span>
            <span>RESOLUTION: 300-2400 DPI</span>
          </div>

          <div className="flex items-center gap-2 text-emerald-400 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>FACTORY CALIBRATED</span>
          </div>
        </div>

        {/* 4 Tech Categories Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {PRINT_TECH_LIST.map((tech) => {
            const isActive = tech.id === selectedTech;
            return (
              <button
                key={tech.id}
                onClick={() => setSelectedTech(tech.id)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 border ${
                  isActive
                    ? "bg-zinc-900 border-[#00a4e4] shadow-[0_0_20px_rgba(0,164,228,0.25)]"
                    : "glass-panel hover:bg-zinc-900/40 border-white/5 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: isActive ? tech.accentColor : "#71717a" }}
                  >
                    {tech.category}
                  </span>
                  {isActive && (
                    <span
                      className="w-2 h-2 rounded-full animate-ping"
                      style={{ backgroundColor: tech.accentColor }}
                    />
                  )}
                </div>

                <h4 className="font-display font-bold text-sm text-white leading-tight">
                  {tech.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Specs for Selected Print Tech */}
        <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs font-mono border border-white/10">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: current.accentColor }} />
              <span className="text-zinc-300">{current.category}</span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
              {current.title}
            </h3>

            <p className="font-sans text-base text-zinc-300 leading-relaxed">
              {current.description}
            </p>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-[#00e5ff] space-y-1">
              <span className="text-zinc-300 uppercase block text-[10px]">PRODUCTION RULE:</span>
              <p className="text-white">{current.specs}</p>
            </div>
          </div>

          {/* Technical Parameter Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {current.keyParameters.map((param, idx) => (
              <div
                key={param.label}
                className="p-5 rounded-2xl bg-zinc-900/70 border border-white/5 space-y-1 group hover:border-[#00e5ff]/30 transition-all"
              >
                <span className="font-mono text-[10px] uppercase text-zinc-300 tracking-wider">
                  PARAMETER 0{idx + 1}
                </span>
                <h5 className="font-mono text-xs text-zinc-300">{param.label}</h5>
                <p className="font-display font-bold text-base text-white group-hover:text-[#00e5ff] transition-colors pt-1">
                  {param.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
