---
title: Real-Time Forest Fire Detection Architecture
summary: A full data architecture and working proof-of-concept for IoT-scale wildfire detection, ~10M devices, ~200GB/day, with conflicting sub-second alerting and long-term analytics requirements.
stack: [Kafka, "Spark Structured Streaming", "Akka HTTP", HDFS, Scala]
githubUrl: null
visibility: private
category: Flagship
flagship: true
flagshipOrder: 3
image: null
---

A data engineering course project scoped at real infrastructure scale: an IoT sensor network across forests, ~10 million devices reporting every 30 seconds, roughly 200GB/day and 73TB/year. The brief has two requirements that pull in opposite directions: sub-second fire detection, and long-term historical analysis for government reporting.

Kafka ingests and partitions by device ID, decoupling sensors from consumers. Spark Structured Streaming applies detection rules over tumbling windows (temperature, smoke, CO2, and humidity thresholds combined) and emits anomalies to a dedicated alerts topic. Storage is an HDFS data lake in medallion form, Bronze/Silver/Gold, with Silver as the deduplicated, schema-enforced source of truth. An Akka HTTP alert service subscribes to the alerts topic and dispatches notifications, enriched from a TTL-cached contacts table so the critical alert path never blocks on a synchronous database call. Currently a private repo; will be made public so this card can link out directly.
