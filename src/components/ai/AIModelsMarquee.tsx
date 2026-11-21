"use client";

import Image from "next/image";
import { aiTools } from "@/data/aiToolsData";

export function AIModelsMarquee() {
  return (
    <section id="ai-tools" aria-labelledby="ai-specialist-title" className="ai-specialist-section relative w-full overflow-hidden border-t border-white/5 bg-[#08080a] py-20 sm:py-24">
      <div className="mx-auto mb-10 flex max-w-7xl flex-col gap-5 px-4 sm:px-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div className="max-w-3xl">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-red-400">// AI SPECIALIST</span>
            <span className="h-px w-12 bg-red-500/40" />
          </div>
          <h2 id="ai-specialist-title" className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            AI MODELS. <span className="text-red-500">CREATIVE POWER.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            A curated AI toolkit spanning language, research, image, video, voice, music and coding workflows.
          </p>
        </div>
        <span className="w-fit rounded-full border border-red-500/25 bg-red-500/[0.07] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-red-300">
          {aiTools.length} + AI PLATFORMS &amp; MODELS
        </span>
      </div>

      <div className="ai-model-marquee-viewport" role="region" aria-label="AI model and creative platform logos">
        <div className="ai-model-marquee-track" role="list">
          {aiTools.map((tool) => (
            <div key={tool.name} className="ai-model-card" role="listitem">
              <span className="ai-model-logo-tile">
                <Image src={tool.logo} alt={tool.name + " logo"} width={38} height={38} unoptimized />
              </span>
              <span className="min-w-0">
                <span className="ai-model-name">{tool.name}</span>
                <span className="ai-model-category">{tool.category}</span>
              </span>
            </div>
          ))}
          {aiTools.map((tool) => (
            <div key={tool.name + "-duplicate"} className="ai-model-card" role="listitem" aria-hidden="true">
              <span className="ai-model-logo-tile">
                <Image src={tool.logo} alt="" aria-hidden="true" width={38} height={38} unoptimized />
              </span>
              <span className="min-w-0">
                <span className="ai-model-name">{tool.name}</span>
                <span className="ai-model-category">{tool.category}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-5 max-w-7xl px-4 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600 sm:px-6 lg:px-12">
        AI ecosystem snapshot • Models and tools evolve continuously • Brand marks identify their respective owners
      </p>
    </section>
  );
}
