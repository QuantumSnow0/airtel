"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";

interface Model3DProps {
  modelPath: string;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  rotationSpeed?: number;
}

export default function Model3D({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = true,
  rotationSpeed = 0.01,
}: Model3DProps) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<Group>(null);

  // Auto-rotate the model
  useFrame(() => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={typeof scale === "number" ? [scale, scale, scale] : scale}
      position={position}
      rotation={rotation}
    >
      <primitive object={scene} />
    </group>
  );
}

