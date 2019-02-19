import { Fragment } from 'react';

import Head from 'next/head';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Header from '../components/header';
import AIThemes from '../components/ai-themes';
import Nav from '../components/nav';

export default () => (
  <Fragment>
    <Head>
      <title>Aggregate Intellect</title>
      <meta name="description"
        content="Reinventing the way scientific discovery is done and consumed" />
      <AIThemes />
    </Head>
    <a id="page-top"></a>
    <Nav />
    <Header />

    <section id="about" className="about-section text-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h2 className="text-white mb-4">Making Artificial Intelligence Research More User Friendly for Industry Practitioners</h2>
            <p className="text-white-50">Providing optimal path to the most relevant, enriched knowledge and context for commercial applications of machine learning through efficient, reproducible, and transparent processes</p>
          </div>
        </div>
        <img src="/static/img/ipad.png" className="img-fluid" alt="" />
      </div>
    </section>

    <section id="projects" className="projects-section bg-light">
      <div className="container">

        {/* <!-- Featured Project Row --> */}
        <div className="row align-items-center no-gutters mb-4 mb-lg-5">
          <div className="col-xl-8 col-lg-7">
            <img className="img-fluid mb-3 mb-lg-0" src="/static/img/bg-masthead.jpg" alt="" />
          </div>
          <div className="col-xl-4 col-lg-5">
            <div className="featured-text text-center text-lg-left">
              <h4>Advanced Corporate Training</h4>
              <p className="text-black-50 mb-0">We train your data scientists and machine learning engineers on the latest topics in natural language processing, reinforcement learning, generative models, computer vision, bayesian methos, and graphical models, among many more</p>
            </div>
          </div>
        </div>

        {/* <!-- Project One Row --> */}
        <div className="row justify-content-center no-gutters mb-5 mb-lg-0">
          <div className="col-lg-6">
            <img className="img-fluid" src="/static/img/demo-image-01.jpg" alt="" />
          </div>
          <div className="col-lg-6">
            <div className="bg-black text-center h-100 project">
              <div className="d-flex h-100">
                <div className="project-text w-100 my-auto text-center text-lg-left">
                  <h4 className="text-white">Research as a Service</h4>
                  <p className="mb-0 text-white-50">Tap into our exceptional community of experts for machine learning research projects that your team doesn't have the time or expertise to handle. We deliver ready deploy state of the art models cutomized to your business needs.</p>
                  <hr className="d-none d-lg-block mb-0 ml-0" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Project Two Row --> */}
        <div className="row justify-content-center no-gutters">
          <div className="col-lg-6">
            <img className="img-fluid" src="/static/img/demo-image-02.jpg" alt="" />
          </div>
          <div className="col-lg-6 order-lg-first">
            <div className="bg-black text-center h-100 project">
              <div className="d-flex h-100">
                <div className="project-text w-100 my-auto text-center text-lg-right">
                  <h4 className="text-white">Research Media Hub</h4>
                  <p className="mb-0 text-white-50">Engage with our expert community through our <a href="https://tdls.a-i.science" target="_blank">paper discussion events</a> in person or virtually to get exposed to the latest developments of in machine learning. Or read <a href="https://blog.a-i.science" target="_blank">our blog</a> to see brief reviews of the most recent and trending topics. </p>
                  <hr className="d-none d-lg-block mb-0 mr-0" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* <!-- Signup Section --> */}
    <section id="signup" className="signup-section">
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-lg-8 mx-auto text-center">

            <i className="far fa-paper-plane fa-2x mb-2 text-white"></i>
            <h2 className="text-white mb-5">Subscribe to receive updates!</h2>

            <form
              className="form-inline d-flex validate"
              action="https://science.us20.list-manage.com/subscribe/post?u=c7831af29c0c46bd5ec4c04c7&amp;id=9e6c32b697"
              method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"
              target="_blank" noValidate
            >
              <input type="email"
                name="EMAIL"
                id="mce-EMAIL"
                className="required form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
                placeholder="Enter email address..." />
              <div
                style={{ position: 'absolute', left: '-5000px' }}
                aria-hidden="true"><input type="text"
                  name="b_c7831af29c0c46bd5ec4c04c7_9e6c32b697"
                  tabIndex={-1} /></div>
              <button type="submit"
                id="mc-embedded-subscribe"
                className="btn btn-primary mx-auto">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </section>


    {/* <!-- Contact Section --> */}
    <section className="contact-section bg-black">
      <div className="container">
        <div className="row">
          <div className="offset-md-2 col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-100">
              <div className="card-body text-center">
                <i className="fas fa-envelope text-primary mb-2"></i>
                <h4 className="text-uppercase m-0">Email</h4>
                <hr className="my-4" />
                <div className="small text-black-50">
                  <a href="mailto:events@a-i.science">events@a-i.science</a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-100">
              <div className="card-body text-center">
                <i className="fas fa-mobile-alt text-primary mb-2"></i>
                <h4 className="text-uppercase m-0">Phone</h4>
                <hr className="my-4" />
                <div className="small text-black-50">+1 (555) 902-8832</div>
              </div>
            </div>
          </div>
        </div>

        <div className="social d-flex justify-content-center">
          <a href="#" className="mx-2">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="mx-2">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="mx-2">
            <i className="fab fa-github"></i>
          </a>
        </div>

      </div>
    </section>


    {/* <!-- Footer --> */}
    <footer className="bg-black small text-center text-white-50">
      <div className="container">
        Copyright &copy; Aggregate Intellect 2019
    </div>
    </footer>


    {/* <!-- Plugin JavaScript --> */}
    <script
      src="https://code.jquery.com/jquery-3.3.1.min.js"
      integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossOrigin="anonymous"></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
      crossOrigin="anonymous">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>
    {/* <!-- Custom scripts for this template --> */}
    <script src="/static/js/grayscale.js"></script>
  </Fragment>
);