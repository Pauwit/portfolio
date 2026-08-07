---
title: "Multi-Agent Path Finding for Drone Coordination"
summary: Collision-free trajectory planning for a drone fleet in continuous 3D airspace, modeled as CP-SAT, Conflict-Based Search, and space-time A*, with a Three.js 3D frontend.
stack: [Python, "CP-SAT", Flask, "Three.js", Jupyter]
githubUrl: "https://github.com/Pauwit/mapf-drone-coordination"
visibility: public
category: Systems
flagship: false
flagshipOrder: null
image: null
---

Built for EPITA's Constraint Programming course with Matteo Atkinson: computes optimal trajectories for a fleet of drones sharing open 3D airspace, avoiding collisions under NOTAM zones, ATC separation minimums, dynamic weather, and 3D obstacles. Unlike a warehouse-grid MAPF variant, the search space is continuous, with real 3D collision constraints and safety margins.

Four algorithms implemented side by side: CP-SAT modeling, Conflict-Based Search plus Enhanced CBS, space-time A*/BFS, and Operator Decomposition A*. A Flask backend serves eleven pre-defined scenarios to a 3D web frontend built in Three.js, with animated drone rendering and user controls.
