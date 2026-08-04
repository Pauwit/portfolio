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

GIMP's plugin architecture fought back at every step. Its Python console only shows one line at a time, so a custom logger writes simultaneously to console and file to make debugging possible at all. GIMP also restarts its Python interpreter on every plugin invocation with no persistent memory, so session state (which image, how far into the batch) is tracked in a JSON file keyed to GIMP's process ID, letting the tool resume exactly where it left off after a restart. Explicit memory cleanup was needed too: the API has no reliable way to close an image tab, so the plugin force-frees each image object internally to avoid exhausting RAM across hundreds of masks.
