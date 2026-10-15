"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export function FloatingElements({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const cube1Ref = useRef<THREE.Mesh>(null);
  const icosaRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const swatchRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth mouse parallax
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        mouse.current.x * 0.25,
        2,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        -mouse.current.y * 0.2,
        2,
        delta
      );
    }

    if (cube1Ref.current) {
      cube1Ref.current.rotation.x += delta * 0.3;
      cube1Ref.current.rotation.y += delta * 0.4;
    }

    if (icosaRef.current) {
      icosaRef.current.rotation.x -= delta * 0.25;
      icosaRef.current.rotation.z += delta * 0.3;
    }

    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.5;
      ringRef.current.rotation.z += delta * 0.2;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.2;
      torusRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Deep Background Prism (Cyan Glow) */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5} position={[-4, 2.5, -4]}>
        <mesh ref={cube1Ref}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial
            color="#00e5ff"
            roughness={0.2}
            metalness={0.8}
            wireframe
            emissive="#00e5ff"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>

      {/* 2. Floating Glass Icosahedron (Top Right) */}
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={2} position={[4.2, 2.8, -2]}>
        <mesh ref={icosaRef}>
          <icosahedronGeometry args={[1.1, 0]} />
          <meshPhysicalMaterial
            color="#8b5cf6"
            roughness={0.1}
            metalness={0.1}
            transmission={0.9}
            thickness={1.5}
            ior={1.5}
            emissive="#8b5cf6"
            emissiveIntensity={0.4}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>

      {/* 3. Floating Design Swatch / CMYK Layer Card (Right Mid) */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2} position={[3.8, -1.8, -1.5]}>
        <group ref={swatchRef} rotation={[0.2, -0.4, 0.1]}>
          {/* Swatch Base */}
          <RoundedBox args={[2.2, 1.4, 0.08]} radius={0.06} smoothness={4}>
            <meshStandardMaterial color="#121216" roughness={0.4} metalness={0.6} />
          </RoundedBox>
          {/* CMYK Accent Pills */}
          <mesh position={[-0.65, 0.3, 0.06]}>
            <circleGeometry args={[0.2, 32]} />
            <meshBasicMaterial color="#00a4e4" />
          </mesh>
          <mesh position={[-0.2, 0.3, 0.06]}>
            <circleGeometry args={[0.2, 32]} />
            <meshBasicMaterial color="#e4007f" />
          </mesh>
          <mesh position={[0.25, 0.3, 0.06]}>
            <circleGeometry args={[0.2, 32]} />
            <meshBasicMaterial color="#ffea00" />
          </mesh>
          <mesh position={[0.7, 0.3, 0.06]}>
            <circleGeometry args={[0.2, 32]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
        </group>
      </Float>

      {/* 4. Torus Knot / Vector Node (Bottom Left Foreground) */}
      <Float speed={2.2} rotationIntensity={1.4} floatIntensity={1.8} position={[-3.5, -2.5, 0.5]}>
        <mesh ref={torusRef}>
          <torusGeometry args={[0.8, 0.18, 16, 64]} />
          <meshStandardMaterial
            color="#00e5ff"
            roughness={0.15}
            metalness={0.9}
            emissive="#00e5ff"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      {/* 5. Center Background Halo Ring (Behind Subject) */}
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6} position={[1.5, 0.2, -3]}>
        <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[3.2, 0.04, 16, 100]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} />
        </mesh>
      </Float>

      {/* 6. Abstract Floating Vector Point Nodes */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={2.5} position={[-2, 1, -1]}>
        <mesh>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.3} metalness={0.7} />
        </mesh>
      </Float>

      <Float speed={2.8} rotationIntensity={0.6} floatIntensity={2} position={[2, -2.8, -1]}>
        <mesh>
          <octahedronGeometry args={[0.28, 0]} />
          <meshStandardMaterial color="#ec4899" roughness={0.3} metalness={0.7} />
        </mesh>
      </Float>
    </group>
  );
}
