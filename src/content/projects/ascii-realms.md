---
title: "ASCII Realms"
summary: A turn-based RPG that runs entirely in the terminal, with a 51x51 procedurally generated world, combat, enemy AI, and looting.
stack: ["C++", CMake, "Perlin Noise"]
githubUrl: "https://github.com/Pauwit/ascii-realms"
visibility: public
category: "Fun Stuff"
flagship: false
flagshipOrder: null
image: null
---

Wake up with no memory on a procedurally generated continent, explore, fight, loot, and work up to two mid-bosses and a final boss, entirely in the terminal. The 51x51 world uses Perlin noise for both height and temperature, which jointly determine biome placement: plains, forest, desert, mountains, snow, ice, rivers, ocean.

Combat is turn-based with a weapon/defense system, and enemies carry distinct AI behaviors, wandering, chasing within a detection range, or fleeing. Started as a school project at Boston University in 2024 during an exchange semester, since reorganized off Visual Studio and onto CMake.
