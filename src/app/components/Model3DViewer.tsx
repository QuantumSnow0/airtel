"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Center,
} from "@react-three/drei";

import Model3D from "./Model3D";

interface Model3DViewerProps {
  modelPath?: string;
  className?: string;
  height?: string;
  enableControls?: boolean;
  autoRotate?: boolean;
  backgroundColor?: string;
  modelPosition?: [number, number, number];
  modelScale?: number;
}

export default function Model3DViewer({
  modelPath = "/model/3DModel.gltf",
  className = "",
  height = "400px",
  enableControls = true,
  autoRotate = true,
  backgroundColor = "#0a0a0a",
  modelPosition = [0, -0.5, 0],
  modelScale = 1.5,
}: Model3DViewerProps) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: height,
        backgroundColor: backgroundColor,
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Device pixel ratio for better quality on retina displays
      >
        {/* Lighting using drei Environment */}
        <Environment preset="sunset" />

        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 0, 2.5]} fov={50} />

        {/* Model with loading fallback */}
        <Suspense fallback={null}>
          <Model3D
            modelPath={modelPath}
            scale={modelScale}
            position={modelPosition}
            autoRotate={autoRotate}
            rotationSpeed={0.01}
          />
        </Suspense>

        {/* Controls */}
        {enableControls && (
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={1}
            maxDistance={5}
            autoRotate={autoRotate}
            autoRotateSpeed={1}
            target={[0, 0, 0]}
          />
        )}
      </Canvas>
    </div>
  );
}
