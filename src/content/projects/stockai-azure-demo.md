---
title: "StockAI"
summary: Detects empty shelf space from a photo, forecasts demand, and has an LLM agent decide whether to restock or order from a supplier.
stack: ["Azure Custom Vision", "Azure Machine Learning", Python, Docker, "LLM Agent", MCP]
githubUrl: "https://github.com/Pauwit/azure-demo"
visibility: public
category: Systems
flagship: false
flagshipOrder: null
image: null
---

An EPITA brief asking for four kinds of "AI infusion" in one app, computer vision, machine learning, an edge/offline scenario, and an agentic workflow, answered with a retail restocking assistant. Azure Custom Vision detects empty shelf zones from a photo and identifies the missing product via a planogram; Azure Machine Learning forecasts 7-day demand with a Gradient Boosting regressor trained on a real Kaggle sales dataset.

An LLM agent then decides whether to restock from the warehouse or place a supplier order, generating a PDF purchase order when needed, and fetches stock data by calling tools on an MCP server rather than reading local files directly. A chat widget lets you query the same agent about stock, forecasts, and decisions directly.
