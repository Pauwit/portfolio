---
title: "Neural Network From Scratch"
summary: A feedforward neural network written from scratch in C++, no ML libraries, trained on MNIST to classify handwritten digits.
stack: ["C++17", CMake]
githubUrl: "https://github.com/Pauwit/cpp-neural-net"
visibility: public
category: "Systems & From-scratch"
flagship: false
flagshipOrder: null
image: null
---

No PyTorch, no TensorFlow, just a hand-rolled `Matrix` class and the actual math: forward pass, backpropagation, and stochastic gradient descent, trained on MNIST to classify handwritten digits. Built to genuinely understand backpropagation rather than call `.fit()` on something else's implementation.

Every run parameter, layer sizes, learning rate, batch size, epoch count, lives in one centralized config, and trained weights persist to disk for reuse.
