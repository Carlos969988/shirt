import React, { useState } from 'react';

import { useControls } from 'leva';
import { degToRad } from 'three/src/math/MathUtils';
import { useSharedState } from "../components/sharedState";

const useCustomControls = () => {
    const {
        pos,
        setPos,
        posBack,
        setPosBack,
        posRight,
        setPosRight,
        posLeft,
        setPosLeft,
        rota,
        setRota,
        rotaBack,
        setRotaBack,
        rotaArms,
        setRotaArms,
        sca,
        setSca,
        scaBack,
        setScaBack,
        scaRightArm,
        setScaRightArm,
        scaLeftArm,
        setScaLeftArm
    } = useSharedState();  

    const front = useControls('Pecho', {
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
         
          Imagen: {
            logoTexture: false,
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
          Imagen: {
            logoTexture: false,
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
          Imagen: {
            logoTexture: false,
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
          Imagen: {
            logoTexture: false,
          },
    });
  
    return { front, back, right, left };
  };
  
  export default useCustomControls;