import { useThree } from '@react-three/fiber'

const CameraPosition = () => {
  const { camera } = useThree();
  // console.log('camera position: ', camera.position);
  // console.log('camera rotation: ', camera.rotation);
  return (
    <>
      <mesh />
    </>
  )
}

export default CameraPosition;