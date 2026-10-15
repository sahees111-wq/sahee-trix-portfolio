"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioProjects, Project } from "@/data/portfolioData";
import { ArrowUpRight, Sparkles, Filter, Eye } from "lucide-react";
import { CaseStudyModal } from "./CaseStudyModal";

const CATEGORIES = [
  "ALL",
  "BRANDING",
  "SOCIAL MEDIA",
  "JERSEY DESIGN",
  "PRINTING",
  "PACKAGING",
  "MARKETING",
  "AI CREATIVE",
] as const;

export function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === "ALL"
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="work" className="relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#08080a] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#00e5ff] uppercase tracking-widest font-bold">
                // 03. SELECTED WORK
              </span>
              <div className="h-[1px] w-12 bg-[#00e5ff]/30" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              PROVEN CRAFT. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#00e5ff] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
                HIGH-IMPACT DELIVERABLES.
              </span>
            </h2>
          </div>

          <p className="font-sans text-sm text-zinc-400 max-w-md">
            Click any project to inspect the in-depth case study, challenge analysis, creative strategy, and physical print prepress specs.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "text-[#08080a] font-bold"
                    : "text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBubble"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00e5ff] to-[#8b5cf6]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                onClick={() => setActiveModalProject(project)}
                
                className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Container with Zoom */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading={idx < 2 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#00e5ff] border border-white/10">
                      {project.category}
                    </span>

                    <span className="font-mono text-[11px] text-white/80 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/5">
                      {project.year}
                    </span>
                  </div>

                  {/* Quick View Floating Prompt */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="px-5 py-2.5 rounded-full bg-[#00e5ff] text-[#08080a] font-mono font-bold text-xs flex items-center gap-2 shadow-[0_0_25px_rgba(0,229,255,0.6)] transform translate-y-3 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-4 h-4" />
                      <span>EXPLORE CASE STUDY</span>
                    </div>
                  </div>
                </div>

                {/* Card Content & Details */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-xs text-zinc-300 uppercase">
                      CLIENT: {project.client}
                    </span>
                    <span className="font-mono text-xs text-zinc-300">
                      {project.software.slice(0, 2).join(" • ")}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-white group-hover:text-[#00e5ff] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                    {project.tagline}
                  </p>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.services.slice(0, 2).map((s) => (
                        <span key={s} className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 font-mono text-xs text-[#00e5ff] group-hover:translate-x-1 transition-transform">
                      <span>VIEW</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Full Screen Interactive Case Study Modal */}
      <CaseStudyModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onSelectProject={(p) => setActiveModalProject(p)}
        allProjects={portfolioProjects}
      />
    </section>
  );
}
