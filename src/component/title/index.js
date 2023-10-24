import React, { useEffect, useState } from "react";
import gsap from "gsap";

export default function Title() {
  const [hide, setHide] = useState(false);
  const blurText = (id, time) => {
    gsap.fromTo(
      "#" + id,
      {
        textShadow: "0 0 300px #e6e5e3",
      },
      {
        duration: 4,
        delay: time,
        ease: "power1.out",
        textShadow: "0 0 0px #e6e5e3",
      }
    );
  };
  const hideText = (id, time) => {
    gsap.to("#" + id, {
      duration: 2,
      delay: time,
      ease: "power1.out",
      opacity: 0,
      onComplete: () => {
        setHide(true);
      },
    });
  };
  useEffect(() => {
    blurText("t_we", 1);
    blurText("t_l", 2);
    blurText("t_com", 3);
    blurText("t_e", 1);
    blurText("t_spore", 2);
    blurText("t_world", 3);
  }, []);
  return hide ? null : (
    <p id="parent_title">
      <span id="t_we">B</span>
      <span id="t_l">R</span>
      <span id="t_com">A</span>
      <span id="t_e">B</span>
      <span id="t_spore">U</span>
      <span id="t_world">S</span>
    </p>
  );
}
