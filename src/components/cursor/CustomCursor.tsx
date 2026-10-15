"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "view" | "drag" | "hidden">("default");
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check touch device
    const checkTouch = () => {
      if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
        setIsTouchDevice(true);
      } else {
        setIsTouchDevice(false);
      }
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

    const handleMouseLeave = () => setCursorVariant("hidden");
    const handleMouseEnter = () => setCursorVariant("default");

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("resize", checkTouch);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <>
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
