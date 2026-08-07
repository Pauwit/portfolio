---
title: PING
summary: A collaborative code repository and project management platform, built with a team of five.
stack: [Java, Quarkus, PostgreSQL, JGit, React, TypeScript, Docker]
githubUrl: null
visibility: private
category: "Private Projects"
flagship: false
flagshipOrder: null
image: null
---

Users, projects, folders, files, and real Git operations behind a REST API, built with a team of five over May and June 2025. The backend runs Java and Quarkus with PostgreSQL for persistence, stateless JWT authentication, and programmatic Git operations through JGit rather than shelling out to the git binary. Full-text code search runs on Apache Lucene, and ArchUnit enforces the intended clean-architecture layering automatically, the build fails if a change breaks it.

The frontend is React, TypeScript, and Vite; the whole stack ships as a Docker Compose deployment with Swagger/OpenAPI docs exposed at runtime. Private on EPITA's GitLab; presented here as a case study since there's nothing to link to externally.
