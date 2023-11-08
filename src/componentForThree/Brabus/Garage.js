import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { applyProps } from "@react-three/fiber";

export default function Garage() {
  const { scene, materials } = useGLTF("/model/garage.glb");
  useMemo(() => {
    applyProps(materials.Basic_White, {
      metalness: 0,
      roughness: 0.5,
      color: "#FFFFFF",
      clearcoat: 0,
    });
  }, []);
  return <primitive object={scene} scale={4} position={[3, -1.2, 6]} />;
}
