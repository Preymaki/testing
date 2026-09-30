import React from 'react';
import { ScenePlanet01CirSave } from './scenes/ScenePlanet01CirSave';
import { ScenePlanet02DivineHeritage } from './scenes/ScenePlanet02DivineHeritage';
import { ScenePlanet03MakiIsKing } from './scenes/ScenePlanet03MakiIsKing';
import { ScenePlanet04ExploreMore } from './scenes/ScenePlanet04ExploreMore';
import { SceneSunAboutMe } from './scenes/SceneSunAboutMe';

export const SecondSection: React.FC = () => {
  return (
    <div
      id="universe-journey"
      className="relative w-full bg-black text-[#F8F8FA] flex flex-col"
      aria-label="Cinematic Universe Journey"
    >
      {/* 
        ==================================================
        CINEMATIC JOURNEY SCENE PIPELINE:
        1. PLANET 01: CirSave (Planet LEFT -> Content RIGHT)
        2. PLANET 02: Divine Heritage (Planet RIGHT -> Content LEFT)
        3. PLANET 03: Maki Is King Portfolio (Planet LEFT -> Content RIGHT)
        4. PLANET 04: Explore More Gateway (Planet RIGHT -> Content LEFT)
        5. SUN: About Me — Victor Isaac Macfoy (Sun Focal Point -> Content Beside Sun)
        ==================================================
      */}

      {/* STAGE 01: CIRSAVE */}
      <ScenePlanet01CirSave />

      {/* STAGE 02: DIVINE HERITAGE */}
      <ScenePlanet02DivineHeritage />

      {/* STAGE 03: MAKI IS KING PORTFOLIO */}
      <ScenePlanet03MakiIsKing />

      {/* STAGE 04: EXPLORE MORE GATEWAY */}
      <ScenePlanet04ExploreMore />

      {/* STAGE 05: THE WHITE SUN // ABOUT ME */}
      <SceneSunAboutMe />
    </div>
  );
};

export default SecondSection;
