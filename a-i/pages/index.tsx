import { Fragment } from 'react';

import Head from 'next/head';

import Header from '../components/header';
import AIThemes from '../components/ai-themes';
import Nav from '../components/nav';
import "./index.scss";

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
                  <p className="mb-0 text-white-50">
                    Engage with our expert community through our <a href="https://aisc.a-i.science" target="_blank">paper discussion events</a>
                    in person or virtually to get exposed to the latest developments of machine learning. Or read <a href="https://blog.a-i.science" target="_blank">our blog</a> to see brief reviews of the most recent and trending topics. </p>
                  <hr className="d-none d-lg-block mb-0 mr-0" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <section id="team" className="team-section mt-4 mb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-lg-8 mx-auto text-center">
            <h2 className="mt-3 mb-4 team-title">Who We Are</h2>
            <h3 className="mt-3 mb-4 team-subtitle">Our Team</h3>
            <div className="row profile-list d-flex justify-content-center">
              {[
                ['Amir Feizpour', 'Head of Operations', null, '/static/img/amir.jpeg', 'https://www.linkedin.com/in/amirfzpr/'],
                ['Xiyang Chen', 'Head of Technology', null, '/static/img/xiyang.jpeg', 'https://www.linkedin.com/in/xiyangchen/'],
              ].map(profileCard)
              }
            </div>

            <h3 className="mt-3 mb-4 team-subtitle">Advisors</h3>
            <ul className="list-group">
              {[
                ['Vik Pant', 'Business/Product Development Advisor', (
                  <Fragment>
                    PhD, Information Science<br />
                    Over 15 years in high performing enterprise SaaS vendors including Oracle, SAP, and Open Text<br />
                    Significant startup advising experience
                </Fragment>
                ), '/static/img/vik.jpeg', 'https://www.linkedin.com/in/vikpant/'],
                ['David Scharbach', 'Business Advisor', (
                  <Fragment>
                    10+ years of experience in communications roles<br />
                    Founded TMLS, the largest machine learning community in Toronto
                  </Fragment>
                ), '/static/img/dave.jpeg', 'https://www.linkedin.com/in/davidscharbach/'],
              ].map((([n, p, c, t, l]: any[]) => {
                return (
                  <li className="list-group-item d-flex flex-col">
                    <a href={l} target="_blank">
                      <img
                        className="profile rounded-circle mr-3 ml-3"
                        src={t} style={{ width: "135px", height: "135px" }} />
                    </a>
                    <div className="media-body mt-2">
                      <h4>
                        <a href={l} target="_blank">
                          <b>{n} <i className="fa fa-linkedin-square"></i></b>
                        </a>
                      </h4>
                      {p && (<p class="lead">{p}</p>)}
                      {c && (<p className="credentials">{c}</p>)}
                    </div>
                  </li>
                )
              }))
              }
            </ul>
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
          <div className="offset-md-4 col-md-4 mb-5 mb-md-0">
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
        </div>

        <div className="social d-flex justify-content-center lead">
          <a href="https://twitter.com/aisc_to" className="mx-2" target="_blank">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com/company/18994830/admin/" className="mx-2" target="_blank">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/Aggregate-Intellect" className="mx-2" target="_blank">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.youtube.com/channel/UCfk3pS8cCPxOgoleriIufyg" className="mx-2" target="_blank">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://www.reddit.com/user/tdls_to" className="mx-2" target="_blank">
            <i className="fab fa-reddit"></i>
          </a>
          <a href="https://www.instagram.com/tdls_to/" className="mx-2" target="_blank">
            <i className="fab fa-instagram"></i>
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

function profileCard([name, title, credentials, photo, linkedIn]: [string, string, string, string, string]) {
  return (
    <div key={name} className="col-lg-4 col-6">
      <div className="media-top">
        <a href={linkedIn} target="_blank">
          <img
            className="profile rounded-circle"
            src={photo} width="135px" />
        </a>
        <div className="media-body mt-2">
          <a href={linkedIn} target="_blank">
            <h4>
              <b>{name} <i className="fa fa-linkedin-square"></i></b>
            </h4>
          </a>
          {title && (
            <p>{title}</p>
          )
          }
        </div>
      </div>
    </div>
  );
}
