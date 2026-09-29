import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { MousePosition } from '../../hooks/useMousePosition';

interface CameraControllerProps {
  mousePos: MousePosition;
}

export const CameraController: React.FC<CameraControllerProps> = ({ mousePos }) => {
  const { camera, viewport } = useThree();
  const targetCamPos = useRef(new THREE.Vector3());
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    const isMobile = viewport.width < 5.5;
    const isTablet = viewport.width >= 5.5 && viewport.width < 9;

    // Base camera coordinates
    const baseZ = isMobile ? 4.8 : isTablet ? 4.2 : 3.8;
    const baseY = isMobile ? 0.05 : 0.12;

    // Subtle parallax shifts (kept very restrained to prevent motion sickness)
    const parallaxX = mousePos.x * (isMobile ? 0.08 : 0.18);
    const parallaxY = -mousePos.y * (isMobile ? 0.05 : 0.12);

    targetCamPos.current.set(parallaxX, baseY + parallaxY, baseZ);

    const lerpFactor = Math.min(delta * 3.5, 1.0);
    camera.position.lerp(targetCamPos.current, lerpFactor);

    // Dynamic look target: subtly shifts with mouse
    lookTarget.current.set(mousePos.x * 0.06, -mousePos.y * 0.04, 0);
    camera.lookAt(lookTarget.current);
  });

  return null;
};
