"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonialsData } from "@/data/experienceData";
import { Quote, Star, ArrowLeft, ArrowRight } from "lucide-react";

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = testimonialsData[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <section className="fx-animated-section fx-pulse-glow fx-streak relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#08080a] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#8b5cf6]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-12">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-[#8b5cf6] uppercase tracking-[0.3em] font-bold">
            // 10. CLIENT ENDORSEMENTS
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
            WORDS FROM DIRECTORS & FOUNDERS
          </h2>
        </div>

        {/* Oversized Editorial Testimonial Card */}
        <div className="relative glass-panel p-8 sm:p-14 rounded-3xl border border-white/10 shadow-2xl">
          <Quote className="w-12 h-12 text-[#00e5ff]/20 mx-auto mb-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <p className="font-display font-medium text-lg sm:text-2xl md:text-3xl text-zinc-100 leading-relaxed italic">
                &ldquo;{current.quote}&rdquo;
              </p>

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="space-y-0.5">
                  <h4 className="font-display font-bold text-lg text-white">
                    {current.clientName}
                  </h4>
                  <p className="font-mono text-xs text-zinc-300">
                    {current.role}, <span className="text-[#00e5ff]">{current.company}</span>
                  </p>
                  <span className="font-mono text-[11px] text-zinc-300 block">
                    PROJECT: {current.project}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-10 pt-6 border-t border-white/5">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors border border-white/10"
              aria-label="Previous Testimonial"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <span className="font-mono text-xs text-zinc-300">
              0{currentIndex + 1} / 0{testimonialsData.length}
            </span>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors border border-white/10"
              aria-label="Next Testimonial"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
