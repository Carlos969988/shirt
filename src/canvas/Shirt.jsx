
import React, { useRef, useState } from 'react'
import { easing, three } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Html, Decal, useGLTF, useTexture, PresentationControls} from '@react-three/drei';

import state from '../store';
import { TextureLoader, AlphaFormat, MeshBasicMaterial, MeshStandardMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshNormalMaterial } from 'three';
import { useControls } from 'leva';
import { degToRad } from 'three/src/math/MathUtils';

const Shirt = () => {
  const snap = useSnapshot(state);

  const { nodes, materials } = useGLTF('shirt_baked.glb');
  // const { nodes, materials } = useGLTF('shirt.glb');

  const basicMaterial = new MeshBasicMaterial({ color: materials.lambert1.color });
  const standardMaterial = new MeshStandardMaterial({ color: materials.lambert1.color });
  const lambertMaterial = new MeshLambertMaterial({ color: materials.lambert1.color });
  // const normalMaterial = new MeshNormalMaterial({ color: materials.lambert1.color });
  const matcapMaterial = new MeshMatcapMaterial({ color: materials.lambert1.color });
  const phongMaterial = new MeshPhongMaterial({ color: materials.lambert1.color });
  const physicalMaterial = new MeshPhysicalMaterial({ color: materials.lambert1.color });  

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  const decal = useRef();

  const [pos, setPos] = useState([0, 0.04, 0.15]);
  const [rota, setRota] = useState([0, 0, 0]);
  const [sca, setSca] = useState([0.15, 0.15, 0.15]);

  useControls ({
    Horizontal: {
      min: degToRad(-50),
      max: degToRad(50),
      value: 0,
      step: 0.01,
      onChange: (value) => {
        decal.current.rotation.y = value;
        // const x = Math.cos(value);
        // const z = Math.sin(value);
        // const rot = Math.atan2(x, z);
        // setRota(() => [0, rot, 0])
        // setPos((pos) => [x, pos[1], z]);
      },
    },
    Vertical: {
      min: degToRad(-15),
      max: degToRad(10),
      value: 0,
      step: 0.01,
      onChange: (value) => {
        // decal.current.rotation.x = value;

        setPos((pos) => [pos[0], value, pos[2]]);
      },
    },
    Tamaño: {
      min: 0.05,
      max: 0.5,
      value: 0.15,
      step: 0.01,
      onChange: (value) => {
        // decal.current.scale.set(value, value, 0.15);
        setSca(() => [value, value, 0.15]);
      },
    },
  });


  // useFrame(() => {
  //   if (decal.current) {
  //     decal.current.position.copy(pos);
  //     decal.current.rotation.copy(rota);
  //     decal.current.scale.copy(sca);
  //   }
  // });

  // Front
  const createDecal = (texture, position, scale) => (
  // const createDecal = (texture, position, scale) => (
    <Decal 
      ref={decal}
      debug
      material={new MeshStandardMaterial({ transparent: false, alphaTest: 0 })} // Material con transparencia
      // position={position}
      position={pos}
      rotation={rota}
      // scale={scale} 
      scale={sca}
      map={texture}
      mapAnisotropy={16}
      depthTest={false}
      depthWrite={true}
    />
  );

   // Back
   const backDecal = (texture) => (
    <Decal
      ref={decal}
      debug
      material={new MeshStandardMaterial({ transparent: false, alphaTest: 0 })} // Material con transparencia
      map={texture}
      position={state.backPosition}
      rotation={[0, Math.PI, 0]} 
      scale={state.scaleBack}
      mapAnisotropy={16}
      depthTest={false}
      depthWrite={true}
    />
  );

  // Left Arm
  const leftSleeveDecal = (texture) => (
    <Decal
      debug
      material={new MeshStandardMaterial({ transparent: false, alphaTest: 0 })} // Material con transparencia
      map={texture}
      position={state.leftSleevePosition}
      rotation={[0, -Math.PI / 2, 0]}
      scale={state.scaleLeft}
      mapAnisotropy={16}
      depthTest={false}
      depthWrite={true}
    />
  );

  // Right Arm
  const rightSleeveDecal = (texture) => (
    <Decal
      debug
      material={new MeshStandardMaterial({ transparent: false, alphaTest: 0 })} // Material con transparencia
      map={texture}
      position={state.rightSleevePosition}
      rotation={[0, Math.PI / 2, 0]} 
      scale={state.scaleRight}
      mapAnisotropy={16}
      depthTest={false}
      depthWrite={true} 
    />
  );

  useFrame((state, delta) => {
    if (standardMaterial) {
      easing.dampC(standardMaterial.color, snap.color, 0.25, delta);
    }
  });

  // useFrame((state, delta) => {
  //   if (materials.lambert1) {
  //     easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  //   };
  // });

  // useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  const stateString = JSON.stringify(snap);

  return (

    <PresentationControls
    speed={0.9}
    global
    // zoom={10}
    rotation={[0, 0, 0]} // Default rotation
    polar={[0, Math.PI / 2]} // Vertical limits
    // azimuth={[-Infinity, Infinity]} // Horizontal limits
    >

    <group key={stateString}>

      {/* // Left Arm */}
      {/* <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1}
        dispose={null}> */}
      <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={standardMaterial} material-roughness={1}
        dispose={null}>
        {state.isFullTexture && leftSleeveDecal(fullTexture, [0, 0, 0], 1)}
        {state.isLogoTexture && leftSleeveDecal(logoTexture, state.position, state.scale)}
      </mesh>

      {/* // Right Arm */}
      <mesh castShadow geometry={nodes.T_Shirt_male001.geometry} material={standardMaterial} material-roughness={1}
        dispose={null}>
        {state.isFullTexture && rightSleeveDecal(fullTexture, [0, 0, 0], 1)}
        {state.isLogoTexture && rightSleeveDecal(logoTexture, state.position, state.scale)}
      </mesh>

      {/* // Back */}
      <mesh castShadow geometry={nodes.T_Shirt_male002.geometry} material={standardMaterial} material-roughness={1}
        dispose={null}>
        {state.isFullTexture && backDecal(fullTexture, [0, 0, 0], 1)}
        {state.isLogoTexture && backDecal(logoTexture, state.position, state.scale)}
      </mesh>

      {/* // Front */}
      <mesh castShadow geometry={nodes.T_Shirt_male003.geometry} material={standardMaterial} material-roughness={1}
        dispose={null}>
        {state.isFullTexture && createDecal(fullTexture, [0, 0, 0], 1)}
        {state.isLogoTexture && createDecal(logoTexture, state.position, state.scale)}
      </mesh>

    </group>
    </PresentationControls>
    
  );
  
}

