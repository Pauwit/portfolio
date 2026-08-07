---
title: "Jupyter MCP Server"
summary: A MCP server giving Claude fine-grained, structured access to Jupyter notebooks instead of dumping the whole file into context.
stack: [Python, MCP, Claude]
githubUrl: "https://github.com/Pauwit/jupyter-claude-integration"
visibility: public
category: Tools
flagship: false
flagshipOrder: null
image: null
---

Reading a whole notebook file into an LLM's context wastes tokens on things that don't matter and buries the things that do. This MCP server exposes Jupyter notebooks as structured, addressable pieces instead: read individual cells, outputs, or embedded images without loading the entire file, write or insert cells of any type, execute them against a live kernel or standalone via `nbclient`, and start, restart, or stop kernels on demand. Matplotlib and Plotly figures come back as viewable image files rather than opaque blobs.
