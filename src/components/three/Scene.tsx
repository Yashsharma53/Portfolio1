"use client";

import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import SharinganModel from "./SharinganModel";
import FloatingParticles from "./FloatingParticles";
import AnimatedTorus from "./AnimatedTorus";

// ---------------------------------------------------------------------------
// Camera rig that follows mouse subtly
// ---------------------------------------------------------------------------
function CameraRig({
  mouseX,
  mouseY,
}: {
  mouseX: number;
  mouseY: number;
}) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    // Map mouse position (-1 … 1) to a small camera offset
    target.current.set(mouseX * 0.4, mouseY * 0.3, camera.position.z);
    camera.position.lerp(target.current, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ---------------------------------------------------------------------------
// Scene (exported as default so it can be dynamically imported)
// ---------------------------------------------------------------------------
interface SceneProps {
  mouseX?: number;
  mouseY?: number;
}

export default function Scene({ mouseX = 0, mouseY = 0 }: SceneProps) {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      {/* Fog for depth */}
      <fog attach="fog" args={["#0A0A0A", 5, 18]} />

      {/* Lighting ---------------------------------------------------- */}
      <ambientLight intensity={0.15} color="#ff4444" />
      <pointLight
        position={[5, 5, 5]}
        intensity={0.8}
        color="#DC2626"
        distance={20}
        decay={2}
      />
      <pointLight
        position={[-4, -3, 3]}
        intensity={0.4}
        color="#991b1b"
        distance={15}
        decay={2}
      />
      <pointLight
        position={[0, 0, 4]}
        intensity={0.3}
        color="#ff0000"
        distance={12}
        decay={2}
      />

      {/* Camera movement */}
      <CameraRig mouseX={mouseX} mouseY={mouseY} />

      {/* Controls (interaction limited to rotation only) */}
      <OrbitControls
        autoRotate={false}
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 2.4}
      />

      {/* 3D content wrapped in Suspense */}
      <Suspense fallback={null}>
        <SharinganModel />
        <FloatingParticles />
        <AnimatedTorus />
      </Suspense>
    </Canvas>
  );
}
