"use client";

import React from "react";
import { motion } from "framer-motion";
import { experienceData } from "@/data/experienceData";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#08080a] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#00e5ff] uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" />
                // 08. PRODUCTION HISTORY & ROLES
              </span>
              <div className="h-[1px] w-12 bg-[#00e5ff]/30" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              PROVEN TRACK RECORD. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#00e5ff] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
                PRODUCTION JOURNEY.
              </span>
            </h2>
          </div>

          <p className="font-sans text-sm text-zinc-400 max-w-md">
            Over 3 years of continuous evolution across design studios, commercial printing factories, and global freelance contracts.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-zinc-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experienceData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-[#08080a] border-2 border-[#00e5ff] flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                <div className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-3xl glass-panel glass-panel-hover border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] font-bold border border-[#00e5ff]/20">
                      {item.type}
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {item.role}
                    </h3>
                  </div>

                  <div className="flex flex-col sm:items-end font-mono text-xs text-zinc-300">
                    <span className="text-white font-semibold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#00e5ff]" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1 text-zinc-300">
                      <MapPin className="w-3 h-3 text-zinc-300" />
                      {item.company} • {item.location}
                    </span>
                  </div>
                </div>

                <p className="font-sans text-sm text-zinc-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Key Accomplishments */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <span className="font-mono text-[11px] text-[#00e5ff] uppercase tracking-wider block">
                    KEY ACHIEVEMENTS:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-sans text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.skills.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
