---
title: "Intelligent Music Festival Management"
summary: A simulated festival management system solving forecasting, anomaly detection, resource allocation, and scenario evaluation as independent Kafka-connected microservices.
stack: [Python, Kafka, Docker, "Linear Programming", WebSocket]
githubUrl: "https://github.com/6zaille/Festival_Musique"
visibility: public
category: "Systems & From-scratch"
flagship: false
flagshipOrder: null
image: null
---

A simulator generates a continuous stream of visitor events, entries, exits, zone changes, that the rest of the system reacts to in real time. Independent Python microservices communicate only through Kafka topics: forecasting attendance per zone, detecting abnormal situations like overcrowding or understaffing, allocating security and medical resources via a linear-programming solver, and evaluating what-if scenarios without touching the live stream.

Every event is also archived into a bronze/silver/gold data lake, the same medallion pattern used in the forest-fire detection project, applied here to a festival instead of a sensor network. A live WebSocket dashboard shows historical charts, a scenario form, and simulation controls; each service runs in its own Docker container.
