---
title: EyeSegmentation
summary: End-to-end segmentation and classification pipeline for retinal Doppler holography images, now running daily in a hospital diagnostic pipeline.
stack: [Python, PyTorch, "Ultralytics YOLO11", Jupyter, "Hugging Face"]
githubUrl: "https://github.com/Pauwit/EyeSegmentation"
visibility: public
category: Flagship
flagship: true
flagshipOrder: 1
image: null
---

Built for the Digital Holography Project research lab, this pipeline covers three tasks from a single family of retinal Doppler holography images: optic disc segmentation, eye diaphragm segmentation, and left/right eye classification. Early iterations used a hand-built U-Net and U-ResNet in PyTorch; the current models are fine-tuned Ultralytics YOLO11, with trained weights published to Hugging Face under the DigitalHolography org.

The real signal isn't the repo itself, it's what it became: the foundation for the lab's official [OpticDiscSegmentation](https://github.com/DigitalHolography/OpticDiscSegmentation) and [LeftRightEyeClassification](https://github.com/DigitalHolography/LeftRightEyeClassification) repos, both now running inside EyeFlow, the lab's production platform for quantitative retinal hemodynamics analysis, in daily hospital use at Hôpital des Quinze-Vingts.
