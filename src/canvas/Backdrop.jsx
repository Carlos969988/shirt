import React, { useRef } from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import state from '../store'; 
import { useFrame } from '@react-three/fiber';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';


const Backdrop = () => {
  const shadows = useRef();
  const snap = useSnapshot(state);

  return (

    //In these parts to modify the background color and rotation
      <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.80}
      scale={10}
      rotation={[Math.PI / 2,0,0]}
      position={[0, 0, -0.14]}
      >
      <spotLight color={snap.color} position={[-2, 5, -5]} intensity={1} />

      {/* In this case it is to modify the effect of the shadows  */}
      <RandomizedLight
        color={snap.color}
        amount={4}
        radius={9}
        intensity={0.9}
        ambient={0.25}
        position={[5, 5, -10]}
      />
       <RandomizedLight
        color={snap.color}
        amount={4}
        radius={5}
        intensity={0.9}
        ambient={0.25}
        position={[-5, 5, -9]}
      />

      <directionalLight color={snap.color} intensity={0.5} position={[0, 0, -1]} />
      
    </AccumulativeShadows>
  )
}

export default Backdrop