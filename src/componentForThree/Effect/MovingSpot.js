import { Vector3 } from 'three'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { SpotLight, useDepthBuffer } from '@react-three/drei'

function Spot({ vec = new Vector3(), ...props }) {
  const light = useRef()
  const viewport = useThree((state) => state.viewport)
  useFrame((state) => {
    light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
    light.current.target.updateMatrixWorld()
  })
  return <SpotLight castShadow ref={light} penumbra={1} distance={6} angle={0.35} attenuation={5} anglePower={4} intensity={2} {...props} />
}

const MovingSpot = () => {

  const depthBuffer = useDepthBuffer({ frames: 1 })

  return (
    <>
      <Spot depthBuffer={depthBuffer} color="#0c8cbf" position={[3, 3, 2]} />
      <Spot depthBuffer={depthBuffer} color="#b00c3f" position={[1, 3, 0]} />
    </>
  )
}

export default MovingSpot;