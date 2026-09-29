import React from 'react';

export const Lighting: React.FC = () => {
  return (
    <>
      {/* Foundation ambient light - subtle cool tone */}
      <ambientLight color="#181B24" intensity={1.2} />

      {/* Main Front Key Light - sculpted upper illumination */}
      <directionalLight
        position={[2.0, 3.0, 4.0]}
        intensity={3.2}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Dedicated Portrait Face Fill - brings out eyes, glasses, and facial expression */}
      <pointLight
        position={[0, 0.3, 2.6]}
        intensity={2.8}
        distance={7}
        decay={1.8}
        color="#FFF6EA"
      />

      {/* Cool Side Fill Light - softens harsh shadow creases */}
      <directionalLight
        position={[-3.5, 1.0, 2.5]}
        intensity={1.4}
        color="#8B9BB4"
      />

      {/* Brilliant White Celestial Rim Light - crisp celestial outline */}
      <directionalLight
        position={[-3.0, 3.5, -2.5]}
        intensity={4.4}
        color="#FFFFFF"
      />

      {/* Secondary Crisp White Rim from Right */}
      <directionalLight
        position={[3.0, 2.0, -2.0]}
        intensity={2.2}
        color="#FFFFFF"
      />

      {/* Subtle Ground/Chest Uplight */}
      <directionalLight
        position={[0, -2.5, 1.5]}
        intensity={0.6}
        color="#282C38"
      />
    </>
  );
};
