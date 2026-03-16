"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Single wireframe torus knot with individual animation
// ---------------------------------------------------------------------------
interface KnotProps {
  position: [number, number, number];
  args: [number, number, number, number, number, number]; // radius, tube, tubularSegments, radialSegments, p, q
  speedX: number;
  speedY: number;
  speedZ: number;
  opacity?: number;
}

function WireframeKnot({
  position,
  args,
  speedX,
  speedY,
  speedZ,
  opacity = 0.08,
}: KnotProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * speedX;
    meshRef.current.rotation.y = t * speedY;
    meshRef.current.rotation.z = t * speedZ;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusKnotGeometry args={args} />
      <meshBasicMaterial
        color="#DC2626"
        wireframe
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// AnimatedTorus – collection of background decorative knots
// ---------------------------------------------------------------------------
export default function AnimatedTorus() {
  return (
    <group>
      {/* Large, slow knot – upper right */}
      <WireframeKnot
        position={[4, 2.5, -4]}
        args={[1.6, 0.3, 64, 8, 2, 3]}
        speedX={0.04}
        speedY={0.06}
        speedZ={0.02}
        opacity={0.06}
      />

      {/* Medium knot – lower left */}
      <WireframeKnot
        position={[-3.5, -2, -3]}
        args={[1.1, 0.25, 48, 8, 3, 5]}
        speedX={-0.05}
        speedY={0.03}
        speedZ={-0.04}
        opacity={0.07}
      />

      {/* Small knot – centre-back */}
      <WireframeKnot
        position={[0.5, -0.5, -6]}
        args={[0.9, 0.2, 48, 8, 2, 5]}
        speedX={0.03}
        speedY={-0.04}
        speedZ={0.05}
        opacity={0.05}
      />

      {/* Extra subtle knot – far upper-left */}
      <WireframeKnot
        position={[-5, 3, -5]}
        args={[1.3, 0.2, 48, 6, 3, 2]}
        speedX={0.02}
        speedY={0.03}
        speedZ={-0.02}
        opacity={0.04}
      />

      {/* Extra subtle knot – far lower-right */}
      <WireframeKnot
        position={[5, -3, -5]}
        args={[1.0, 0.15, 48, 6, 5, 3]}
        speedX={-0.03}
        speedY={-0.02}
        speedZ={0.03}
        opacity={0.04}
      />
    </group>
  );
}
