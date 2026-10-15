"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function MouseGradientMesh() {
  const [isMounted, setIsMounted] = useState(false);

  const rawMouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 500);
  const rawMouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 500);

  // Responsive spring physics
  const springFast = { damping: 22, stiffness: 200, mass: 0.5 };
  const springMid = { damping: 28, stiffness: 120, mass: 0.8 };
  const springSlow = { damping: 36, stiffness: 70, mass: 1.2 };

  const mouseXFast = useSpring(rawMouseX, springFast);
  const mouseYFast = useSpring(rawMouseY, springFast);

  const mouseXMid = useSpring(rawMouseX, springMid);
  const mouseYMid = useSpring(rawMouseY, springMid);

  const mouseXSlow = useSpring(rawMouseX, springSlow);
  const mouseYSlow = useSpring(rawMouseY, springSlow);

  // Multi-orb positional offsets
  const redPrimaryX = useTransform(mouseXFast, (val) => val - 260);
  const redPrimaryY = useTransform(mouseYFast, (val) => val - 260);

  const scarletSecondaryX = useTransform(mouseXMid, (val) => val + 100);
  const scarletSecondaryY = useTransform(mouseYMid, (val) => val - 140);

  const rubyTrailX = useTransform(mouseXSlow, (val) => val - 180);
  const rubyTrailY = useTransform(mouseYSlow, (val) => val + 120);

  const goldAccentX = useTransform(mouseXMid, (val) => val + 220);
  const goldAccentY = useTransform(mouseYMid, (val) => val + 160);

  const deepGlowX = useTransform(mouseXSlow, (val) => val - 300);
  const deepGlowY = useTransform(mouseYSlow, (val) => val - 100);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rawMouseX, rawMouseY]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* 1. Primary Vibrant Electric Crimson Red Orb (Fast Cursor Follow) */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-45 mix-blend-screen filter blur-[110px]"
        style={{
          x: redPrimaryX,
          y: redPrimaryY,
          background: "radial-gradient(circle, #ff1a26 0%, #e50914 45%, #990000 70%, transparent 85%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.55, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 2. Secondary Radiant Scarlet Red Orb (Trailing Fluid Motion) */}
      <motion.div
        className="absolute w-[550px] h-[550px] rounded-full opacity-35 mix-blend-screen filter blur-[125px]"
        style={{
          x: scarletSecondaryX,
          y: scarletSecondaryY,
          background: "radial-gradient(circle, #ff3b47 0%, #dc141e 50%, transparent 75%)",
        }}
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />

      {/* 3. Deep Ruby & Warm Flame Gradient Orb */}
      <motion.div
        className="absolute w-[480px] h-[480px] rounded-full opacity-30 mix-blend-screen filter blur-[120px]"
        style={{
          x: rubyTrailX,
          y: rubyTrailY,
          background: "radial-gradient(circle, #e50914 0%, #7a0000 50%, transparent 75%)",
        }}
        animate={{
          scale: [0.95, 1.15, 0.95],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* 4. Radiant Amber / Gold Edge Highlight */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-25 mix-blend-screen filter blur-[115px]"
        style={{
          x: goldAccentX,
          y: goldAccentY,
          background: "radial-gradient(circle, #f59e0b 0%, #b45309 45%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* 5. Deep Ambient Crimson Base */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 mix-blend-screen filter blur-[130px]"
        style={{
          x: deepGlowX,
          y: deepGlowY,
          background: "radial-gradient(circle, #ff1a26 0%, #4a0000 60%, transparent 80%)",
        }}
      />

      {/* Static Ambient Red Radial Glow Center */}
      <div className="absolute inset-0 bg-gradient-radial from-red-600/[0.08] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}