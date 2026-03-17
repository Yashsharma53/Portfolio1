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
interface SharinganModelProps {
  scrollProgress?: number;
}

export default function SharinganModel({ scrollProgress = 0 }: SharinganModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wrapperRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Scale proportionally to viewport (smaller on mobile)
  const scale = Math.min(viewport.width, viewport.height) / 6;

  // Smooth lerp target for position
  const targetPos = useRef(new THREE.Vector3(2, 0, 0));

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = Math.min(scrollProgress, 1); // clamp position movement to 0-1
    const fade = scrollProgress > 1 ? Math.max(0, 1 - (scrollProgress - 1)) : 1; // fade out after about

    // Position: hero right → about left → skills heading (top-left, small)
    let targetX: number;
    let targetY: number;
    let targetScale: number;

    if (scrollProgress <= 1) {
      // Hero → About
      targetX = 2 - p * 5;        // 2 → -3
      targetY = 0;
      targetScale = 1;
    } else {
      // About → Skills heading (shrink and move to top-left area beside "Skills & Arsenal")
      const t2 = fade; // 1 → 0 as we scroll past about
      targetX = -3 + (1 - t2) * (-viewport.width / 2 + 1.8); // move to far left
      targetY = (1 - t2) * 2.5; // move up
      targetScale = 0.3 + t2 * 0.7; // 1 → 0.3
    }

    targetPos.current.set(targetX, targetY, 0);

    if (wrapperRef.current) {
      wrapperRef.current.position.lerp(targetPos.current, 0.08);
      const currentScale = wrapperRef.current.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.08;
      wrapperRef.current.scale.set(newScale, newScale, newScale);
    }

    // Rotation speed: slow → fast based on scroll
    const rotSpeed = 0.15 + p * 1.35;

    if (groupRef.current) {
      groupRef.current.rotation.z = t * rotSpeed;
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.12;
    }

    const innerSpeed = 0.08 + p * 0.6;
    if (innerRef.current) {
      innerRef.current.rotation.z = -t * innerSpeed;
    }
  });

  // 3 blades evenly spaced
  const bladeRotations = useMemo(
    () => [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3],
    []
  );

  return (
    <group ref={wrapperRef} position={[2, 0, 0]}>
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
    </group>
  );
}
