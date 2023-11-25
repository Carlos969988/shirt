// // state.js
// import { proxy } from 'valtio';

// const state = proxy({
//   intro: true,
//   color: '#EFBD48',
//   isLogoTexture: true,
//   isFullTexture: false,
//   // Define posiciones y escalas individuales para cada parte de la camiseta
//   frontPosition: [0, 0.04, 0.15],
//   //     position: [0, 0.04, 0.15],
//   backPosition: [0, 0, -0.1],
//   leftSleevePosition: [-0.5, 0, 0],
//   rightSleevePosition: [0.5, 0, 0],
//   // Asumiendo que la escala será la misma para todas las partes por simplicidad
//   decalScale: [0.15, 0.15, 0.15],
//   logoDecal: './kamaxtli.png',
//   fullDecal: './kamaxtli.png',
// });

// export default state;


import { proxy } from "valtio";

const state = proxy({
    intro: true,
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    position: [0, 0.04, 0.15],
    // backPosition: [0, 0.14, -0.15],
    backPosition: [0, 0.20, -0.08],
    leftSleevePosition: [-0.23, 0.08, -0.01],
    rightSleevePosition: [0.25, 0.08, -0.01],
    scale:0.15,
    scaleRight:0.075,
    scaleLeft:0.075,
    scaleBack:0.08,

    decalScale: 0.6,
    // position: [0, 0.04, 0.15],
    // scale:0.15,
    logoDecal: './kamaxtli.png',
    fullDecal: './kamaxtli.png',
});

export default state;