"use client";

import React from "react";
import { clientsData } from "@/data/experienceData";

export function ClientMarquee() {
  const repeatedClients = [...clientsData, ...clientsData, ...clientsData];

  return (
    <section className="fx-animated-section fx-marquee-glow relative w-full py-20 bg-[#08080a] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-8 flex flex-col items-center text-center">
        <span className="font-mono text-xs text-[#00e5ff] uppercase tracking-[0.3em] font-bold">
          // 09. BRANDS & COLLABORATORS
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-2">
          TRUSTED TO CREATE.
        </h2>
      </div>

      {/* Marquee Track with gradient fade edges */}
      <div className="relative w-full overflow-hidden group">
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#08080a] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#08080a] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee-scroll hover:[animation-play-state:paused] gap-6 py-4">
          {repeatedClients.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex items-center gap-3 px-8 py-4 rounded-2xl glass-panel border border-white/5 hover:border-white/20 transition-all duration-300 group/item cursor-pointer"
            >
              <div
                className="w-2.5 h-2.5 rounded-full filter grayscale group-hover/item:grayscale-0 transition-all"
                style={{ backgroundColor: client.accent }}
              />
              <div>
                <span className="font-display font-bold text-sm sm:text-base text-zinc-400 group-hover/item:text-white transition-colors tracking-wide">
                  {client.name}
                </span>
                <span className="block font-mono text-[10px] text-zinc-300">
                  {client.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
