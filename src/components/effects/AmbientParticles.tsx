"use client";

import React from "react";

const PARTICLE_COUNT = 16;

export function AmbientParticles() {
  return (
    <div className="ambient-particles" aria-hidden="true">
      {Array.from({ length: PARTICLE_COUNT }).map((_, index) => (
        <span
          key={index}
          style={{
            left: ((index * 17 + 7) % 100) + "%",
            top: ((index * 29 + 11) % 100) + "%",
            animationDelay: ((index % 7) * -1.1) + "s",
            animationDuration: (7 + (index % 5)) + "s",
          }}
        />
      ))}
    </div>
  );
}
