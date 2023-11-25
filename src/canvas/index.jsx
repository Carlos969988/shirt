import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Center } from '@react-three/drei';

import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';


const CanvasModel = () => {    

  return (
      <Canvas

        shadows
        // This part is about modifying the position and zoom that the object will have, in this case the shirt.
        camera={{position:[0,0,0],fov:25}}
        gl={{preserveDrawingBuffer:true}}
        className='w-full max-w-full h-full transition-all ease-in'
        >

        <OrbitControls
        // ref={shirtRef}
        enablePan={true} // Permite el paneo (movimiento lateral)
        enableZoom={false} // Permite el zoom
        enableRotate={false} // Permite la rotación
        // maxPolarAngle={Math.PI / 2} // Limita la rotación vertical
        // minPolarAngle={0} // Limita la rotación vertical
        maxAzimuthAngle={Infinity} // Rotación horizontal ilimitada
        minAzimuthAngle={-Infinity} // Rotación horizontal ilimitada
        />
        <ambientLight intensity={0.3}/>
        <Environment preset='city'/>
        <CameraRig>
          <Backdrop />
            <Center>
              < Shirt />
            </Center>
        </CameraRig>
      </Canvas>
    )
}

export default CanvasModel



// import React, { useState, useRe, useEffect } from 'react';
// import { Canvas, useThree, useFrame } from '@react-three/fiber';
// import { OrbitControls, TransformControls, Environment, Center } from '@react-three/drei';

// import Shirt from './Shirt';
// import Backdrop from './Backdrop';
// import CameraRig from './CameraRig';


// const CanvasModel = () => {

//   // const shirtRef = useRef();
//   // const transformRef = useRef();  

//   return (
//     <Canvas
//     shadows
//     // This part is about modifying the position and zoom that the object will have, in this case the shirt.
//     camera={{position:[0,0,0],fov:25}}
//     gl={{preserveDrawingBuffer:true}}
//     className='w-full max-w-full h-full transition-all ease-in'
//     >
//       <OrbitControls
//         // ref={shirtRef}
//         enablePan={true} // Permite el paneo (movimiento lateral)
//         enableZoom={false} // Permite el zoom
//         enableRotate={false} // Permite la rotación
//         // maxPolarAngle={Math.PI / 2} // Limita la rotación vertical
//         // minPolarAngle={0} // Limita la rotación vertical
//         maxAzimuthAngle={Infinity} // Rotación horizontal ilimitada
//         minAzimuthAngle={-Infinity} // Rotación horizontal ilimitada
//       />
//       <ambientLight intensity={0.3}/>
//       <Environment preset='city'/>

//       <CameraRig>
//         <Backdrop/>
//           <Center>
//             {/* <TransformControls mode="rotate" object={shirtRef.current}> */}
//               <Shirt />
//             {/* </TransformControls> */}
//           </Center>
//       </CameraRig>
//     </Canvas>
//     )
// }

// export default CanvasModel