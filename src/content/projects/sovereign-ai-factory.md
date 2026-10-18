---
title: "Sovereign AI Factory"
summary: An end-of-studies research project at Cloud Temple, built with a team of six, to run the full LLM value chain on sovereign infrastructure, from GPU inference and evaluation to training and green orchestration. In progress.
stack: [Python, FastAPI, Docker, "llama.cpp", vLLM, "lm-evaluation-harness", Prometheus, Grafana]
githubUrl: null
visibility: private
category: "Private Projects"
flagship: false
flagshipOrder: null
image: null
---

An end-of-studies research project (PFEE) at Cloud Temple, September 2026 to January 2027, with a team of six: design and operate a sovereign, eco-efficient AI factory covering the whole LLM value chain, from GPU infrastructure and inference serving through evaluation, data engineering, and training (LoRA, full SFT, continued pre-training).

So far, an OpenAI-compatible FastAPI gateway with API keys, token quotas, and Prometheus metrics sits in front of swappable inference engines (a deterministic mock, llama.cpp, and vLLM once GPUs are available), on an isolated Docker network. Evaluation runs through that same gateway with lm-evaluation-harness; a first full MMLU run on Qwen3-0.6B showed the standard generative scoring reports 0% while a re-scored read of the same answers gives 35.9%, which shaped how the team builds its own benchmark. Next: scaling to an 80B-parameter model with multi-GPU sharding, and a Green AI orchestrator that shifts GPUs between inference by day and training by night to cut compute cost. Private repository; presented here as a case study since there's nothing to link to externally.
