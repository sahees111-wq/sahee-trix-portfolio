"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, Layers, Printer, Shirt, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { siteConfig } from "@/data/siteConfig";

const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false }
);

export function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % siteConfig.primaryRoles.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  // Keep the first paint light. The decorative 3D scene is loaded only on
  // capable desktop devices after the browser has finished the important UI.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const hasEnoughMemory = !("deviceMemory" in navigator) || (navigator as Navigator & { deviceMemory?: number }).deviceMemory! >= 4;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slowConnection = connection?.saveData || /2g|3g/.test(connection?.effectiveType ?? "");

    if (reduceMotion || coarsePointer || window.innerWidth < 900 || !hasEnoughMemory || slowConnection) return;

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const loadScene = () => setShowScene(true);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(loadScene, { timeout: 4200 });
    } else {
      timeoutId = globalThis.setTimeout(loadScene, 2500);
    }

    return () => {
      if (idleId !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) globalThis.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="fx-animated-section fx-hero-radiance relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden bg-[#060608]">
      {/* 3D Canvas Background */}
      {showScene && <HeroScene />}

      {/* Signature '+' Pattern Overlay from SAHEETRIX Flyer */}
      <div className="absolute inset-0 bg-plus-pattern pointer-events-none opacity-60 z-[2]" />

      {/* Large Crimson Radial Spotlight in Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-red-600/[0.18] rounded-full blur-[180px] pointer-events-none z-[1]" />
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-red-500/[0.12] rounded-full blur-[140px] pointer-events-none z-[1]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[calc(100vh-140px)]">
        {/* LEFT COLUMN: Clean Full Name & Editorial Typography (No Overlap) */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center text-left space-y-6 sm:space-y-7 z-10 pr-0 lg:pr-4">
          {/* Top Brand Pill with Star Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full border border-red-500/40 bg-red-950/40 backdrop-blur-md self-start shadow-[0_0_20px_rgba(229,9,20,0.25)]"
          >
            {/* Origami Star */}
            <div className="w-4 h-4 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                <polygon points="50,5 62,38 95,50 62,62 50,95 38,62 5,50 38,38" fill="#ffffff" />
                <polygon points="50,5 50,50 38,38" fill="#e50914" />
                <polygon points="95,50 50,50 62,62" fill="#990000" />
                <polygon points="50,95 50,50 62,62" fill="#e50914" />
                <polygon points="5,50 50,50 38,38" fill="#730505" />
              </svg>
            </div>
            <span className="font-mono text-[9px] sm:text-xs tracking-[0.12em] sm:tracking-[0.2em] leading-snug text-center uppercase text-red-100 font-bold">
              GRAPHIC DESIGN • WEB DESIGN • SOCIAL MEDIA • MARKETING
            </span>
          </motion.div>

          {/* Full Name Typography */}
          <div className="space-y-1.5">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-red-500 font-extrabold flex items-center gap-2"
            >
              <span>AKA SAHEETRIX</span>
              <span className="h-[2px] w-10 bg-red-500" />
              <span className="text-[10px] text-zinc-400 font-normal hidden sm:inline">WORLD CLASS PRODUCTS</span>
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display font-black tracking-tight leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
            >
              <span className="block text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                THARMARAJA
              </span>
              <span className="block bg-gradient-to-r from-red-500 via-rose-400 to-white bg-clip-text text-transparent glow-red mt-1">
                SAHEEVAN
              </span>
            </motion.h1>
          </div>

          {/* Animated Role Badge Pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="h-9 sm:h-10 px-4 sm:px-5 rounded-xl bg-red-950/60 border border-red-500/50 flex items-center shadow-[0_0_20px_rgba(229,9,20,0.3)] backdrop-blur-md">
              <motion.span
                key={currentRoleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="font-mono text-xs sm:text-sm font-bold tracking-wide text-white uppercase"
              >
                {siteConfig.primaryRoles[currentRoleIndex]}
              </motion.span>
            </div>
            <span className="text-red-400 font-mono text-xs font-bold hidden sm:inline-block">
              // NO: +94 76 200 7356
            </span>
          </motion.div>

          {/* Main Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="border-l-4 border-red-500 pl-4 sm:pl-5 py-1 bg-gradient-to-r from-red-950/20 to-transparent rounded-r-2xl"
          >
            <p className="font-display font-extrabold text-lg sm:text-xl lg:text-2xl text-white tracking-tight leading-snug">
              WORLD CLASS <span className="text-red-500">GRAPHIC DESIGN, WEB &amp; MARKETING</span> FOR{" "}
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                WORLDWIDE BRANDS.
              </span>
            </p>
            <p className="font-sans text-xs sm:text-sm text-zinc-300 mt-1.5 max-w-xl leading-relaxed">
              Transforming creative ideas into high-impact graphic design, responsive websites, social media systems, marketing campaigns, tournament-grade apparel, and precision print production.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"
          >
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-[#ff1a26] via-[#e50914] to-[#990000] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(255,26,38,0.5)] hover:shadow-[0_0_45px_rgba(255,26,38,0.8)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>EXPLORE SELECTED WORK</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href="https://wa.me/94762007356?text=Hi%20Sahee%2C%20I%20would%20like%20to%20hire%20your%20custom%20clothing%20/%20graphic%20design%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-full border border-red-500/40 bg-black/60 text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-red-950/40 hover:border-red-400 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>HIRE ME: +94 76 200 7356</span>
            </a>
          </motion.div>

          {/* Micro Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex items-center gap-5 pt-1 text-[11px] font-mono text-zinc-300"
          >
            <div className="flex items-center gap-1.5">
              <Shirt className="w-3.5 h-3.5 text-red-500" />
              <span>Sublimation &amp; DTF</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-white" />
              <span>Brand Identity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Printer className="w-3.5 h-3.5 text-red-400" />
              <span>RGB + CMYK</span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Official Studio Portrait with 100% Full Unobstructed Face */}
        <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center lg:justify-end relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="fx-neon-border relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[360px] xl:max-w-[390px] rounded-3xl p-1.5 bg-gradient-to-b from-red-500 via-red-900 to-red-950 shadow-[0_0_50px_rgba(229,9,20,0.45)] backdrop-blur-xl group ml-auto flex flex-col"
          >
            {/* Glowing Red Backdrop */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-red-600/60 via-rose-600/40 to-red-900/50 blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative w-full rounded-[20px] overflow-hidden bg-[#060608] border border-red-500/40 flex flex-col">
              {/* Top Registration Badge */}
              <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 opacity-90 font-mono text-[10px] text-red-400 bg-black/70 px-2.5 py-1 rounded-full border border-red-500/40 backdrop-blur-sm shadow-md">
                <span className="registration-mark-red inline-block" />
                <span>SAHEETRIX // CERTIFIED</span>
              </div>

              {/* Unobstructed Photo Viewport - 100% Face, Head, Neck, and Shoulders Fully Visible */}
              <div className="relative w-full aspect-[4/4.6] overflow-hidden bg-[#0a0a0f]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/sahee-portrait.jpg"
                  alt="Tharmaraja Saheevan (SAHEETRIX)"
                  width={780}
                  height={897}
                  sizes="(max-width: 1024px) 88vw, 390px"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-center filter contrast-105 brightness-100 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle rim shadow along bottom edge only */}
                <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#060608] to-transparent pointer-events-none" />
              </div>

              {/* ID Card Tray Placed CLEANLY BENEATH the Photo (Zero Face Overlap) */}
              <div className="relative z-10 p-4 bg-[#0a0a0e] border-t border-red-500/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[10px] uppercase text-emerald-400 font-bold tracking-wider">
                      AVAILABLE TO HIRE &amp; FREELANCE
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 font-medium">SRI LANKA</span>
                </div>

                <div className="flex items-baseline justify-between pt-0.5">
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-white leading-tight">Tharmaraja Saheevan</h3>
                    <p className="font-mono text-[11px] text-red-400 font-semibold mt-0.5">Senior Designer &amp; Apparel Specialist</p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-black text-sm text-white">SAHEETRIX</span>
                  </div>
                </div>

                {/* Red Gradient Bar */}
                <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 mt-2" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-1.5 text-zinc-400 hover:text-red-400 transition-colors group"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-red-500" />
        </a>
      </motion.div>
    </section>
  );
}
