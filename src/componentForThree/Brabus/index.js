import { useMemo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { applyProps } from "@react-three/fiber";
import { LoopOnce } from "three";

export function Brabus(props) {
  const { scene, nodes, materials, animations } = useGLTF(
    "/model/car-model.glb"
  );

  const { ref, actions, names } = useAnimations(animations);
  const anim = useRef(true);
  useMemo(() => {
    applyProps(materials.black_main_metal, {
      metalness: 0.9,
      roughness: 0.02,
      color: props.color,
    });
    applyProps(materials.black_body_plastic, {
      metalness: 1,
      roughness: 0.2,
      opacity: 0.3,
      color: "#616161",
    });
    applyProps(materials.gray_main_metal, {
      metalness: 0.9,
      roughness: 0.02,
      color: "#BEBEBE",
    });
    applyProps(materials.gray_roof_metal, {
      metalness: 0.9,
      roughness: 0.02,
      color: "#BEBEBE",
    });
    applyProps(materials.logo, {
      metalness: 0.9,
      roughness: 0.02,
      color: "#616161",
    });
    applyProps(materials.backlights_background, { color: "#FF0000" });
    applyProps(materials.lights_red, {
      metalness: 1,
      roughness: 0,
      color: "#FF0000",
    });
    applyProps(materials.main_glass, {
      metalness: 0.6,
      roughness: 0.2,
      opacity: 0.1,
      color: "#ffffff",
    });
    applyProps(materials.sunroof, {
      metalness: 1,
      roughness: 0.2,
      opacity: 0.3,
      color: "#4E4E4E",
    });
    applyProps(materials.number_plate, {
      metalness: 0.9,
      roughness: 0.02,
      color: "#B4B4B4",
    });
    applyProps(materials.gray_interior_detais, {
      metalness: 0.5,
      roughness: 0.5,
      color: "#C0C0C0",
    });

    applyProps(materials.car_disks, {
      metalness: 1,
      roughness: 0,
      color: "#494646",
    });
    applyProps(materials.tires, {
      metalness: 0.3,
      roughness: 0.7,
      color: "#141414",
    });
    applyProps(materials.red_datails, { color: "#FF0000" });
  }, [props.color]);
  const openingDoor = () => {
    // if (anim.current === true) {
    actions[names[0]].time = actions[names[0]].getClip().duration * 0.5;
    actions[names[0]].setLoop(LoopOnce, 1);
    actions[names[0]].fadeIn(3).play();
    anim.current = false;
    // }
  };
  return (
    <group ref={ref} onPointerDown={() => openingDoor()}>
      <primitive
        object={scene}
        rotation={[0, Math.PI / 1.5, 0]}
        scale={1}
        position={[0, -1.16, 0]}
      />
    </group>
  );
}
