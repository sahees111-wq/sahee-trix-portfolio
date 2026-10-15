"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/portfolioData";
import { X, ArrowRight, ArrowLeft, CheckCircle2, Layers, Cpu, Printer, Sparkles, ExternalLink } from "lucide-react";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  allProjects: Project[];
}

export function CaseStudyModal({
  project,
  onClose,
  onSelectProject,
  allProjects,
}: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Find next project
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextIndex = (currentIndex + 1) % allProjects.length;
  const nextProject = allProjects[nextIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#08080a]/90 backdrop-blur-2xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl bg-[#0c0c10] border border-white/10 sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top Bar with Close Button */}
          <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0c0c10]/80 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] font-bold border border-[#00e5ff]/20">
                {project.category}
              </span>
              <span className="font-mono text-xs text-zinc-300">
                // {project.year} • {project.client}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors border border-white/10"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Modal Content */}
          <div className="overflow-y-auto p-6 sm:p-10 space-y-12">
            {/* 01 — HERO BANNER */}
            <div className="space-y-6">
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                {project.title}
              </h1>
              <p className="font-sans text-lg sm:text-xl text-zinc-300 font-light leading-relaxed">
                {project.tagline}
              </p>

              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* 02 — OVERVIEW METRICS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-zinc-900/60 border border-white/5 font-mono text-xs">
              <div>
                <span className="text-zinc-300 uppercase block mb-1">CLIENT</span>
                <span className="text-white font-semibold">{project.client}</span>
              </div>
              <div>
                <span className="text-zinc-300 uppercase block mb-1">TIMELINE</span>
                <span className="text-white font-semibold">{project.year}</span>
              </div>
              <div>
                <span className="text-zinc-300 uppercase block mb-1">SERVICES</span>
                <span className="text-[#00e5ff] font-semibold">{project.services.slice(0, 2).join(", ")}</span>
              </div>
              <div>
                <span className="text-zinc-300 uppercase block mb-1">PRIMARY TOOLS</span>
                <span className="text-[#8b5cf6] font-semibold">{project.software.slice(0, 2).join(", ")}</span>
              </div>
            </div>

            {/* 03 & 04 — CHALLENGE & CREATIVE DIRECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs uppercase tracking-wider font-bold">
                  <span>// 03. THE CHALLENGE</span>
                </div>
                <p className="font-sans text-sm text-zinc-300 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-[#00e5ff] font-mono text-xs uppercase tracking-wider font-bold">
                  <span>// 04. CREATIVE STRATEGY</span>
                </div>
                <p className="font-sans text-sm text-zinc-300 leading-relaxed">
                  {project.creativeDirection}
                </p>
              </div>
            </div>

            {/* 05 — STEP-BY-STEP PROCESS */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#00e5ff] uppercase tracking-widest font-bold">
                  // 05. EXECUTION & PROCESS
                </span>
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.process.map((step, idx) => (
                  <div key={step.title} className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-2">
                    <h4 className="font-display font-bold text-base text-white">
                      {step.title}
                    </h4>
                    <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 06 — GALLERY / VISUAL SHOWCASE */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#8b5cf6] uppercase tracking-widest font-bold">
                    // 06. VISUAL ARTIFACTS
                  </span>
                  <div className="h-[1px] flex-1 bg-white/5" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="space-y-2">
                      <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.url}
                          alt={img.caption}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-mono text-[11px] text-zinc-300 italic px-1">
                        {img.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 07 — PRINT & FACTORY PRODUCTION BREAKDOWN */}
            {project.productionBreakdown && (
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-zinc-900 via-[#101016] to-zinc-900 border border-[#00e5ff]/20 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Printer className="w-5 h-5 text-[#00e5ff]" />
                    <h3 className="font-display font-bold text-lg text-white">
                      PRINT & PREPRESS PRODUCTION PIPELINE
                    </h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="registration-mark scale-75 inline-block" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[#00e5ff] font-bold block mb-1.5">01. DIGITAL ARTWORK</span>
                    <p className="text-zinc-300 font-sans text-xs">{project.productionBreakdown.digitalArtwork}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[#8b5cf6] font-bold block mb-1.5">02. PREPRESS & RIP</span>
                    <p className="text-zinc-300 font-sans text-xs">{project.productionBreakdown.prepress}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[#ec4899] font-bold block mb-1.5">03. PRINT TECHNOLOGY</span>
                    <p className="text-zinc-300 font-sans text-xs">{project.productionBreakdown.printTechnology}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[#10b981] font-bold block mb-1.5">04. PHYSICAL FINISH</span>
                    <p className="text-zinc-300 font-sans text-xs">{project.productionBreakdown.physicalResult}</p>
                  </div>
                </div>
              </div>
            )}

            {/* FINAL RESULT STATEMENT */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                OUTCOME & IMPACT
              </h4>
              <p className="font-sans text-base text-zinc-200">
                {project.finalResult}
              </p>
            </div>

            {/* 08 — NEXT PROJECT SWITCHER */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <button
                onClick={() => {
                  const prevIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
                  onSelectProject(allProjects[prevIndex]);
                }}
                className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                PREVIOUS CASE STUDY
              </button>

              <button
                onClick={() => onSelectProject(nextProject)}
                className="group p-4 px-6 rounded-2xl glass-panel hover:border-[#00e5ff]/40 flex items-center gap-4 transition-all"
              >
                <div className="text-right">
                  <span className="text-[10px] font-mono text-zinc-300 uppercase block">NEXT PROJECT</span>
                  <span className="font-display font-bold text-sm text-white group-hover:text-[#00e5ff] transition-colors">
                    {nextProject.title}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-[#00e5ff] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
