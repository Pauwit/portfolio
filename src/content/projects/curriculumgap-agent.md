---
title: "CurriculumGap Agent"
summary: A 5-agent pipeline that continuously audits course curricula against the job market and state of the art, hallucination-checked. Placed 3rd at Hackathon IA Agentique.
stack: ["Next.js", "React", "Tailwind CSS", "LLM Agents", "vLLM"]
githubUrl: "https://github.com/joannejab/Hackathon-IA-Agentique-YAKAP"
visibility: public
category: Hackathons
flagship: false
flagshipOrder: null
image: null
---

A continuous, autonomous audit of curriculum relevance: a five-agent pipeline compares a course's real content against the job market and the current state of the art in tech, producing a gap report plus suggested modules, verified against hallucination before anything is shown. Built by a team of four at the Hackathon IA Agentique (GDG + EPITA Alumni x EPITA, June 2026), placing third.

Full-stack Next.js 16 with agents running inside API routes rather than a separate backend, served against a self-hosted qwen3.6-35b-a3b endpoint via vLLM. Real data is pre-computed into a cache file so the demo runs instantly even without a live API key.