export default Shirt;



//   useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

//   const stateString = JSON.stringify(snap);

//   return (
//     <group key={stateString}>
//       <mesh
//         castShadow
//         geometry={nodes.T_Shirt_male.geometry}
//         material={materials.lambert1}
//         material-roughness={1}
//         dispose={null}
//       >
//         {snap.isFullTexture && (
//           <Decal 
//             position={[0, 0, 0]}
//             rotation={[0, 0, 0]}
//             scale={1}
//             map={fullTexture}
//           />
//         )}

//         {snap.isLogoTexture && (
//           <Decal 
//             position={state.position}
//             rotation={[0,0, 0]}
//             scale={state.scale}
//             map={logoTexture}
//             mapAnisotropy={16}
//             depthTest={false}
//             depthWrite={true}
//           />
//         )}
//         {console.log(state.p1)}
//         {console.log(materials.lambert1)}

//       </mesh>
//       <mesh
//         castShadow
//         geometry={nodes.T_Shirt_male001.geometry}
//         material={materials.lambert1}
//         material-roughness={1}
//         dispose={null}
//       >
//         {snap.isFullTexture && (
//           <Decal 
//             position={[0, 0, 0]}
//             rotation={[0, 0, 0]}
//             scale={1}
//             map={fullTexture}
//           />
//         )}

//         {snap.isLogoTexture && (
//           <Decal 
//             position={state.position}
//             rotation={[0,0, 0]}
//             scale={state.scale}
//             map={logoTexture}
//             mapAnisotropy={16}
//             depthTest={false}
//             depthWrite={true}
//           />
//         )}
//         {console.log(state.p1)}
//       </mesh>
//       <mesh
//         castShadow
//         geometry={nodes.T_Shirt_male002.geometry}
//         material={materials.lambert1}
//         material-roughness={1}
//         dispose={null}
//       >
//         {snap.isFullTexture && (
//           <Decal 
//             position={[0, 0, 0]}
//             rotation={[0, 0, 0]}
//             scale={1}
//             map={fullTexture}
//           />
//         )}

//         {snap.isLogoTexture && (
//           <Decal 
//             position={state.position}
//             rotation={[0,0, 0]}
//             scale={state.scale}
//             map={logoTexture}
//             mapAnisotropy={16}
//             depthTest={false}
//             depthWrite={true}
//           />
//         )}
//         {console.log(state.p1)}
//       </mesh>
//       <mesh
//         castShadow
//         geometry={nodes.T_Shirt_male003.geometry}
//         material={materials.lambert1}
//         material-roughness={1}
//         dispose={null}
//       >
//         {snap.isFullTexture && (
//           <Decal 
//             position={[0, 0, 0]}
//             rotation={[0, 0, 0]}
//             scale={1}
//             map={fullTexture}
//           />
//         )}

//         {snap.isLogoTexture && (
//           <Decal 
//             position={state.position}
//             rotation={[0,0, 0]}
//             scale={state.scale}
//             map={logoTexture}
//             mapAnisotropy={16}
//             depthTest={false}
//             depthWrite={true}
//           />
//         )}
//         {console.log(state.p1)}
//       </mesh>
//     </group>
//   )
// }

// export default Shirt