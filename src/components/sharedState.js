// sharedState.js
import { useState } from 'react';

export const useSharedState = () => {
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

  return {
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
    setScaLeftArm,
  };
};
