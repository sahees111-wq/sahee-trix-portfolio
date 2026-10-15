"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData, ServiceItem } from "@/data/servicesData";
import { ArrowUpRight, Check, Sparkles, Layers, Box, Shirt, Printer, Share2, Megaphone } from "lucide-react";

export function ServicesSection() {
  const [activeService, setActiveService] = useState<string | null>(servicesData[0].id);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case "graphic-design": return <Layers className="w-5 h-5 text-[#00e5ff]" />;
      case "brand-identity": return <Sparkles className="w-5 h-5 text-[#8b5cf6]" />;
      case "social-media": return <Share2 className="w-5 h-5 text-[#ec4899]" />;
      case "jersey-apparel": return <Shirt className="w-5 h-5 text-[#3b82f6]" />;
      case "print-production": return <Printer className="w-5 h-5 text-[#00a4e4]" />;
      case "packaging": return <Box className="w-5 h-5 text-[#f59e0b]" />;
      case "marketing": return <Megaphone className="w-5 h-5 text-[#10b981]" />;
      case "ai-creative-solutions": return <Sparkles className="w-5 h-5 text-[#a855f7]" />;
      default: return <Layers className="w-5 h-5 text-[#00e5ff]" />;
    }
  };

  return (
    <section id="services" className="relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#08080a] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#00e5ff] uppercase tracking-widest font-bold">
                // 02. WHAT I DO
              </span>
              <div className="h-[1px] w-12 bg-[#00e5ff]/30" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              SPECIALIZED CREATIVE <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#00e5ff] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
                CAPABILITIES & SOLUTIONS
              </span>
            </h2>
          </div>
          <p className="font-sans text-sm text-zinc-400 max-w-md">
            From strategic visual brand systems to factory-floor print calibration and next-gen generative AI solutions.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicesData.map((service, index) => {
            const isHovered = activeService === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onMouseEnter={() => setActiveService(service.id)}
                className="group relative p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between min-h-[340px] cursor-pointer overflow-hidden transition-all duration-500"
              >
                {/* Glow backdrop on hover */}
                <div
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: service.accentColor }}
                />

                {/* Top Bar: Number, Badge, Icon */}
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xl font-bold text-zinc-300 group-hover:text-white transition-colors">
                      {service.number}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider bg-white/5 text-zinc-400 border border-white/5">
                      {service.badge}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                    {getServiceIcon(service.id)}
                  </div>
                </div>

                {/* Middle: Title & Tagline */}
                <div className="relative z-10 space-y-2 my-auto py-4">
                  <h3 className="font-display font-extrabold text-xl text-white group-hover:text-[#00e5ff] transition-colors leading-tight">
                    {service.title}
                  </h3>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {service.tagline}
                  </p>
                </div>

                {/* Bottom: Deliverables preview & animated arrow */}
                <div className="relative z-10 pt-3 border-t border-white/5 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {service.deliverables.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-zinc-400 border border-white/5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-300 group-hover:text-white transition-colors">
                    <span>{service.tools.slice(0, 2).join(" • ")}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#00e5ff] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
