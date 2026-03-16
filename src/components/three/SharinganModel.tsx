"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ---------------------------------------------------------------------------
// Helper – create one curved Mangekyo blade shape
// ---------------------------------------------------------------------------
function createBladeShape(): THREE.Shape {
  const shape = new THREE.Shape();

  // A curved, sickle-like blade tapering at both ends
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.25, 0.35, 0.6, 0.55, 0.9, 0.25);
  shape.bezierCurveTo(0.75, 0.12, 0.45, -0.05, 0.35, -0.18);
  shape.bezierCurveTo(0.22, -0.12, 0.08, -0.04, 0, 0);

  return shape;
}

// ---------------------------------------------------------------------------
// Single Mangekyo blade mesh
// ---------------------------------------------------------------------------
function MangekyoBlade({ rotation }: { rotation: number }) {
  const shape = useMemo(() => createBladeShape(), []);

  const extrudeSettings = useMemo<THREE.ExtrudeGeometryOptions>(
    () => ({
      depth: 0.04,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.01,
      bevelSegments: 2,
    }),
    []
  );

  return (
    <group rotation={[0, 0, rotation]}>
      <mesh position={[-0.15, -0.08, -0.02]}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial
          color="#DC2626"
          emissive="#DC2626"
          emissiveIntensity={0.6}
          side={THREE.DoubleSide}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// SharinganModel
// ---------------------------------------------------------------------------
export default function SharinganModel() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Scale proportionally to viewport (smaller on mobile)
  const scale = Math.min(viewport.width, viewport.height) / 6;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Slow rotation of the whole Sharingan
    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.15;
      // Floating bob
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.12;
    }

    // Counter-rotate inner pattern slightly for visual interest
    if (innerRef.current) {
      innerRef.current.rotation.z = -t * 0.08;
    }
  });

  // 3 blades evenly spaced
  const bladeRotations = useMemo(
    () => [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3],
    []
  );

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* ── Outer ring ────────────────────────────────────── */}
      <mesh>
        <torusGeometry args={[1.15, 0.07, 24, 64]} />
        <meshStandardMaterial
          color="#DC2626"
          emissive="#DC2626"
          emissiveIntensity={0.5}
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>

      {/* Second thinner ring for detail */}
      <mesh>
        <torusGeometry args={[1.0, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#991b1b"
          emissive="#991b1b"
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>

      {/* ── Mangekyo blades ───────────────────────────────── */}
      <group ref={innerRef}>
        {bladeRotations.map((rot, i) => (
          <MangekyoBlade key={i} rotation={rot} />
        ))}
      </group>

      {/* ── Pupil (centre dot) ────────────────────────────── */}
      <mesh position={[0, 0, 0.03]}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color="#000000" roughness={0.9} metalness={0} />
      </mesh>

      {/* ── Faint glow disc behind everything ─────────────── */}
      <mesh position={[0, 0, -0.08]}>
        <circleGeometry args={[1.35, 48]} />
        <meshBasicMaterial
          color="#DC2626"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
