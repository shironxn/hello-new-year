"use client";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import { useEffect, useState } from "react";

export default function Fireworks() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const initParticles = async () => {
      await initParticlesEngine(async (engine) => {
        await loadFireworksPreset(engine);
      }).then(() => {
        setInit(true);
      });
    };

    initParticles();
  }, []);

  if (init) {
    return (
      <div>
        <Particles options={{ preset: "fireworks" }} />
      </div>
    );
  }
}
