"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<"sahee" | "trix" | "tagline" | "exit">("sahee");

  useEffect(() => {
    // Progress counter
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 28);

    // Staged typography reveals
    const trixTimer = setTimeout(() => setStage("trix"), 600);
    const taglineTimer = setTimeout(() => setStage("tagline"), 1200);
    const exitTimer = setTimeout(() => {
      setStage("exit");
      setTimeout(onComplete, 800);
    }, 2400);

    return () => {
      clearInterval(timer);
      clearTimeout(trixTimer);
      clearTimeout(taglineTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== "exit" && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -60, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-[#08080a] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
        >
          {/* Subtle background ambient light */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#00e5ff]/10 via-[#8b5cf6]/10 to-transparent blur-[120px] pointer-events-none" />

          {/* Registration marks at corners for print vibe */}
          <div className="absolute top-8 left-8 flex items-center gap-2 opacity-30 text-[10px] font-mono">
            <span className="registration-mark inline-block" />
            <span>CAL_001 / RGB_TO_CMYK</span>
          </div>
          <div className="absolute bottom-8 right-8 flex items-center gap-2 opacity-30 text-[10px] font-mono">
            <span>DPI: 300 // RASTER_OK</span>
            <span className="registration-mark inline-block" />
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-xl text-center">
            {/* Main Brand Reveal */}
            <div className="flex items-center gap-3 sm:gap-6 font-display font-extrabold tracking-tighter text-5xl sm:text-7xl md:text-8xl">
              {/* SAHEE */}
              <div className="overflow-hidden inline-flex">
                <motion.span
                  initial={{ y: "110%", rotateX: 45 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
                >
                  SAHEE
                </motion.span>
              </div>

              {/* TRIX */}
              <div className="overflow-hidden inline-flex">
                <motion.span
                  initial={{ y: "110%", rotateX: 45 }}
                  animate={stage !== "sahee" ? { y: 0, rotateX: 0 } : { y: "110%" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-gradient-to-r from-[#00e5ff] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,229,255,0.4)]"
                >
                  TRIX
                </motion.span>
              </div>
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={stage === "tagline" ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5 }}
              className="mt-6 font-mono text-xs sm:text-sm tracking-[0.35em] text-zinc-400 uppercase font-medium flex items-center gap-3"
            >
              <span>DESIGN</span>
              <span className="text-[#00e5ff]">•</span>
              <span>PRINT</span>
              <span className="text-[#8b5cf6]">•</span>
              <span>CREATE</span>
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 sm:w-64 h-[2px] bg-zinc-800 rounded-full mt-10 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00e5ff] via-[#8b5cf6] to-[#00e5ff] bg-[length:200%_100%] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Percentage */}
            <span className="font-mono text-[11px] text-zinc-400 mt-2">
              {progress}%
            </span>
          </div>

          {/* Quick Skip button */}
          <button
            onClick={() => {
              setStage("exit");
              setTimeout(onComplete, 200);
            }}
            className="absolute bottom-6 font-mono text-[10px] tracking-widest text-zinc-400 hover:text-zinc-400 transition-colors uppercase py-1 px-3 border border-zinc-800 rounded-full hover:border-zinc-700"
          >
            Skip Intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
