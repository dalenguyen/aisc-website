---
title: Need of Attention in GANs
date: 2019-02-09
---

Self-Attention Generative Adversarial Networks (SAGAN; *Zhang et al., 2018*) are convolutional neural networks that use the self-attention paradigm to capture long-range spatial relationships in existing images to better synthesize new images.  While excellent at generating fairly realistic images, traditional deep convolutional GANs are unable to capture long-range dependencies in images. These conventional GANs work well for images that do not contain a lot of structural and geometric information (e.g., images depicting oceans, skies, and fields). However, wherever the rate of information variation is high in an image, they tend to miss out on obtaining all the changes, and thus fail to represent the global relationships faithfully. These non-local dependencies consistently appear in some classes of images (e.g., GANs can draw animal images with realistic fur but often fail to draw separate feet).  

![](/static/post-assets/sagan1.png)

Given the limited representation capacity of the convolution operator (the receptive field is local), conventional GANs can only capture long-range relationships after several convolutional layers. Increasing the size of the kernel can alleviate the problem but is statistically and computationally inefficient. Various attention and self-attention models have been formulated to capture and use structural patterns and non-local relationships. Generally speaking, these models are not effective in striking a balance between computational efficiency and modeling long-range relationships.
