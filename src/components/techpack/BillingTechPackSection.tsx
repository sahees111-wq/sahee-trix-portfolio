"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { MessageCircle, FileText, Download, Check, Sparkles, Shirt, Layers, Printer, ArrowRight } from "lucide-react";

export function BillingTechPackSection() {
  const [qty, setQty] = useState<number>(73);
  const [rate, setRate] = useState<number>(1850);
  const [description, setDescription] = useState<string>("SUB T SHRT");

  const total = qty * rate;

  const handleSendWhatsAppOrder = () => {
    const text = [
      "OFFICIAL SAHEETRIX APPAREL HIRE / TECH-PACK SERVICE INQUIRY",
      "",
      "Brand: SAHEETRIX - Graphic Designing & Clothing Solutions",
      `Item Description: ${description}`,
      `Quantity (Qty): ${qty} units`,
      `Unit Rate: Rs. ${rate.toLocaleString()}/=`,
      `Total Amount: Rs. ${total.toLocaleString()}/=`,
      "",
      "Tech Specs:",
      "• Collar: Round Neck",
      "• Embellishment: High-Density Printed Logo / Crest",
      "• Construction: Sleeve Band Attachment",
      "• Fabric Material: Close Hole Micro-Interlock (Sublimation)",
      "",
      "Please confirm artwork proof & production schedule.",
    ].join("\n");
    const phoneNumber = siteConfig.contact.whatsapp.replace(/\D/g, "");
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="billing-techpack" className="relative w-full py-28 px-4 sm:px-6 lg:px-12 bg-[#08080a] border-t border-red-500/20 overflow-hidden">
      {/* Background Crimson Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-red-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-red-500 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Shirt className="w-4 h-4" />
                // 04B. APPAREL TECH-PACK & BILLING SYSTEM
              </span>
              <div className="h-[1px] w-12 bg-red-500/30" />
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              SIGNATURE BILLING &amp; <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 bg-clip-text text-transparent">
                PRODUCTION TECH-PACK
              </span>
            </h2>
          </div>

          <p className="font-sans text-sm text-zinc-400 max-w-md">
            The authentic SAHEETRIX clothing solution card format — bridging technical specification callouts with instant commercial quotation.
          </p>
        </div>

        {/* RECREATED OFFICIAL SAHEETRIX BILLING CARD (Exact Look & Feel) */}
        <div className="relative max-w-4xl mx-auto bg-gradient-to-b from-[#b00808] via-[#e50914] to-[#730505] rounded-3xl p-1.5 sm:p-2.5 shadow-[0_0_50px_rgba(229,9,20,0.35)] border border-red-400/40">
          <div className="relative bg-[#060608] rounded-[22px] overflow-hidden p-4 sm:p-8 flex flex-col justify-between min-h-[720px]">
            {/* Top Red Gradient Header Banner with Dot Matrix Texture */}
            <div className="relative -mx-4 -mt-4 sm:-mx-8 sm:-mt-8 p-4 sm:p-6 bg-gradient-to-r from-[#990000] via-[#dc141e] to-[#990000] border-b-2 border-red-500 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Left: Star Geometric Logo + Brand Name */}
              <div className="flex items-center gap-4">
                {/* SVG Faceted Origami Star Logo */}
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 shrink-0 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                    {/* Origami Star Facets */}
                    <polygon points="50,5 62,38 95,50 62,62 50,95 38,62 5,50 38,38" fill="#ffffff" />
                    <polygon points="50,5 50,50 38,38" fill="#e50914" opacity="0.8" />
                    <polygon points="95,50 50,50 62,62" fill="#990000" opacity="0.8" />
                    <polygon points="50,95 50,50 62,62" fill="#e50914" opacity="0.6" />
                    <polygon points="5,50 50,50 38,38" fill="#730505" opacity="0.7" />
                  </svg>
                </div>

                <div className="text-center sm:text-left">
                  <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-white/90 font-bold block">
                    GRAPHIC DESIGNING AND CLOTHING SOLUTIONS
                  </span>
                  <h1 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-wider leading-none">
                    SAHEETRIX
                  </h1>
                  <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-widest text-white/80 font-medium block mt-0.5">
                    WORLD CLASS PRODUCTS AND SERVICES FOR WORLDWIDE BRANDS
                  </span>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/20 text-[10px] font-mono text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>OFFICIAL SPEC SHEET</span>
              </div>
            </div>

            {/* Middle: 3D Sublimation Jersey Display with Technical Callouts */}
            <div className="relative my-8 py-4 sm:py-8 flex flex-col items-center justify-center bg-gradient-radial from-red-600/30 via-transparent to-transparent rounded-2xl">
              {/* Dot matrix pattern background overlay */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ff3b3b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {/* Center Jersey Visual Frame */}
              <div className="relative w-full max-w-md aspect-[4/5] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/saheetrix-billing-sample.jpg"
                  alt="SAHEETRIX Custom Jersey & Apparel Tech Pack"
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
                />

                {/* Interactive Technical Spec Overlay Callouts */}
                <div className="hidden sm:block">
                  {/* Callout 1: ROUND NECK */}
                  <div className="absolute top-[18%] left-[62%] flex items-center gap-2 font-mono text-xs uppercase font-bold text-white tracking-wider bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-red-500/60 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>ROUND NECK</span>
                  </div>

                  {/* Callout 2: PRINTED LOGO */}
                  <div className="absolute top-[32%] left-[65%] flex items-center gap-2 font-mono text-xs uppercase font-bold text-white tracking-wider bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-red-500/60 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>PRINTED LOGO / CREST</span>
                  </div>

                  {/* Callout 3: SLEEVE BAND ATTACHMENT */}
                  <div className="absolute top-[52%] left-[60%] flex items-center gap-2 font-mono text-xs uppercase font-bold text-white tracking-wider bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-red-500/60 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>SLEEVE BAND ATTACHMENT</span>
                  </div>

                  {/* Callout 4: CLOSE HOLE MATERIAL */}
                  <div className="absolute bottom-[20%] left-[62%] flex items-center gap-2 font-mono text-xs uppercase font-bold text-white tracking-wider bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-red-500/60 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>CLOSE HOLE MATERIAL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: Commercial Quotation & Invoice Breakdown Table */}
            <div className="space-y-4">
              <div className="overflow-x-auto rounded-xl border-2 border-red-600/80 bg-black/90">
                <table className="w-full text-left font-mono text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b-2 border-red-600 bg-red-950/60 text-white font-bold">
                      <th className="p-3 sm:p-4 text-center border-r border-red-600/60 w-16 sm:w-24">Qty</th>
                      <th className="p-3 sm:p-4 border-r border-red-600/60">Description</th>
                      <th className="p-3 sm:p-4 text-center border-r border-red-600/60 w-28 sm:w-36">Rate</th>
                      <th className="p-3 sm:p-4 text-right border-r border-red-600/60 w-32 sm:w-44">Rs.</th>
                      <th className="p-3 sm:p-4 text-center w-14 sm:w-16">Cts.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-red-900/60 text-zinc-100 font-semibold hover:bg-white/[0.02]">
                      <td className="p-3 sm:p-4 text-center border-r border-red-600/60">
                        <input
                          type="number"
                          min={10}
                          max={5000}
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value) || 1)}
                          className="w-16 bg-red-950/40 text-center font-bold text-red-400 border border-red-600/40 rounded px-1 py-0.5 focus:outline-none"
                        />
                      </td>
                      <td className="p-3 sm:p-4 border-r border-red-600/60 text-white font-bold uppercase tracking-wider">
                        <select
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                            if (e.target.value === "SUB T SHRT") setRate(1850);
                            else if (e.target.value === "CHAMPIONSHIP JERSEY") setRate(2450);
                            else if (e.target.value === "POLO T SHIRT") setRate(2200);
                            else if (e.target.value === "HOODIE / JACKET") setRate(3800);
                          }}
                          className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                        >
                          <option value="SUB T SHRT" className="bg-[#121216] text-white">SUB T SHRT (Sublimation Tee)</option>
                          <option value="CHAMPIONSHIP JERSEY" className="bg-[#121216] text-white">CHAMPIONSHIP JERSEY (Pro Kit)</option>
                          <option value="POLO T SHIRT" className="bg-[#121216] text-white">POLO T SHIRT (Collar Sublimation)</option>
                          <option value="HOODIE / JACKET" className="bg-[#121216] text-white">HOODIE / JACKET (Custom Fleece)</option>
                        </select>
                      </td>
                      <td className="p-3 sm:p-4 text-center border-r border-red-600/60 text-zinc-300">
                        {rate.toLocaleString()}/=
                      </td>
                      <td className="p-3 sm:p-4 text-right border-r border-red-600/60 font-bold text-white text-base">
                        {total.toLocaleString()}/=
                      </td>
                      <td className="p-3 sm:p-4 text-center text-zinc-300">
                        00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Total Row & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-black/80 border border-red-600/50">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>PRODUCTION SERVICE SPECIFICATION READY</span>
                </div>

                <div className="flex items-baseline gap-3 text-right">
                  <span className="font-mono text-sm uppercase text-zinc-300 font-bold">TOTAL:</span>
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-red-400 tracking-tight">
                    Rs. {total.toLocaleString()}/=
                  </span>
                </div>
              </div>

              {/* Order via WhatsApp Action Button */}
              <button
                onClick={handleSendWhatsAppOrder}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(229,9,20,0.5)] hover:shadow-[0_0_40px_rgba(229,9,20,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-5 h-5 fill-white text-white" />
                <span>HIRE SAHEETRIX FOR THIS PROJECT ON WHATSAPP (+94 76 200 7356)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Official Card Footer Bar */}
            <div className="relative -mx-4 -mb-4 sm:-mx-8 sm:-mb-8 mt-6 p-3.5 sm:p-4 bg-gradient-to-r from-[#990000] via-[#dc141e] to-[#990000] border-t-2 border-red-500 flex flex-col sm:flex-row items-center justify-between text-white font-mono text-[10px] sm:text-xs tracking-wider gap-2">
              <span className="font-bold">THANK YOU FOR YOUR BUSINESS</span>
              <span className="text-white/90">EMAIL: saheetrix@gmail.com</span>
              <span className="font-bold text-white bg-black/40 px-3 py-1 rounded-full border border-white/20">
                NO: +94 76 200 7356
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
