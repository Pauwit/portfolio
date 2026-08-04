---
title: "C++ Diffeomorphic Demons"
summary: Modernized a C implementation of the Diffeomorphic Demons medical image registration algorithm into C++, integrating FFTW for a large complexity reduction. Built during the CNRS internship to stabilize retinal video sequences.
stack: ["C++", FFTW, CMake]
githubUrl: "https://github.com/Drdaag/cpp-diffeomorphicDemon"
visibility: public
category: "Medical CV & Research"
flagship: false
flagshipOrder: null
image: null
---

Diffeomorphic Demons is a classical medical image registration technique: given two images, typically two scans of the same subject, it computes a smooth, invertible deformation field that aligns one to the other. Originally implemented in Matlab and later ported to C by the lab, this work modernized that C codebase into C++ as part of the CNRS internship at Institut Langevin, to help stabilize retinal video sequences.

The core contribution was integrating FFTW to move cross-correlation calculations into the frequency domain, drastically cutting algorithmic complexity and making the processing tractable in reasonable time, alongside smart-pointer-based memory management for the large data volumes involved. The mathematical design of the algorithm itself predates this work; the contribution here is architectural and performance engineering, not the underlying math. A reference Matlab script ships alongside the C++ implementation for direct comparison, built and tested on Windows via the MSYS2/MinGW toolchain.
