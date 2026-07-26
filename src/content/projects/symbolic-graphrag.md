---
title: "Symbolic GraphRAG"
summary: A GraphRAG pipeline combining knowledge graphs with LLMs for multi-hop question answering, benchmarked against classic vector RAG.
stack: [Python, FastAPI, "RDF/Property Graphs", LLMs]
githubUrl: "https://github.com/Pauwit/symbolic-graphrag"
visibility: public
category: "Systems & From-scratch"
flagship: false
flagshipOrder: null
image: null
---

Built for EPITA's Symbolic AI course with Matteo Atkinson: extracts entities and relations from text into an RDF or property graph, runs community detection (Leiden/Louvain) for thematic partitioning, then combines graph traversal with LLM querying to answer multi-hop questions that plain vector-similarity RAG struggles with.

Benchmarked against classic vector RAG on HotpotQA and MuSiQue, measuring the tradeoffs between graph-construction cost, query latency, and answer quality, grounded in the actual GraphRAG and RAG literature rather than built as a pure implementation exercise. A FastAPI backend serves REST and SSE-streamed responses to a small web frontend.
