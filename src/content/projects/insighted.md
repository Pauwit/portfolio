---
title: "InsightEd"
summary: An AI-driven early-warning system for student well-being. K-Means clustering on PISA psychological indicators, Top 10/65 finalist at Hi!ckathon Paris, 2nd on the technical leaderboard.
stack: [Python, "K-Means Clustering", "Scikit-learn", Pandas, PCA]
githubUrl: null
visibility: private
category: Hackathons
flagship: false
flagshipOrder: null
image: null
---

Built in 30 hours at Hi!ckathon Paris (Hi! PARIS, HEC × IP Paris), with a team of six spanning EPITA, HEC Paris, and Télécom SudParis: Top 10 out of 65 teams, and 2nd place on the technical leaderboard.

InsightEd reframes student risk detection as an unsupervised profile-discovery problem instead of grade prediction. K-Means clustering (k=5, chosen via the elbow method) over 16 mutable psychological indicators from the PISA dataset, deliberately excluding socioeconomic proxies, surfaces distinct, named archetypes invisible to grades alone: the "Hidden Burnout" (high-performing but dangerously anxious), the "Inefficient Striver" (high effort, low results), and the "Resigned" (low resilience, fixed mindset). Math scores were excluded from training entirely, yet the resulting clusters still correlated strongly with academic performance, validating psychological traits as a genuine proxy for risk. The design is privacy-first by construction: raw survey answers are deleted the moment a student is assigned a cluster ID, keeping only the non-sensitive label for RGPD compliance.
