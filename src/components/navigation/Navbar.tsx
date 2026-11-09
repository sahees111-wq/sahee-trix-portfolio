"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { Menu, X, ArrowUpRight, MessageCircle } from "lucide-react";
import { Magnetic } from "@/components/effects/Magnetic";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [logoBurst, setLogoBurst] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);

      const probeLine = window.innerHeight * 0.34;
      const currentLink = [...siteConfig.navLinks]
        .filter((link) => {
          const section = document.querySelector(link.href);
          return section && section.getBoundingClientRect().top <= probeLine;
        })
        .at(-1);

      setActiveSection(currentLink?.href ?? "");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setLogoBurst(true);
    window.setTimeout(() => setLogoBurst(false), 1200);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence>
        {logoBurst && (
          <motion.div
            aria-hidden="true"
            className="fixed inset-0 z-[70] pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute left-1/2 top-1/3 w-36 h-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/70 shadow-[0_0_70px_rgba(255,26,38,0.55)]"
              initial={{ scale: 0.2, opacity: 0.9 }}
              animate={{ scale: 3.2, opacity: 0 }}
              transition={{ duration: 1.05, ease: "easeOut" }}
            />
            {Array.from({ length: 12 }).map((_, index) => {
              const angle = (index / 12) * Math.PI * 2;
              return (
                <motion.span
                  key={index}
                  className="absolute left-1/2 top-1/3 w-2 h-2 rounded-full"
                  style={{ backgroundColor: index % 2 ? "#00e5ff" : "#ff1a26" }}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos(angle) * 260,
                    y: Math.sin(angle) * 260,
                    scale: [0, 1.4, 0],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                />
              );
            })}
            <motion.div
              className="absolute inset-x-0 top-1/3 flex justify-center"
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: [0, 1, 0], y: [12, 0, -8], scale: [0.9, 1, 1.04] }}
              transition={{ duration: 1.15, ease: "easeOut" }}
            >
              <span className="rounded-full border border-red-400/40 bg-black/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-red-100 backdrop-blur-md">
                SAHEETRIX // CREATIVE MODE
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 shadow-[0_0_14px_rgba(255,26,38,0.9)]"
        style={{ scaleX: scrollProgress / 100 }}
      />
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
          <a href="#" onClick={handleLogoClick} aria-label="SAHEETRIX home and secret animation" className="flex items-center gap-3 group">
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

          {/* Center: Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7 font-mono text-[11px] uppercase tracking-widest text-zinc-300">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                aria-current={activeSection === link.href ? "page" : undefined}
                className={`relative py-1 transition-colors group ${activeSection === link.href ? "text-white" : "text-zinc-300 hover:text-white"}`}
              >
                <span>{link.name}</span>
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-red-500 transition-all duration-300 ${activeSection === link.href ? "w-full shadow-[0_0_8px_rgba(255,26,38,0.9)]" : "w-0 group-hover:w-full"}`}
                />
              </a>
            ))}
          </div>

          {/* Right: CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <Magnetic strength={0.18} className="hidden sm:inline-flex">
            <a
              href="https://wa.me/94754739447?text=Hi%20Sahee%2C%20I%20saw%20your%20SAHEETRIX%20portfolio!%20I%20would%20like%20to%20order%20a%20design%20/%20apparel%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 border border-red-400/30 text-white font-mono text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(229,9,20,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>HIRE ME: +94 75 473 9447</span>
            </a>
            </Magnetic>

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

            <Magnetic strength={0.16} className="w-full">
            <a
              href="https://wa.me/94754739447"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-mono font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WHATSAPP: +94 75 473 9447</span>
            </a>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}