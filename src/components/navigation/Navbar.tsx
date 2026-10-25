"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { Menu, X, ArrowUpRight, MessageCircle } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
          scrolled ? "py-3 px-4 sm:px-6" : "py-6 px-6 sm:px-12"
        }`}
      >
        <nav
          className={`w-full max-w-7xl flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "px-6 py-3 rounded-full bg-[#101014]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
              : "bg-transparent"
          }`}
        >
          {/* Left: Star Geometric Logo + Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            {/* Origami 4-point Star Logo */}
            <div className="w-8 h-8 shrink-0 filter drop-shadow-[0_0_8px_rgba(229,9,20,0.6)] group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                <polygon points="50,5 62,38 95,50 62,62 50,95 38,62 5,50 38,38" fill="#ffffff" />
                <polygon points="50,5 50,50 38,38" fill="#e50914" opacity="0.85" />
                <polygon points="95,50 50,50 62,62" fill="#990000" opacity="0.85" />
                <polygon points="50,95 50,50 62,62" fill="#e50914" opacity="0.65" />
                <polygon points="5,50 50,50 38,38" fill="#730505" opacity="0.75" />
              </svg>
            </div>

            <div>
              <div className="font-display font-extrabold tracking-tight text-lg text-white leading-none">
                <span>SAHEETRIX</span>
              </div>
              <span className="font-mono text-[8px] text-zinc-300 uppercase tracking-wider block mt-0.5">
                CLOTHING &amp; DESIGN
              </span>
            </div>
          </a>

          {/* Center: Desktop Nav Links */
          <div className="hidden md:flex items-center gap-5 lg:gap-7 font-mono text-[11px] uppercase tracking-widest text-zinc-300">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors relative py-1 group"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-red-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right: CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/94762007356?text=Hi%20Sahee%2C%20I%20saw%20your%20SAHEETRIX%20portfolio!%20I%20would%20like%20to%20order%20a%20design%20/%20apparel%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 border border-red-400/30 text-white font-mono text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(229,9,20,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>HIRE ME: +94 76 200 7356</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-40 p-6 rounded-3xl bg-[#0c0c10]/95 backdrop-blur-2xl border border-red-500/20 shadow-2xl md:hidden flex flex-col gap-5"
          >
            <div className="space-y-3 font-display font-bold text-lg text-white">
              {siteConfig.navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 border-b border-white/5 hover:text-red-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <a
              href="https://wa.me/94762007356"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-mono font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WHATSAPP: +94 76 200 7356</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}