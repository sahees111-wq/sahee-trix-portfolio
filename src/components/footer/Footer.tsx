"use client";

import React, { useEffect, useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { ArrowUp, Heart, Sparkles, MessageCircle, Mail, Phone } from "lucide-react";

export function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Colombo",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#050507] border-t border-red-500/20 pt-20 pb-12 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-t from-red-600/10 via-rose-600/5 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Split */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/5">
          <div className="space-y-4">
            {/* Logo + Tagline */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 shrink-0 filter drop-shadow-[0_0_10px_rgba(229,9,20,0.6)]">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                  <polygon points="50,5 62,38 95,50 62,62 50,95 38,62 5,50 38,38" fill="#ffffff" />
                  <polygon points="50,5 50,50 38,38" fill="#e50914" opacity="0.85" />
                  <polygon points="95,50 50,50 62,62" fill="#990000" opacity="0.85" />
                  <polygon points="50,95 50,50 62,62" fill="#e50914" opacity="0.65" />
                  <polygon points="5,50 50,50 38,38" fill="#730505" opacity="0.75" />
                </svg>
              </div>
              <div>
                <span className="font-mono text-xs text-red-500 uppercase tracking-[0.25em] font-bold block">
                  GRAPHIC DESIGNING AND CLOTHING SOLUTIONS
                </span>
                <div className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-wider">
                  SAHEETRIX
                </div>
              </div>
            </div>

            <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest max-w-lg">
              WORLD CLASS PRODUCTS AND SERVICES FOR WORLDWIDE BRANDS
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 font-mono text-xs">
            {/* Direct Official Contact Pill */}
            <div className="p-4 rounded-2xl glass-panel border border-red-500/30 space-y-1">
              <span className="text-zinc-300 block text-[10px]">DIRECT HOTLINE &amp; WHATSAPP</span>
              <a
                href="https://wa.me/94762007356"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-bold text-sm tracking-wider hover:text-red-400 transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>+94 76 200 7356</span>
              </a>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-white/5">
              <span className="text-zinc-300 block text-[10px]">COLOMBO TIME (GMT+5:30)</span>
              <span className="text-white font-bold text-sm tracking-widest">{time || "20:45:00"}</span>
            </div>

            <button
              onClick={scrollToTop}
              className="p-4 rounded-2xl glass-panel hover:border-red-500/40 text-zinc-300 hover:text-white flex items-center gap-2 transition-all group"
            >
              <span>TOP</span>
              <ArrowUp className="w-4 h-4 text-red-500 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Oversized Brand Typography with Red Accents */}
        <div className="w-full select-none text-center overflow-hidden py-4">
          <h1 className="font-display font-extrabold tracking-tighter text-[13vw] leading-none text-zinc-900/90 hover:text-red-950/60 transition-colors">
            SAHEETRIX
          </h1>
        </div>

        {/* Bottom Red Banner: THANK YOU FOR YOUR BUSINESS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-2xl bg-gradient-to-r from-[#990000]/60 via-[#dc141e]/40 to-[#990000]/60 border border-red-500/40 font-mono text-xs text-white">
          <div className="font-bold tracking-wider">
            THANK YOU FOR YOUR BUSINESS • SAHEETRIX
          </div>

          <div className="flex items-center gap-4 text-zinc-300">
            <span>saheetrix@gmail.com</span>
            <span>•</span>
            <span className="text-white font-bold">+94 76 200 7356</span>
          </div>

          <div className="text-[11px] text-zinc-300">
            © {new Date().getFullYear()} Tharmaraja Saheevan.
          </div>
        </div>
      </div>
    </footer>
  );
}