"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { FloatingElements } from "./FloatingElements";
import { ParticleField } from "./ParticleField";
import * as THREE from "three";

function DynamicLights({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);
  const light3Ref = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (light1Ref.current) {
      // Dynamic Cyan / Neon Blue light following cursor
      light1Ref.current.position.x = THREE.MathUtils.damp(
        light1Ref.current.position.x,
        mouse.current.x * 8 - 4,
        2,
        delta
      );
      light1Ref.current.position.y = THREE.MathUtils.damp(
        light1Ref.current.position.y,
        mouse.current.y * 6 + 2,
        2,
        delta
      );
    }

    if (light2Ref.current) {
      // Dynamic Violet / Magenta counter-light
      light2Ref.current.position.x = THREE.MathUtils.damp(
        light2Ref.current.position.x,
        -mouse.current.x * 7 + 4,
        2,
        delta
      );
      light2Ref.current.position.y = THREE.MathUtils.damp(
        light2Ref.current.position.y,
        -mouse.current.y * 5 - 2,
        2,
        delta
      );
    }

    if (light3Ref.current) {
      // Dynamic Amber / Gold accent light
      light3Ref.current.position.x = THREE.MathUtils.damp(
        light3Ref.current.position.x,
        mouse.current.y * 5,
        2,
        delta
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.65} />
      {/* Key Light */}
      <directionalLight position={[5, 6, 4]} intensity={1.2} color="#ffffff" />
      {/* Dynamic Colored Lights reacting to Mouse */}
      <pointLight ref={light1Ref} position={[-6, 2, -2]} intensity={4.5} color="#00e5ff" distance={18} />
      <pointLight ref={light2Ref} position={[6, -3, -1]} intensity={4} color="#ec4899" distance={18} />
      <pointLight ref={light3Ref} position={[0, 4, 3]} intensity={2.5} color="#8b5cf6" distance={15} />
    </>
  );
}

export function HeroScene() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouse.current.x = (e.clientX / innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (!isMounted) return <div className="absolute inset-0 bg-[#08080a]" />;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        frameloop={isVisible ? "always" : "never"}
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <DynamicLights mouse={mouse} />
        <Suspense fallback={null}>
          <FloatingElements mouse={mouse} />
          <ParticleField count={70} />
        </Suspense>
      </Canvas>
    </div>
  );
}
