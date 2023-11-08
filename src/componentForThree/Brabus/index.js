import { useMemo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { applyProps } from "@react-three/fiber";
import { LoopOnce } from "three";
import { useEffect } from "react";

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
  const playAnim = (index) => {
    actions[names[index]].setLoop(LoopOnce);
    actions[names[index]].timeScale = 1;
    actions[names[index]].reset().fadeIn(0.5).play().clampWhenFinished = true;
  };
  const playAnimOut = (index) => {
    actions[names[index]].fadeOut(0.5);
  };
  const openingDoor = () => {
    playAnim(1);
    playAnim(3);
    playAnim(5);
    playAnim(7);
    playAnim(9);
  };
  const closeDoor = () => {
    playAnim(0);
    playAnim(2);
    playAnim(4);
    playAnim(6);
    playAnim(8);
  };
  const openingDoorOut = () => {
    playAnimOut(1);
    playAnimOut(3);
    playAnimOut(5);
    playAnimOut(7);
    playAnimOut(9);
  };
  const closeDoorOut = () => {
    playAnimOut(0);
    playAnimOut(2);
    playAnimOut(4);
    playAnimOut(6);
    playAnimOut(8);
  };
  useEffect(() => {
    if (props.open) {
      openingDoor();
    } else {
      closeDoor();
    }
    return () => {
      if (props.open) {
        console.log("open");
        openingDoorOut();
      } else {
        console.log("close");
        closeDoorOut();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);
  return (
    <group ref={ref} onClick={() => closeDoor()}>
      <primitive
        object={scene}
        rotation={[0, Math.PI / 1.5, 0]}
        scale={1}
        position={[0, -1.16, 0]}
      />
    </group>
  );
}
