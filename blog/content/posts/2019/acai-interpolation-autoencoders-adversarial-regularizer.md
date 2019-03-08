---
title: Interpolation in Autoencoders via an Adversarial Regularizer
date: 2019-03-07
author: Taraneh Khazaei
editor: Mahsa Rahimi, Serena McDonnell
---

---


**A**dversarially **C**onstrained **A**utoencoder **I**nterpolation (ACAI; [Berthelot et al., 2018](https://arxiv.org/abs/1807.07543)) is a regularization procedure that uses an adversarial strategy to create high-quality interpolations of the learned representations in autoencoders. This paper makes three main contributions:

*   Proposed ACAI to generate semantically meaningful autoencoder interpolations.
*   Developed a synthetic benchmark to quantify the quality of interpolations.
*   Examined the performance of ACAI learned representations on downstream tasks.

TDLS recently presented and discussed this paper led by Mahsa Rahimi. The details of the event can be found on the [TDLS website](https://tdls.a-i.science/events/2019-02-07/), and the full presentation can be viewed on [YouTube](https://www.youtube.com/watch?v=FdeHlC4QiqA&t=2871s). Here, we present an overview of the paper, along with the discussion points raised at the TDLS session.

---


**Interpolations in Autoencoders**

Autoencoders are a class of neural nets that attempt to output an approximate reconstruction of an input `$x + y = b$` with minimal information loss. As an autoencoder is trained, it learns to encode the input data into a latent space, capturing all the information needed to reconstruct the output. An autoencoder consists of two parts, an encoder and a decoder, which can be described as follows:



*   The encoder receives the input data 

<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

and generates a latent code 

<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 = 

<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

.
*   The decoder receives the latent code 

<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

and attempts to reconstruct the input data as 

<p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

= 

<p id="gdcalert7" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert8">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

. The latent space is often of a lower dimension than the data (

<p id="gdcalert8" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert9">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

). 

The architecture of a standard autoencoder

Standard autoencoders focus on the reconstruction of the input 

<p id="gdcalert9" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert10">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 and barely learn the probabilistic features of the underlying dataset. As a result, they have very limited generative power. One approach that allows standard autoencoders to generate synthetic data is to facilitate interpolation by mixing the latent codes. However, the latent space learned by a regular autoencoder might not be continuous and may have large gaps between clusters of latent codes. Simply mixing the previously learned latent codes may result in interpolations that fall into regions that the decoder has never seen before, which may result in the creation of unrealistic data points. To mitigate this, the interpolation process needs to be integrated into the autoencoder architecture and its training, allowing the autoencoder to learn the underlying data manifold and to create meaningful interpolations. By borrowing ideas from Generative Adversarial Networks ([Goodfellow et al., 2014](https://papers.nips.cc/paper/5423-generative-adversarial-nets)), ACAI effectively integrates the interpolation process into the autoencoder architecture. [Berthelot et al. (2018](https://arxiv.org/abs/1807.07543)) propose a method that can create high-quality interpolations that are both indistinguishable from real data, and are a semantically meaningful combination of the inputs. We explain the ACAI approach in detail below. \


<p id="gdcalert10" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/ACAI0.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert11">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/ACAI0.png "image_tooltip")


A visualization of the latent codes on the [MNIST](http://yann.lecun.com/exdb/mnist/) dataset showing the discontinuity of latent the space

To read more on the continuity of the latent space you can read this [blog post](https://towardsdatascience.com/intuitively-understanding-variational-autoencoders-1bfe67eb5daf). 

**Adversarially Constrained Autoencoder Interpolation (ACAI)**

To interpolate two inputs 

<p id="gdcalert11" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert12">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

and 

<p id="gdcalert12" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert13">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

, ACAI performs the following steps: 


    1. Using two encoders, 

<p id="gdcalert13" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert14">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 and 

<p id="gdcalert14" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert15">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 are first encoded into the corresponding latent codes 

<p id="gdcalert15" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert16">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 and 

<p id="gdcalert16" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert17">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 where 

<p id="gdcalert17" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert18">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 = 

<p id="gdcalert18" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert19">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 and 

<p id="gdcalert19" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert20">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 = 

<p id="gdcalert20" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert21">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

.


    2. The two latent codes are then interpolated via a convex combination 

<p id="gdcalert21" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert22">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 for some 

<p id="gdcalert22" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert23">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

.


    3. The convex combination 

<p id="gdcalert23" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert24">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 is then passed through a decoder to generate the interpolated data point, where  

<p id="gdcalert24" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert25">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

= 

<p id="gdcalert25" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert26">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

.


    4. Finally, to ensure that interpolations are realistic, the decoded interpolation 

<p id="gdcalert26" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert27">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

is passed through a critic network. The goal of the critic network is to predict the mixing coefficient 

<p id="gdcalert27" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert28">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

from the interpolated data point 

<p id="gdcalert28" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert29">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

. The autoencoder is then trained to fool the critic network into thinking that 

<p id="gdcalert29" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert30">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 is always 0, meaning that it attempts to fool the critic network into thinking the interpolated data is actually non-interpolated. 

Fooling the critic network is achieved by adding a term to the autoencoder's loss function. In ACAI, the encoders and the decoder are trained to minimize the following loss function: 



<p id="gdcalert30" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert31">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>



where 

<p id="gdcalert31" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert32">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 is a scalar hyperparameter that can be used to control the weight of the regularization term on the right, and 

<p id="gdcalert32" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert33">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

is the critic network parametrized by 

<p id="gdcalert33" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert34">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

.  The first term of the loss function attempts to reconstruct the input, and the second term tries to make the critic network output 0 at all times.  The critic network is trained to optimize the following loss function:



<p id="gdcalert34" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert35">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>



where 

<p id="gdcalert35" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert36">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

is a scalar hyperparameter. The first term of the loss function attempts to recover 

<p id="gdcalert36" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert37">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

. The second term is a regularization term that is not crucial for creating high-quality interpolations but helps with the adversarial learning process in two ways. First, it enforces the critic to consistently output 0 for non-interpolated data; and second, it ensures that the critic is exposed to realistic data even when the autoencoder reconstructions are of poor quality.

When the algorithm converges, the interpolated points are expected to be indistinguishable from real data. Empirically, the authors show that the learned interpolations are semantically smooth interpolations of the two inputs 

<p id="gdcalert37" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert38">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

and 

<p id="gdcalert38" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert39">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

. Evaluation results on a set of clustering and classification tasks show that the ACAI learned representations are more effective on downstream tasks than non-ACAI learned representations. Given the improved performance on the downstream tasks,  the authors note that there may be a connection between interpolation and representation learning.



<p id="gdcalert39" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/ACAI1.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert40">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/ACAI1.png "image_tooltip")


The ACAI Architecture

**Benchmark Development **

The concept of semantic similarity is ambiguous, ill-defined, and difficult to quantify. Another contribution of this paper is to define a benchmark to quantitatively evaluate the quality of interpolations. Their benchmark is focused on the task of autoencoding 

<p id="gdcalert40" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert41">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 greyscale images of lines. The lines are 

<p id="gdcalert41" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert42">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

-pixels long, beginning from the center of the image and extending outward at an angle 

<p id="gdcalert42" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert43">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 [0, 2

<p id="gdcalert43" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert44">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

], with a single line per image. Using this data, a valid interpolation between 

<p id="gdcalert44" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert45">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

and 

<p id="gdcalert45" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert46">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 is an image of a line that smoothly and linearly adjusts

<p id="gdcalert46" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert47">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

from the angle of the line in 

<p id="gdcalert47" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert48">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 to the angle of the line in 

<p id="gdcalert48" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert49">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 while traversing the shortest path. Using these images, the following two criteria can be easily calculated and are used to evaluate the interpolation capability of different autoencoders:


    1. Mean distance: measures the average distance between the interpolated points and real data points. 


    2. Smoothness: measures whether the angles of the interpolated lines follow a linear trajectory between the start and endpoint.

An ideal interpolation would achieve 0 for both scores. An example of an ideal interpolation between 

<p id="gdcalert49" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert50">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 and 0 is shown below.



<p id="gdcalert50" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/ACAI2.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert51">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/ACAI2.png "image_tooltip")


A perfect interpolation from 

<p id="gdcalert51" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: equation: use MathJax/LaTeX if your publishing platform supports it. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert52">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>

 to 0

Using this benchmark, it is shown that ACAI substantially outperforms common autoencoder models (e.g., denoising and variational autoencoders) for the task of generating realistic and semantically meaningful interpolations. 

**TDLS Discussions **

In the TDLS session, a set of [discussion points](https://youtu.be/Tu3FqCD7-BY?t=3513) were raised, which can be used as pointers for future work and experimentation on autoencoder interpolation. 

First, the classification and clustering evaluations of ACAI representations are conducted on three different datasets: [MNIST](http://yann.lecun.com/exdb/mnist/), [SVHN](http://ufldl.stanford.edu/housenumbers/), and [CIFAR-10](https://www.cs.toronto.edu/~kriz/cifar.html). While the results for both clustering and classification tasks are reasonable for the two simpler datasets (i.e., MNIST and SVHN), the classification improvement on CIFAR is not nearly as significant, and the CIFAR clustering outcome is poor for all of the autoencoders, including ACAI. TDLS brought up the idea of extending ACAI to be more effective on complicated datasets. 

Second, the ACAI paper primarily focuses on computer vision tasks and even defines high-quality interpolations based on visual attributes of images. It would be extremely valuable to explore how ACAI and the benchmark could be extended to benefit non-visual tasks such as text interpolation. Finally, in this paper, the regularization procedure is applied to a vanilla autoencoder. It would be worth exploring the effects of using a similar regularization mechanism on other types of autoencoders. In particular, the possibility of improving the generative power of [variational autoencoders using the same idea was discussed in the TDLS session](https://youtu.be/Tu3FqCD7-BY?t=3574). 

 

**Additional Resources: **



*   The datasets they evaluated ACAI on are [MNIST](http://yann.lecun.com/exdb/mnist/), [SVHN](http://ufldl.stanford.edu/housenumbers/), and [CIFAR-10](https://www.cs.toronto.edu/~kriz/cifar.html)** **all of which are publicly available.
*   An implementation of ACAI in Tensoflow is available on [GitHub](https://github.com/brain-research/acai). 

