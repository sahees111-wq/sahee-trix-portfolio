"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Ripple = {
  id: number;
  x: number;
  y: number;
  color: string;
};

export function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "view" | "drag" | "hidden">("default");
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  // Chained springs create a soft, physical-looking trail without per-frame React state updates.
  const trailX1 = useSpring(cursorX, { damping: 32, stiffness: 250, mass: 0.65 });
  const trailY1 = useSpring(cursorY, { damping: 32, stiffness: 250, mass: 0.65 });
  const trailX2 = useSpring(trailX1, { damping: 35, stiffness: 190, mass: 0.8 });
  const trailY2 = useSpring(trailY1, { damping: 35, stiffness: 190, mass: 0.8 });
  const trailX3 = useSpring(trailX2, { damping: 38, stiffness: 145, mass: 0.95 });
  const trailY3 = useSpring(trailY2, { damping: 38, stiffness: 145, mass: 0.95 });
  const trailX4 = useSpring(trailX3, { damping: 42, stiffness: 110, mass: 1.05 });
  const trailY4 = useSpring(trailY3, { damping: 42, stiffness: 110, mass: 1.05 });
  const rippleId = useRef(0);
  const cursorVariantRef = useRef(cursorVariant);

  useEffect(() => {
    cursorVariantRef.current = cursorVariant;
  }, [cursorVariant]);

  useEffect(() => {
    // Check touch device
    const checkTouch = () => {
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      const lowMemory = typeof deviceMemory === "number" && deviceMemory <= 2;
      const lowCpu = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 2;

      // Keep the native cursor on touch, reduced-motion, and low-power devices.
      const disableCustomCursor = coarsePointer || reduceMotion || lowMemory || lowCpu;
      setIsTouchDevice(disableCustomCursor);
      document.documentElement.classList.toggle("has-custom-cursor", !disableCustomCursor);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      const isInteractive = target.closest("button, a, input, textarea, [role='button']");

      if (cursorAttr === "VIEW") {
        setCursorVariant("view");
        setCursorText("VIEW");
      } else if (cursorAttr === "DRAG") {
        setCursorVariant("drag");
        setCursorText("DRAG");
      } else if (isInteractive) {
        setCursorVariant("hover");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    const handleClick = (e: MouseEvent) => {
      const id = rippleId.current++;
      const color = cursorVariantRef.current === "view" ? "rgba(0, 229, 255, 0.9)" : cursorVariantRef.current === "drag" ? "rgba(139, 92, 246, 0.9)" : "rgba(255, 26, 38, 0.9)";
      setRipples((current) => [...current.slice(-5), { id, x: e.clientX, y: e.clientY, color }]);
      window.setTimeout(() => {
        setRipples((current) => current.filter((ripple) => ripple.id !== id));
      }, 760);
    };

    const handleMouseLeave = () => setCursorVariant("hidden");
    const handleMouseEnter = () => setCursorVariant("default");

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    return () => {
      window.removeEventListener("resize", checkTouch);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <>
      {[{ x: trailX4, y: trailY4, size: 18, opacity: 0.14 }, { x: trailX3, y: trailY3, size: 24, opacity: 0.18 }, { x: trailX2, y: trailY2, size: 31, opacity: 0.22 }, { x: trailX1, y: trailY1, size: 39, opacity: 0.28 }].map((trail, index) => (
        <motion.div
          key={`trail-${index}`}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border"
          style={{
            x: trail.x,
            y: trail.y,
            translateX: "-50%",
            translateY: "-50%",
            width: trail.size,
            height: trail.size,
            borderColor: `rgba(255, 26, 38, ${trail.opacity})`,
          }}
        />
      ))}

      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed top-0 left-0 pointer-events-none z-[9997] rounded-full border"
          style={{
            x: ripple.x,
            y: ripple.y,
            translateX: "-50%",
            translateY: "-50%",
            borderColor: ripple.color,
          }}
          initial={{ width: 16, height: 16, opacity: 0.7, scale: 0.35 }}
          animate={{ width: 120, height: 120, opacity: 0, scale: 1 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full text-[10px] font-mono font-bold tracking-widest uppercase transition-colors"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorVariant === "view" || cursorVariant === "drag" ? 72 : cursorVariant === "hover" ? 38 : 12,
          height: cursorVariant === "view" || cursorVariant === "drag" ? 72 : cursorVariant === "hover" ? 38 : 12,
          backgroundColor:
            cursorVariant === "view"
              ? "rgba(0, 229, 255, 0.9)"
              : cursorVariant === "drag"
              ? "rgba(139, 92, 246, 0.9)"
              : cursorVariant === "hover"
              ? "rgba(255, 255, 255, 0.15)"
              : "rgba(0, 229, 255, 0.9)",
          color: cursorVariant === "view" || cursorVariant === "drag" ? "#08080a" : "#ffffff",
          borderColor: cursorVariant === "hover" ? "rgba(0, 229, 255, 0.6)" : "transparent",
          borderWidth: cursorVariant === "hover" ? 1 : 0,
          backdropFilter: cursorVariant === "hover" ? "blur(4px)" : "none",
          opacity: cursorVariant === "hidden" ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}

