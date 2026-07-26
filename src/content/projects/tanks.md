---
title: "Tanks in a Nutshell"
summary: A real-time multiplayer tank battle game, written entirely by hand without AI assistance, with a custom game loop and full gamepad support.
stack: ["React 19", Vite, TypeScript, Firebase, "HTML5 Canvas"]
githubUrl: "https://github.com/Pauwit/tanks"
visibility: public
category: "Fun Stuff"
flagship: false
flagshipOrder: null
image: null
---

Every line of this one was written by hand, no AI assistance, as a deliberate deep dive into game engine fundamentals: physics, collisions, multiplayer state, and rendering without leaning on a heavy off-the-shelf framework. A lobby system handles creating and joining matches, Firebase Realtime Database synchronizes player positions, rotations, projectiles, and explosions across clients, and a custom game loop runs decoupled from React's render cycle so physics stays smooth regardless of UI updates.

Full dual-stick gamepad support sits alongside keyboard and mouse, and rendering runs on the HTML5 Canvas API.
