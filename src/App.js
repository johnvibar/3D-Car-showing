/* eslint-disable react-hooks/exhaustive-deps */
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Brabus } from "./componentForThree/Brabus";
import { CarLight } from "./componentForThree/Brabus/CarLight";
import { useState, useRef } from "react";
import CameraPosition from "./componentForThree/Animation/CameraPosition";
import gsap from "gsap";
import Loading from "./component/loading";
import { Suspense } from "react";
import Title from "./component/title";
import Garage from "./componentForThree/Brabus/Garage";
import { useSnapshot } from "valtio";
import { state } from "./store";

export default function App() {
  const cameraRef = useRef();
  const [isAnimation, setIsAnimation] = useState(false);
  const [isInterior, setIsInterior] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isInteriorAnimation, setIsInteriorAnimation] = useState(false);
  const orbitControls = useRef();
  // start show interior
  const interiorView = () => {
    if (isInterior) {
      showOutside();
    } else {
      showInterior();
    }
  };
  const showInterior = () => {
    let tl = gsap.timeline({
      onStart: () => {
        setIsInteriorAnimation(true);
        orbitControls.current.autoRotate = false;
        orbitControls.current.minDistance = 0;
        orbitControls.current.maxDistance = 10;
      },
      onComplete: () => {
        orbitControls.current.enabled = true;
        setIsInterior(!isInterior);
        setIsInteriorAnimation(false);
        setIsInterior(!isInterior);
      },
    });

    tl.to(cameraRef.current.position, {
      duration: 1.5,
      x: -1.4,
      y: 1.94,
      z: 6.65,
      ease: "power1.inOut",
    })
      .to(cameraRef.current.position, {
        duration: 1.5,
        x: 2.97,
        y: 0.89,
        z: 1.74,
        ease: "power1.inOut",
      })
      .to(cameraRef.current.position, {
        duration: 1.5,
        x: 1.34,
        y: 0.55,
        z: 1.36,
        ease: "power1.inOut",
      })
      .to(orbitControls.current.target, {
        duration: 1,
        x: -1,
        y: 0,
        z: 1,
        ease: "power1.inOut",
      })
      .to(cameraRef.current.position, {
        duration: 1.5,
        x: 0.35,
        y: 0.35,
        z: 0.3,
        ease: "power1.inOut",
      })
      .to(orbitControls.current.target, {
        onStart: () => {
          orbitControls.current.enabled = false;
        },
        duration: 0,
        x: 0.36,
        y: 0.36,
        z: 0.29,
        ease: "power1.inOut",
      })
      .to(cameraRef.current.position, {
        onStart: () => {
          orbitControls.current.enabled = false;
        },
        duration: 0.5,
        x: 0.383,
        y: 0.366,
        z: 0.278,
        ease: "power1.inOut",
        onComplete: () => {},
      });
  };
  const showOutside = () => {
    let tl = gsap.timeline({
      onStart: () => {
        setIsInteriorAnimation(true);
      },
      onComplete: () => {
        orbitControls.current.reset();
        setIsInterior(!isInterior);
        setIsInteriorAnimation(false);
        setIsInterior(!isInterior);
      },
    });

    tl.to(cameraRef.current.position, {
      duration: 0.5,
      x: 0.36,
      y: 0.36,
      z: 0.29,
      ease: "power1.inOut",
    })
      .to(orbitControls.current.target, {
        duration: 1.5,
        x: -1,
        y: 0,
        z: 1,
        ease: "power1.inOut",
      })
      .to(cameraRef.current.position, {
        duration: 1.5,
        x: 1.34,
        y: 0.55,
        z: 1.36,
        ease: "power1.inOut",
      })
      .to(cameraRef.current.position, {
        duration: 1.5,
        x: 2.97,
        y: 0.89,
        z: 1.74,
        ease: "power1.inOut",
      })
      .to(cameraRef.current.position, {
        duration: 1.5,
        x: -1.4,
        y: 1.94,
        z: 6.65,
        ease: "power1.inOut",
      })
      .to(orbitControls.current.target, {
        duration: 1,
        x: 0,
        y: 0,
        z: 0,
        ease: "power1.inOut",
      });
  };
  // end show interior
  const carAnimation = () => {
    let tl = gsap.timeline({
      onComplete: () => {
        setIsAnimation(false);
      },
    });
    tl.to(cameraRef.current.position, {
      onStart: () => {
        setIsAnimation(true);
        orbitControls.current.autoRotate = false;
        orbitControls.current.minDistance = 0;
        orbitControls.current.maxDistance = 10;
      },
      duration: 3,
      x: -6.08,
      y: 0.043,
      z: 3.6,
      ease: "power1.inOut",
    })
      .to(cameraRef.current.position, {
        duration: 3,
        x: -3.87,
        y: 0.028,
        z: 2.365,
        ease: "power1.inOut",
      })
      .to(cameraRef.current.position, {
        duration: 3,
        x: -1.9,
        y: 0.028,
        z: -3.388,
        ease: "power1.inOut",
        onComplete: () => {
          cameraRef.current.position.set(-1.175, -0.377, 2.975);
          orbitControls.current.maxPolarAngle = Math.PI / 1.5;
          orbitControls.current.target.set(0, -1, 0);
        },
      })
      .to(cameraRef.current.position, {
        duration: 5,
        x: -1.15,
        y: -0.4,
        z: 2.8,
        ease: "power1.inOut",
        onComplete: () => {
          cameraRef.current.position.set(-7, 0.043, 0.95);
          orbitControls.current.target.set(0, -0.5, 0);
        },
      })
      .to(cameraRef.current.position, {
        duration: 3,
        x: -3.25,
        y: -0.115,
        z: 1.95,
        ease: "power1.inOut",
      })
      .to(cameraRef.current.position, {
        duration: 2,
        x: -3.25,
        y: -0.097,
        z: 2.327,
        ease: "power1.inOut",
      })
      .to(cameraRef.current.position, {
        duration: 2,
        x: -1.53,
        y: -0.148,
        z: 2.87,
        ease: "power1.inOut",
        onComplete: () => {
          cameraRef.current.position.set(0.825, 0.357, -0.463);
          orbitControls.current.target.set(0, 0.2, 0);
        },
      })
      .to(cameraRef.current.position, {
        duration: 4,
        x: 0.253,
        y: 0.248,
        z: -0.14,
        ease: "power1.inOut",
        onComplete: () => {
          orbitControls.current.reset();
          orbitControls.current.maxPolarAngle = Math.PI / 2;
          cameraRef.current.position.set(-6.08, 0.043, 3.6);
        },
      })
      .to(cameraRef.current.position, {
        duration: 2,
        x: -3.87,
        y: 0.028,
        z: 2.365,
        ease: "power1.inOut",
      })
      .to(cameraRef.current.position, {
        duration: 2,
        x: -0.76,
        y: 3.042,
        z: 0.445,
        ease: "power1.inOut",
      })
      .to(cameraRef.current.position, {
        duration: 3,
        x: -1.4,
        y: 1.94,
        z: 6.65,
        ease: "power1.inOut",
      });
  };

  const snap = useSnapshot(state);
  return (
    <>
      {!isInteriorAnimation && (
        <>
          {/* {!isInterior && !isAnimation && ( */}
          {!state.intro && (
            <>
              <button
                className="btn-interior"
                onClick={() => {
                  state.intro = true;
                  // interiorView();
                }}
                // onClick={() => interiorView()}
              ></button>
              <button
                className={!isDark ? "btn-light" : "btn-light-turned-on"}
                onClick={() => setIsDark(!isDark)}
              ></button>
              <button className="btn-animation" onClick={() => carAnimation()}>
                Start Stop
              </button>
            </>
          )}
          {state.intro && (
            <button
              className="btn-outside"
              onClick={() => {
                state.intro = false;
                // interiorView();
              }}
            ></button>
          )}
        </>
      )}
      <Canvas
        dpr={[1, 2]}
        gl={{
          powerPreference: "high-performance",
          alpha: true,
          antialias: false,
          stencil: false,
          logarithmicDepthBuffer: true,
        }}
      >
        <Suspense fallback={null}>
          <Brabus color={snap.color} open={snap.intro} />
          <Garage />
          <ambientLight intensity={0.1} />
          <ContactShadows
            resolution={1024}
            frames={1}
            position={[0, -1.16, 0]}
            scale={15}
            blur={0.5}
            opacity={0.7}
            far={20}
          />
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[-1.4, 1.94, 6.65]}
          />
          <OrbitControls
            ref={orbitControls}
            camera={cameraRef.current}
            autoRotate={true}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            maxDistance={7}
            minDistance={4}
            makeDefault
          />
          {isDark ? (
            <>
              <color attach="background" args={["#000000"]} />
            </>
          ) : (
            <>
              <color attach="background" args={["#FFFFFF"]} />
              <Environment files="/textures/env.hdr" resolution={0} />
            </>
          )}
          {isDark && (
            <>
              <CarLight position={[-2.183, -0.255, 0.606]} />
              <CarLight position={[-1.544, -0.256, 1.655]} />
            </>
          )}
          <EffectComposer disableNormalPass>
            <Bloom
              luminanceThreshold={10}
              mipmapBlur
              luminanceSmoothing={0.4}
              intensity={0.2}
            />
          </EffectComposer>
        </Suspense>
        <CameraPosition />
      </Canvas>
      <div className="parentBtn">
        <button
          className="colorBtn bg-red"
          onClick={() => (state.color = "#300202")}
        />
        <button
          className="colorBtn bg-white"
          onClick={() => (state.color = "#150129")}
        />
        <button
          className="colorBtn bg-black"
          onClick={() => (state.color = "#2D2C2C")}
        />
      </div>
      <Title />
      <Loading />
    </>
  );
}
