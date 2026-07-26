---
title: "EpiTweet"
summary: A distributed micro-blogging platform built as five event-driven microservices with a team of 14, deployed to Kubernetes.
stack: ["Java 21", "Quarkus 3", MongoDB, Neo4j, Elasticsearch, Redis, Kubernetes]
githubUrl: null
visibility: private
category: "Private & Team"
flagship: false
flagshipOrder: null
image: null
---

A from-scratch Twitter clone built for EPITA's INFO8 course by a team of fourteen, as five independent microservices, each owning its own data and talking only through events over Redis pub/sub: user-service (MongoDB for profiles, Neo4j for the follow/block graph), post-service (MongoDB plus MinIO for media), like-service (with local copies of post/user data so it never calls out at query time), timeline-service (builds feeds purely by listening to events, no synchronous reads), and search-service (full-text and hashtag search via Elasticsearch).

Deployed to Kubernetes (k3s) with Kustomize and its own container registry, backed by an automated rollout script, a Python integration test suite, and a full Hugo documentation site. The most architecturally ambitious system in the whole set: real polyglot persistence, real event-driven decoupling, and a real Kubernetes pipeline. Private on EPITA's GitLab; presented here as a case study since there's nothing to link to externally.
