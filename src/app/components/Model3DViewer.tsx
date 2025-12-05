"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  useProgress,
} from "@react-three/drei";

import Model3D from "./Model3D";
import Model3DLoader from "./Model3DLoader";

interface Model3DViewerProps {
  modelPath?: string;
  className?: string;
  height?: string;
  enableControls?: boolean;
  autoRotate?: boolean;
  backgroundColor?: string;
  modelPosition?: [number, number, number];
  modelScale?: number;
  onLoadingChange?: (isLoading: boolean) => void;
}

// Component to track loading progress inside Canvas
function LoadingProgress({ onLoaded }: { onLoaded: () => void }) {
  const { progress, active } = useProgress();

  useEffect(() => {
    if (!active && progress === 100) {
      // Add a small delay to ensure everything is rendered
      const timer = setTimeout(() => {
        onLoaded();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [active, progress, onLoaded]);

  return null;
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
  onLoadingChange,
}: Model3DViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Notify parent component of loading state changes
  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: height,
        backgroundColor: backgroundColor,
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Loading overlay */}
      {isLoading && <Model3DLoader />}

      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Device pixel ratio for better quality on retina displays
      >
        {/* Track loading progress */}
        <LoadingProgress onLoaded={() => setIsLoading(false)} />

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
