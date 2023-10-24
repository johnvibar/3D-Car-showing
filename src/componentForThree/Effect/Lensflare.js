import { useLoader } from '@react-three/fiber'
import { folder, useControls } from 'leva'
import { LUTCubeLoader } from 'postprocessing'
import { Vignette, EffectComposer, Bloom } from "@react-three/postprocessing";
import { LensFlare } from "@andersonmancini/lens-flare";
import { Color } from "three";

const Lensflare = () => {
  // const texture = useLoader(LUTCubeLoader, '/model/F-6800-STD.cube')

  const lensFlareProps = useControls({
    LensFlare: folder(
      {
        enabled: { value: true, label: "enabled?" },
        opacity: { value: 0.17, min: 0.0, max: 1.0, label: "opacity" },
        position: {
          value: { x: -25, y: 6, z: -60 },
          step: 1,
          label: "position",
        },
        glareSize: { value: 0.35, min: 0.01, max: 1.0, label: "glareSize" },
        starPoints: {
          value: 6.0,
          step: 1.0,
          min: 0,
          max: 32.0,
          label: "starPoints",
        },
        animated: { value: false, label: "animated?" },
        followMouse: { value: false, label: "followMouse?" },
        anamorphic: { value: false, label: "anamorphic?" },
        colorGain: { value: new Color(56, 22, 11), label: "colorGain" },

        Flare: folder({
          flareSpeed: {
            value: 0.4,
            step: 0.001,
            min: 0.0,
            max: 1.0,
            label: "flareSpeed",
          },
          flareShape: {
            value: 0.1,
            step: 0.001,
            min: 0.0,
            max: 1.0,
            label: "flareShape",
          },
          flareSize: {
            value: 0.005,
            step: 0.001,
            min: 0.0,
            max: 0.01,
            label: "flareSize",
          },
        }),

        SecondaryGhosts: folder({
          secondaryGhosts: { value: false, label: "secondaryGhosts?" },
          ghostScale: { value: 0.1, min: 0.01, max: 1.0, label: "ghostScale" },
          aditionalStreaks: { value: true, label: "aditionalStreaks?" },
        }),

        StartBurst: folder({
          haloScale: { value: 0.5, step: 0.01, min: 0.3, max: 1.0 },
        }),
      }
    ),
  });
  return (
    <EffectComposer disableNormalPass>
      <LensFlare {...lensFlareProps} dirtTextureFile={"/textures/car-light.png"} />
    </EffectComposer>
  )
}

export default Lensflare;