---
title: "PYBD Stock Data Pipeline"
summary: A stock market data pipeline merging two mismatched real-world sources into a Dash dashboard with Bollinger Bands and normalized performance comparison.
stack: [Python, Pandas, Dash, "Docker Compose"]
githubUrl: "https://github.com/Pauwit/PYBD-Project"
visibility: public
category: "Systems & From-scratch"
flagship: false
flagshipOrder: null
image: null
---

Built with Joanne Jabbour for EPITA's Python for Big Data course: ingests Euronext data (XLSX exports) and Boursorama intraday snapshots (pickled), cleans and deduplicates both, and serves a Dash dashboard with Bollinger Bands, normalized performance comparison, and a raw data table.

The interesting engineering call was on the Boursorama side: import time dropped from roughly 17 minutes to 2-3 minutes by keeping only the first and last intraday snapshot per day instead of every one, while still computing accurate daily highs and lows from just those two points. Boursorama data then fills gaps in the Euronext data through duplicate-safe merging.
