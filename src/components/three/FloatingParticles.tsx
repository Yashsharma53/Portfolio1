"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 800;

export default function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  // Pre-compute initial positions, velocities, and per-particle colour
  const { positions, colors, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Distribute in a sphere (radius ~8)
      const radius = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);

      // Slow, independent drift direction
      vel[i3] = (Math.random() - 0.5) * 0.003;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.003;

      // ~30 % red-tinted, rest dark grey
      if (Math.random() < 0.3) {
        col[i3] = 0.7 + Math.random() * 0.3; // R
        col[i3 + 1] = 0.05;                   // G
        col[i3 + 2] = 0.05;                   // B
      } else {
        const grey = 0.08 + Math.random() * 0.12;
        col[i3] = grey;
        col[i3 + 1] = grey;
        col[i3 + 2] = grey;
      }
    }

    return { positions: pos, colors: col, velocities: vel };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const t = clock.getElapsedTime();

    // Subtle rotation of the entire system
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.1;

    // Drift each particle
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      arr[i3] += velocities[i3];
      arr[i3 + 1] += velocities[i3 + 1];
      arr[i3 + 2] += velocities[i3 + 2];

      // If a particle drifts too far, gently nudge it back
      const dist = Math.sqrt(
        arr[i3] ** 2 + arr[i3 + 1] ** 2 + arr[i3 + 2] ** 2
      );
      if (dist > 9) {
        velocities[i3] *= -1;
        velocities[i3 + 1] *= -1;
        velocities[i3 + 2] *= -1;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
