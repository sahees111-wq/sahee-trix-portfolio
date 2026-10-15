"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { CheckCircle2, Award, Zap, Compass, Cpu, Palette } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="fx-animated-section fx-spectrum fx-streak relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#08080a] border-t border-white/5 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#00e5ff]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-96 h-96 bg-[#8b5cf6]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-[#00e5ff] uppercase tracking-widest font-bold">
            // 01. PHILOSOPHY & IDENTITY
          </span>
          <div className="h-[1px] w-12 bg-[#00e5ff]/30" />
        </div>

        {/* Large Editorial Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] max-w-5xl"
        >
          DESIGN IS MORE THAN WHAT YOU SEE.{" "}
          <span className="bg-gradient-to-r from-[#00e5ff] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
            IT&apos;S WHAT YOU EXPERIENCE.
          </span>
        </motion.h2>

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-16 items-start">
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-sans text-lg sm:text-xl text-zinc-200 leading-relaxed font-light"
            >
              I am <strong className="text-white font-semibold">Tharmaraja Saheevan</strong>, known in the creative industry as <strong className="text-[#00e5ff] font-semibold">SAHEE TRIX</strong>. I operate at the rare convergence of artistic intuition and physical industrial production.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed"
            >
              Most designers deliver flat digital files and hope for the best at the printing house. Having managed commercial printing floors, large-format sublimation presses, DTF printers, and prepress RIP systems, I engineer artwork across accurate RGB and CMYK color workflows, ink dot gain, bleed allowances, and fabric stretch dynamics.
            </motion.p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-[#00e5ff]/30 transition-all">
                <div className="flex items-center gap-3 text-white font-display font-bold text-base mb-1">
                  <Palette className="w-5 h-5 text-[#00e5ff]" />
                  <span>Creative Thinking</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Deep visual storytelling, branding identity systems, and avant-garde aesthetic direction.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-[#8b5cf6]/30 transition-all">
                <div className="flex items-center gap-3 text-white font-display font-bold text-base mb-1">
                  <Cpu className="w-5 h-5 text-[#8b5cf6]" />
                  <span>Technical Production</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Sublimation printing, prepress RIP profiles, dieline engineering, and press-floor quality control.
                </p>
              </div>
            </div>

            {/* AI Advantage */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#00e5ff]/5 via-[#8b5cf6]/5 to-transparent border border-white/10 flex items-start gap-4">
              <Zap className="w-6 h-6 text-[#00e5ff] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-display font-bold text-sm text-white">AI-Powered Next-Gen Velocity</h4>
                <p className="font-sans text-xs text-zinc-400 mt-1 leading-relaxed">
                  Integrating customized generative AI workflows for rapid moodboarding, photorealistic background synthesis, and 8K print texture upscaling without sacrificing vector precision.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Stats & Metric Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {siteConfig.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between aspect-square group"
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-zinc-300">0{index + 1}</span>
                  <div className="w-2 h-2 rounded-full bg-[#00e5ff] opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                </div>

                <div>
                  <div className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white group-hover:text-[#00e5ff] transition-colors tracking-tight">
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider mt-2 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
