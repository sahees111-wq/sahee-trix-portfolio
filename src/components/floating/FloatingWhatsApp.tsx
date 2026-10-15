"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101014]/90 border border-white/10 backdrop-blur-md shadow-2xl text-xs font-mono text-zinc-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Let&apos;s Talk</span>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={siteConfig.socialLinks[0].url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Sahee Trix on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        <MessageCircle className="w-7 h-7 fill-white text-white group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  );
}
