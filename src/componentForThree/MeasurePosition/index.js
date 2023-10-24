import {TransformControls} from '@react-three/drei'
import { useEffect, useRef } from 'react';


const MeasurePosition = () => {
  const transform = useRef(null);
  useEffect(() => {
    // console.log('transform', transform.current)
  }, [ transform.current])
  return (
    <TransformControls>
      <mesh ref={transform}  name='measure' scale={0.01}>
        <boxGeometry/>
      </mesh>
    </TransformControls>
  )
}

export default MeasurePosition;