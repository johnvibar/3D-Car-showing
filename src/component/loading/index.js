import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useProgress } from "@react-three/drei";
import { PuffLoader } from "react-spinners";

export default function Loading() {
  const { progress } = useProgress();
  const bg = useRef(null);
  const content = useRef(null);
  const [hide, setHide] = useState(false);
  const fadeOut = () => {
    gsap.to(content.current, {
      duration: 1,
      ease: "power1.out",
      opacity: 0,
      onComplete: () => {
        gsap.to(bg.current, {
          duration: 2,
          ease: "power1.out",
          opacity: 0,
          onComplete: () => {
            setHide(true);
          },
        });
      },
    });
  };
  useEffect(() => {
    if (progress === 100) fadeOut();
  }, [progress]);

  return hide ? null : (
    <div ref={bg} className="bg-color">
      <div className="parentTitle">
        <PuffLoader color="#D4DAE6" size={300} />
        <p className="loadingTitle">Loading...</p>
      </div>
    </div>
  );
}
