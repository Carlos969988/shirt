// state.js

import { proxy } from "valtio";

const state = proxy({
    intro: true,
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    // isFullTextureFront: true,
    // isFullTextureBack: true,
    // isFullTextureRight: true,
    // isFullTextureLeft: true,
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
    customizerRendered: false,
    // position: [0, 0.04, 0.15],
    // scale:0.15,
    logoDecal: './kamaxtli.png',
    fullDecal: './kamaxtli.png',
    fullDecal1: './react.png',
    fullDecal2: './threejs.png',
    fullDecal3: './vite.svg',

});

export default state;