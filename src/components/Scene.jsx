"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function ParticleField() {
  const pointsRef = useRef(null);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  const positions = useMemo(() => {
    const count = 180;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const seed = i * 374761393 + 668265263;
      arr[i * 3] = (((seed ^ (seed >> 13)) * 1274126177) & 0xffff) / 0xffff * 18 - 9;
      arr[i * 3 + 1] = ((((seed >> 8) ^ (seed >> 21)) * 1013904223) & 0xffff) / 0xffff * 18 - 9;
      arr[i * 3 + 2] = (((seed ^ (seed >> 7)) * 2654435769) & 0xffff) / 0xffff * 10 - 5;
    }
    return arr;
  }, []);

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0675C1"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

export default function Scene() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "absolute", inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
