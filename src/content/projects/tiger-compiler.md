---
title: Tiger Compiler
summary: A complete compiler for the Tiger language targeting LLVM IR, built from scratch by a team of four across lexing, parsing, semantic analysis, and codegen.
stack: ["C++", LLVM, Bison, "RE/flex", Autotools]
githubUrl: null
visibility: private
category: Flagship
flagship: true
flagshipOrder: 4
image: null
---

A full compiler pipeline for the Tiger language (from *Modern Compiler Implementation*), targeting LLVM IR, built with three teammates over March to May 2025. The pipeline runs lexing (RE/flex) and parsing (Bison) into an AST, followed by AST cloning, scope binding and symbol resolution, desugaring, escape analysis for closures, object-model lowering, type checking, and finally LLVM code generation against LLVM 18.

Built with Autotools and a Nix flake, with optional static LLVM linking. An EPITA systems assignment, private by course policy, not pushed to GitHub, but one of the deepest builds in the set: writing every stage between source text and a running binary by hand.
