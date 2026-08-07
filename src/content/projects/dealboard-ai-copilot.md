---
title: DealBoard AI Workspace Copilot
summary: A real-time AI copilot wired into Google Workspace that briefs you before meetings, listens live during calls, and recaps afterward. Built in 6 hours at the Gemini 3 Hackathon Paris.
stack: ["Next.js", TypeScript, "Tailwind CSS", "Node.js", Express, "Gemini API"]
githubUrl: "https://github.com/Pauwit/Gemini-3-Hackathon-Paris"
visibility: public
category: Hackathons
flagship: true
flagshipOrder: 2
image: null
---

Built in six hours at the Gemini 3 Hackathon Paris (organized by Google DeepMind and Cerebral Valley), DealBoard scans Gmail, Drive, and Calendar to produce a live workspace briefing: strategic advice, active project status, and per-person meeting context. A natural-language chat layer answers questions like "what did the client say about the Q1 budget" directly against your own workspace data.

The centerpiece is the Live Meeting Co-Pilot: it starts a Google Meet from inside DealBoard, and while the call runs, live speech transcription feeds topic detection, which triggers instant workspace search and surfaces priority-ranked insight cards in a sidebar, alongside a rolling summary regenerated every 15 seconds. Auth runs through Google OAuth 2.0, with the AI layer powered by Gemini via a user-supplied API key.
