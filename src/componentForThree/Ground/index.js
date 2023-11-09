import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import React from "react";

export default function Ground() {
  const disortTexture = useTexture(
    "/textures/SurfaceImperfections003_1K_var1.jpg"
  );
  return (
    <mesh position={[0, -1.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[90, 90]} />
      <MeshReflectorMaterial
        blur={[300, 30]}
        resolution={1024}
        mixBlur={1}
        mixStrength={20}
        roughness={0.8}
        depthScale={0.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={0}
        color="#3D3B3B"
        metalness={0.8}
      />
    </mesh>
  );
}
