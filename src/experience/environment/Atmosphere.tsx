import React from 'react';
import { Stars } from '@react-three/drei';

export const Atmosphere: React.FC = () => {
  return (
    <group>
      {/* High-visibility celestial starfield against pure black deep space */}
      <Stars
        radius={50}
        depth={35}
        count={850}
        factor={3.5}
        saturation={0}
        fade
        speed={0.5}
      />
    </group>
  );
};
