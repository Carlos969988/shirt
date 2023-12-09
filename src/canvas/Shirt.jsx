
import React, { useRef, useState, useEffect, useMemo} from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture, PresentationControls} from '@react-three/drei';

import state from '../store';
import { TextureLoader, AlphaFormat, MeshBasicMaterial, MeshStandardMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshNormalMaterial } from 'three';
import { useControls, Leva, levaStore } from 'leva'
// import { useControls,  } from 'leva';
import { degToRad } from 'three/src/math/MathUtils';
import MaterialMenu from './MaterialMenu' 
import useCustomControls from "../components/UseControls";
import { useSharedState } from "../components/sharedState";
import '../index.css';

const Shirt = () => {
  const snap = useSnapshot(state);

  const { nodes, materials } = useGLTF('shirt_baked.glb');
  // const { nodes, materials } = useGLTF('shirt.glb');

  const materialOverrides = useMemo(() => {
    return {
      0: materials['cerrar-detalle-textura-ropa-acogedora'],
      1: materials['cerrar-detalles-textura-lana'],
      2: materials['cerrar-textura-tela'],
      3: materials['jersey-lana-rojo'],
      4: materials['endecha-plana-tela'],
      5: materials['fondo-textura-raso-blanco']
    }
  }, [materials]);

  const basicMaterial = new MeshBasicMaterial({ color: materials.lambert1.color });
  const standardMaterial = new MeshStandardMaterial({ color: materials.lambert1.color, wireframe: false, flatShading: true,});
  const lambertMaterial = new MeshLambertMaterial({ color: materials.lambert1.color });
  // const normalMaterial = new MeshNormalMaterial({ color: materials.lambert1.color });
  const matcapMaterial = new MeshMatcapMaterial({ color: materials.lambert1.color });
  const phongMaterial = new MeshPhongMaterial({ color: materials.lambert1.color });
  const physicalMaterial = new MeshPhysicalMaterial({ color: materials.lambert1.color });  

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  const fullTextureFront = useTexture(snap.fullDecal1);
  const fullTextureBack = useTexture(snap.fullDecal2);
  const fullTextureRight = useTexture(snap.fullDecal3);
  const fullTextureLeft = useTexture(snap.fullDecal);


  const decal = useRef();

  const ref = useRef()
  const [selected, setSelected] = useState(0)

  const [pos, setPos] = useState([0, 0.04, 0.15]);
  const [posBack, setPosBack] = useState([0, 0.20, -0.08]);
  const [posRight, setPosRight] = useState([-0.28, 0.08, -0.01]);
  const [posLeft, setPosLeft] = useState([0.28, 0.08, -0.01]);
  const [rota, setRota] = useState([0, 0, 0]);
  const [rotaBack, setRotaBack] = useState([0, 0, 0]);
  const [rotaArms, setRotaArms] = useState([0, 0, 0]);
  const [sca, setSca] = useState([0.15, 0.15, 0.15]);
  const [scaBack, setScaBack] = useState([0.08, 0.08, 0.08]);
  const [scaRightArm, setScaRightArm] = useState([0.075, 0.075, 0.075]);
  const [scaLeftArm, setScaLeftArm] = useState([0.075, 0.075, 0.075]);

  // const {
  //   pos, setPos, posBack, setPosBack, posRight, setPosRight, posLeft, setPosLeft, rota, setRota, rotaBack, 
  //   setRotaBack, rotaArms, setRotaArms, sca, setSca, scaBack, setScaBack, scaRightArm, setScaRightArm, scaLeftArm, setScaLeftArm 
  // } = useSharedState();

  // const { front, back, right, left } = useCustomControls();


  const front = useControls('Pecho', {
    value: 'green',

    Horizontal: {
      min: degToRad(-70),
      max: degToRad(60),
      value: 0,
      step: 0.001,
      onChange: (value) => {
        // decal.current.rotation.y = value;
        const x = 0.10 * Math.cos(value); // Ajusta el valor 0.5 según tu necesidad
        const z = 0.22 * Math.sin(value); // Ajusta el valor 0.5 según tu necesidad
        const rot = Math.atan2(z, x);
        setRota(() => [0, rot, 0]);  
        setPos((pos) => [z, pos[1], x]);
  
      },
    },
    Vertical: {
      min: degToRad(-15),
      max: degToRad(10),
      value: 0,
      step: 0.01,
      onChange: (value) => {
        setPos((pos) => [pos[0], value, pos[2]]);
      },
    },
    Tamaño: {
      min: 0.05,
      max: 0.5,
      value: 0.15,
      step: 0.01,
      onChange: (value) => {
        setSca(() => [value, value, 0.15]);
      },
    },
  
  });

  const back = useControls('Espalda', {
    Horizontal: {
      min: degToRad(-60),
      max: degToRad(60),
      value: 0,
      step: 0.01,
      onChange: (value) => {
        const x = -0.10 * Math.cos(value); // Ajusta el valor 0.5 según tu necesidad
        const z = -0.24 * Math.sin(value); // Ajusta el valor 0.5 según tu necesidad
        const rot = Math.atan2(z, x);
        setRotaBack(() => [0, rot, 0]);  
        setPosBack((posBack) => [z, posBack[1], x]);

      },
    },
    Vertical: {
      min: degToRad(-15),
      max: degToRad(10),
      value: 0.17,
      step: 0.01,
      onChange: (value) => {
        setPosBack((posBack) => [posBack[0], value, posBack[2]]);
      },
    },
    Tamaño: {
      min: 0.05,
      max: 0.5,
      value: 0.10,
      step: 0.01,
      onChange: (value) => {
        setScaBack(() => [value, value, 0.15]);
      },
    },
  });  
  const right = useControls('Brazo Derecho', {
    Horizontal: {
      min: degToRad(40),
      max: degToRad(130),
      value: 1.85,
      step: 0.01,
      onChange: (value) => {
        const x = 0.10 * Math.cos(value); // Ajusta el valor 0.5 según tu necesidad
        const z = 0.25 * Math.sin(value); // Ajusta el valor 0.5 según tu necesidad
        const rot = Math.atan2(z, x);
        setRotaArms(() => [rot, 0, 0]);  
        setPosRight((posRight) => [z, posRight[1], x]);
      },
    },
    Vertical: {
      min: degToRad(2),
      max: degToRad(8),
      value: 0.10,
      step: 0.01,
      onChange: (value) => {
        setPosRight((posRight) => [posRight[0], value, posRight[2]]);
      },
    },
    Tamaño: {
      min: 0.05,
      max: 0.1,
      value: 0.10,
      step: 0.01,
      onChange: (value) => {
        setScaRightArm(() => [value, value, 0.075]);
      },
    },
  }); 
  const left = useControls('Brazo Izquierdo', {
    Horizontal: {
      min: degToRad(50),
      max: degToRad(120),
      value: 1.45,
      step: 0.01,
      onChange: (value) => {
        const x = -0.15 * Math.cos(value); // Ajusta el valor 0.5 según tu necesidad
        const z = -0.24 * Math.sin(value); // Ajusta el valor 0.5 según tu necesidad
        const rot = Math.atan2(z, x);
        setRotaArms(() => [0, 0, 0]);  
        setPosLeft((posLeft) => [z, posLeft[1], x]);
      },
    },
    Vertical: {
      min: degToRad(2),
      max: degToRad(8),
      value: 0.10,
      step: 0.01,
      onChange: (value) => {
        setPosLeft((posLeft) => [posLeft[0], value, posLeft[2]]);
      },
    },
    Tamaño: {
      min: 0.05,
      max: 0.1,
      value: 0.10,
      step: 0.01,
      onChange: (value) => {
        setScaLeftArm(() => [value, value, 0.075]);
      },
    },
  }); 
  
  const createDecal = (fullTextureFront) => (
  // const createDecal = (texture, position, scale) => (
    <Decal 
      ref={decal}
      // debug
      material={new MeshStandardMaterial({ transparent: false, alphaTest: 0,} )} // Material con transparencia
      // position={position}
      position={pos}
      rotation={rota}
      // scale={scale} 
      scale={sca}
      map={fullTextureFront}
      mapAnisotropy={16}
      depthTest={false}
      depthWrite={true}
    />
  );

   // Back
   const backDecal = (texture) => (
    <Decal
      ref={decal}
      // debug
      rotation={rotaBack}
      material={new MeshStandardMaterial({ transparent: false, alphaTest: 0 })} // Material con transparencia
      map={texture}
      position={posBack}
      // rotation={[0, Math.PI, 0]} 
      scale={scaBack}
      mapAnisotropy={16}
      depthTest={false}
      depthWrite={true}
    />
  );

  // Left Arm
  const leftSleeveDecal = (texture) => (
    <Decal
      // ref={leftSleeveDecalRef}
      ref={decal}
      // debug
      material={new MeshStandardMaterial({ transparent: false, alphaTest: 0 })} // Material con transparencia
      map={texture}
      position={posLeft}
      rotation={[0, -Math.PI / 2, 0]}
      scale={scaLeftArm}
      mapAnisotropy={16}
      depthTest={false}
      depthWrite={true}
    />
  );

  // Right Arm
  const rightSleeveDecal = (texture) => (
    <Decal
      // ref={rightSleeveDecalRef}
      ref={decal}
      // debug
      material={new MeshStandardMaterial({ transparent: false, alphaTest: 0 })} // Material con transparencia
      map={texture}
      position={posRight}
      rotation={[0, Math.PI / 2, 0]} 
      scale={scaRightArm}
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
    // polar={[-Infinity, Infinity]} // Sin límites verticales
    // azimuth={[-Infinity, Infinity]} // Sin límites horizontales
    >
      
    <group key={stateString}>

       {/* // Front */}
       <mesh castShadow geometry={nodes.T_Shirt_male003.geometry} material={standardMaterial} material-roughness={1}
        dispose={null}>
      {/* <mesh ref={ref} geometry={nodes.T_Shirt_male003.geometry} material={materialOverrides[selected]} castShadow receiveShadow >
      <mesh geometry={nodes.T_Shirt_male003.geometry} material={materials.wooden_legs} castShadow /> */}

        {state.isFullTexture && createDecal(fullTextureBack, [0, 0, 0], 1)}
        {state.isLogoTexture && createDecal(logoTexture, state.position, state.scale)}
      </mesh>

      {/* // Back */}
      <mesh castShadow geometry={nodes.T_Shirt_male002.geometry} material={standardMaterial} material-roughness={1}
        dispose={null}>
        {state.isFullTexture && backDecal(fullTextureBack, [0, 0, 0], 1)}
        {state.isLogoTexture && backDecal(logoTexture, state.position, state.scale)}
      </mesh>

      {/* // Left Arm */}
      {/* <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1}
        dispose={null}> */}
      <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={standardMaterial} material-roughness={1}
        dispose={null}>
        {state.isFullTexture && leftSleeveDecal(fullTextureBack, [0, 0, 0], 1)}
        {state.isLogoTexture && leftSleeveDecal(logoTexture, state.position, state.scale)}
      </mesh>

      {/* // Right Arm */}
      <mesh castShadow geometry={nodes.T_Shirt_male001.geometry} material={standardMaterial} material-roughness={1}
        dispose={null}>
        {state.isFullTexture && rightSleeveDecal(fullTextureBack, [0, 0, 0], 1)}
        {state.isLogoTexture && rightSleeveDecal(logoTexture, state.position, state.scale)}
      </mesh>

    </group>
      
    {/* <MaterialMenu setSelected={setSelected} /> */}
    </PresentationControls>
    
  );
  
}

useGLTF.preload('shirt_baked.glb')

export default  Shirt;


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