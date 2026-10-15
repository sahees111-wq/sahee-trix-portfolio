"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { skillsData, SkillTool } from "@/data/skillsData";
import { PenTool, Image, BookOpen, Film, Video, Layers, Sparkles, Zap, Wrench, CheckCircle2 } from "lucide-react";

export function SkillsGrid() {
  const [activeTool, setActiveTool] = useState<SkillTool | null>(skillsData[0]);

  const getToolIcon = (name: string) => {
    switch (name) {
      case "PenTool": return <PenTool className="w-6 h-6" />;
      case "Image": return <Image className="w-6 h-6" />;
      case "BookOpen": return <BookOpen className="w-6 h-6" />;
      case "Film": return <Film className="w-6 h-6" />;
      case "Video": return <Video className="w-6 h-6" />;
      case "Layers": return <Layers className="w-6 h-6" />;
      case "Sparkles": return <Sparkles className="w-6 h-6" />;
      case "Zap": return <Zap className="w-6 h-6" />;
      default: return <Wrench className="w-6 h-6" />;
    }
  };

  return (
    <section className="fx-animated-section fx-pulse-glow fx-streak relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#08080a] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#00e5ff] uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Wrench className="w-4 h-4" />
                // 07. TOOL MATRIX & WORKFLOWS
              </span>
              <div className="h-[1px] w-12 bg-[#00e5ff]/30" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              TOOLS CHANGE. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#00e5ff] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
                CREATIVITY EVOLVES.
              </span>
            </h2>
          </div>

          <p className="font-sans text-sm text-zinc-400 max-w-md">
            No meaningless percentage bars. Click or hover any software to inspect the exact production role and factory capabilities I deploy.
          </p>
        </div>

        {/* Interactive Grid & Detail Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tools Grid (Left 8 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 gap-4">
            {skillsData.map((tool) => {
              const isSelected = activeTool?.id === tool.id;

              return (
                <div
                  key={tool.id}
                  onClick={() => setActiveTool(tool)}
                  onMouseEnter={() => setActiveTool(tool)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border flex flex-col justify-between min-h-[160px] ${
                    isSelected
                      ? "bg-zinc-900 border-[#00e5ff] shadow-[0_0_25px_rgba(0,229,255,0.2)]"
                      : "glass-panel hover:bg-zinc-900/50 border-white/5 opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="p-3 rounded-xl border border-white/10"
                      style={{
                        backgroundColor: `${tool.accentColor}15`,
                        color: tool.accentColor,
                      }}
                    >
                      {getToolIcon(tool.iconName)}
                    </div>
                    <span className="font-mono text-[10px] uppercase px-2.5 py-1 rounded-full bg-white/5 text-zinc-300 border border-white/5">
                      {tool.proficiencyLevel}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-white mt-3">
                      {tool.name}
                    </h3>
                    <p className="font-mono text-[10px] text-zinc-300 mt-0.5">
                      {tool.category}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Tool Deep Inspection Card (Right 5 Cols) */}
          {activeTool && (
            <motion.div
              key={activeTool.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-panel border border-[#00e5ff]/30 space-y-6 sticky top-28"
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full border"
                  style={{
                    color: activeTool.accentColor,
                    borderColor: `${activeTool.accentColor}40`,
                    backgroundColor: `${activeTool.accentColor}15`,
                  }}
                >
                  {activeTool.category}
                </span>
                <span className="font-mono text-xs text-zinc-300">
                  // {activeTool.proficiencyLevel.toUpperCase()} LEVEL
                </span>
              </div>

              <div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  {activeTool.name}
                </h3>
                <p className="font-sans text-sm text-zinc-300 italic mt-1">
                  &ldquo;{activeTool.tagline}&rdquo;
                </p>
              </div>

              {/* Real World Production Role */}
              <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-1.5">
                <span className="font-mono text-[10px] uppercase text-[#00e5ff] font-bold tracking-wider">
                  REAL-WORLD PRODUCTION APPLICATION
                </span>
                <p className="font-sans text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  {activeTool.productionUse}
                </p>
              </div>

              {/* Core Capabilities */}
              <div className="space-y-2">
                <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider block">
                  KEY DELIVERABLE CAPABILITIES:
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {activeTool.capabilities.map((cap) => (
                    <div key={cap} className="flex items-center gap-2 text-xs font-sans text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00e5ff] shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
