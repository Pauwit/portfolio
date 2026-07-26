---
title: "C++ Diffeomorphic Demons"
summary: A C++ port of the Diffeomorphic Demons medical image registration algorithm, aligning two scans via a smooth, invertible deformation field.
stack: ["C++", FFTW, CMake]
githubUrl: "https://github.com/Drdaag/cpp-diffeomorphicDemon"
visibility: public
category: "Medical CV & Research"
flagship: false
flagshipOrder: null
image: null
---

Diffeomorphic Demons is a classical medical image registration technique, originally implemented in Matlab, this project ports it to C++. Given two images, typically two medical scans of the same subject, it computes a smooth, invertible deformation field that aligns one to the other.

The FFT-based core computations run on FFTW, statically linked, with a reference Matlab script shipped alongside the C++ implementation for direct comparison. Built and tested on Windows via the MSYS2/MinGW toolchain, with a group of three.
