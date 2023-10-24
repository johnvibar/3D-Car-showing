// import { useLoader } from '@react-three/fiber'
// import { TextureLoader } from 'three/src/loaders/TextureLoader'

export function CarLight(props) {
  // const texture1 = useLoader(TextureLoader, 'textures/car-light.png');

  return (
    <>
      <pointLight position={[-2.183, -0.255, 0.606]} />
      <pointLight position={[-1.544, -0.256, 1.655]} />
    </>
  );
}
