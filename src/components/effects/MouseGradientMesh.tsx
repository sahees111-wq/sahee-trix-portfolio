"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function MouseGradientMesh() {
  const [enabled, setEnabled] = useState(false);

  const rawMouseX = useMotionValue(500);
  const rawMouseY = useMotionValue(400);

  const mouseX = useSpring(rawMouseX, { damping: 30, stiffness: 110, mass: 0.8 });
  const mouseY = useSpring(rawMouseY, { damping: 30, stiffness: 110, mass: 0.8 });

  const orbX = useTransform(mouseX, (val) => val - 260);
  const orbY = useTransform(mouseY, (val) => val - 260);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (min-width: 900px) and (prefers-reduced-motion: no-preference)");
    setEnabled(media.matches);

    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
    };

    if (media.matches) window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rawMouseX, rawMouseY]);

  if (!enabled) {
    return <div className="fixed inset-0 pointer-events-none z-[1] bg-gradient-radial from-red-600/[0.07] via-transparent to-transparent" />;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* One lightweight cursor glow keeps the atmosphere without five full-screen blur layers. */}
      <motion.div
        className="absolute w-[520px] h-[520px] rounded-full opacity-40 mix-blend-screen filter blur-[90px] will-change-transform"
        style={{
          x: orbX,
          y: orbY,
          background: "radial-gradient(circle, #ff1a26 0%, #e50914 45%, #990000 70%, transparent 85%)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.48, 0.35],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Static Ambient Red Radial Glow Center */}
      <div className="absolute inset-0 bg-gradient-radial from-red-600/[0.08] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
