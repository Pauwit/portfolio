---
title: "GIMP Mask Annotation Plugin"
summary: A GIMP 3.0 plugin automating the save-close-open-next annotation cycle for manual image segmentation, built to support the EyeSegmentation dataset work.
stack: [Python, "GIMP API"]
githubUrl: "https://github.com/Pauwit/GIMP_mask_plugin"
visibility: public
category: Tools
flagship: false
flagshipOrder: null
image: null
---

Manual image-segmentation annotation means the same repetitive cycle hundreds of times over: save, close, open the next image, set up layers, repeat. This plugin collapses it into one keystroke, extracting the current image name from GIMP's import format, saving the mask layer as a PNG into a companion masks folder, closing the current image, opening the next alphabetical file, and auto-initializing a fresh mask layer so annotation continues immediately.

Built directly to support the EyeSegmentation dataset work, using GIMP 3.0's Python and GObject Introspection bindings.
