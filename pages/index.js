import { Fragment } from 'react';
import React, { useEffect } from 'react';

import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import SharedBodyScripts from '../components/shared-body-scripts'
import ThemesAndSuch from '../components/themes-and-such';
import { UpcomingEvents, PastEvents } from '../components/event-related';
import { EventModalWrapper, EventModalContext } from '../components/event-modal';


const EventRoutingHandler = ({ openEventModal }) => {
  function registerRoutes() {
    window.addEventListener("hashchange", ({ newURL }) => {
      handleHashChange(newURL);
    }, true);
  }

  async function handleHashChange(newURL) {
    if (!newURL) {
      return;
    } else {
      const hash = newURL.substring(newURL.indexOf('#') + 1);

      if (hash.startsWith('/events/')) {
        const eventId = hash.substring('/events/'.length);
        openEventModal(eventId);
      }
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      registerRoutes();
      handleHashChange(window.location.href);
    }
  }, []);
  return null;
}

export default () => {
  return (
    <Fragment>
      <Head>
        <title>Toronto Deep Learning Series #TDLS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="canonical" href="./index.html" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-131780670-1"></script>
        <meta name="description" content="Community of intellectually curious individuals centered around technical review and discussion of advances in machine learning." />
        <ThemesAndSuch />
        <link href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.2/css/bootstrap-select.min.css" />
        <link href="/static/smooth-scroll.css" rel="stylesheet" />

      </Head>
      <Header />
      <EventModalWrapper>
        <EventModalContext.Consumer>
          {
            (openEventModal) => <EventRoutingHandler openEventModal={openEventModal} />
          }
        </EventModalContext.Consumer>
        <main role="main">
          <style jsx>{`

              #welcome {
                position: relative;
              }
              #welcome .carousel-caption {
                font-style: italic;
                letter-spacing: 0.12em;
                border-radius: 10px;
              }

              #welcome .scroll-button {
                position: absolute;
                bottom: 0;
                z-index: 1;
                left: 50%;
                transform: translateX(-50%);
              }

              #welcome .carousel-caption {
                font-style: italic;
                letter-spacing: 0.12em;
                border-radius: 10px;
              }
              .tdls-intro {
                text-shadow: 0 0 15px #000;
                position: absolute;
                bottom: 35%;
                z-index: 1;
                text-align: center;
                left: 0;
                right: 0;
                color: #fff;
              }

              .tdls-intro .title {
                /* font-family: serif; */
                /* font-size: 2em; */
                font-weight: bold;
                margin-top: 30px;
                padding-top: 30px;
                font-style: italic;
                /* border-top-style: solid;
                border-top-width: 7px; */
                /* padding-bottom: 30px; */
                /* border-bottom-style: solid; */
                /* border-bottom-width: 2px; */
                text-align: center;
              }

              .tdls-intro .abstract,
              .tdls-intro .authors {
                max-width: 650px;
                margin-top: 60px;
                margin-left: auto;
                margin-right: auto;
              }
          `}</style>
          <section id="welcome">
            <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-ride="carousel" data-interval="6000">
              <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              </ol>

              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="d-block w-100" src="/static/images/slide_01.jpeg" alt="First slide" />
                  <div className="carousel-caption d-none d-md-block bg-dark">
                    <h4>welcoming & supportive community</h4>
                  </div>
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src="/static/images/slide_02.jpeg" alt="Second slide" />
                  <div className="carousel-caption d-none d-md-block bg-dark">
                    <h4>intellectually curious individuals</h4>
                  </div>
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src="/static/images/slide_03.jpeg" alt="Third slide" />
                  <div className="carousel-caption d-none d-md-block bg-dark">
                    <h4>engaging technical discussions</h4>
                  </div>
                </div>
              </div>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
            <a className="scroll-button" href="#events"><span></span></a>
            <div className="container tdls-intro">
              <h1 className="title">Toronto Deep Learning Series (#TDLS)</h1>
            </div>
          </section>
          <section id="events" className="container">
            <hr />
            <h2 className="inline">Events</h2>
            &nbsp;(<a className="event-link" href="#upcoming-events">Upcoming</a>,&nbsp;
    <a className="event-link" href="#past-events">Past</a>)
    <p>We meet twice a week to review advances in machine learning in various "streams".
      <br />
              Click on each stream name to
      know more about them and then explore our upcoming and past events.</p>
            <ul className="list-inline legend-list" id="streams">
              <li className="list-inline-item">
                <a href="" className="legend-event-main" data-toggle="modal" data-target="#modal_main_stream">
                  <span className="legend main">&nbsp;</span>
                  &nbsp;Main stream<i className="fa fa-question"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="" data-toggle="modal" className="legend-event-classics" data-target="#modal_classics_stream">
                  <span className="legend classics"></span>
                  &nbsp;Classics Stream<i className="fa fa-question"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="" data-toggle="modal" className="legend-event-fasttrack" data-target="#modal_fast_stream">
                  <span className="legend fasttrack"></span>
                  &nbsp;Fast Track Stream<i className="fa fa-question"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="" data-toggle="modal" className="legend-event-codereview" data-target="#modal_codereview_stream">
                  <span className="legend codereview"></span>
                  &nbsp;Code Review Stream<i className="fa fa-question"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="" data-toggle="modal" className="legend-event-authors" data-target="#modal_authors_stream">
                  <span className="legend authors"></span>
                  &nbsp;Authors Stream<i className="fa fa-question"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <span className="legend tentative"></span>&nbsp;
            <span className="legend-event-tentative">Tentative Sessions</span>
              </li>
            </ul>
            <div className="modal" tabIndex="-1" role="dialog" id="modal_main_stream">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Main Stream</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>
                      This stream is for recent papers. For these papers, our discussions are typically within a few months
                      or up to a couple of years of publication.
            </p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal" tabIndex="-1" role="dialog" id="modal_classics_stream">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Classics Stream</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>
                      This stream is for concept defining papers. These papers are typically older than those in the Main
                      Stream.
            </p>
                    <p>For inspiration, check out our <a href="https://docs.google.com/spreadsheets/d/1PTaFyE2AsgTd0p7A5aHvEw0lLzw-9OXJC8Wa1Bg10ug"
                      target="_blank">classic paper list <i className="fa fa-external-link"></i></a>.</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal" tabIndex="-1" role="dialog" id="modal_fast_stream">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Fast Track Stream</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body yt-player">
                    <p>
                      This stream is for recent papers within a few weeks of publication.
                      </p>
                    <p>
                      In our main stream, we build in time for revisions to settle and speakers to prepare. But when new
                      papers seem particularly important to the machine learning community, we want to discuss them sooner!
                      Hence, the Fast Track stream.
                      </p>
                    <iframe style={{ width: '100%', minHeight: '300px' }} src="https://www.youtube.com/embed/1jkmNnHs18M"
                      frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen></iframe>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal" tabIndex="-1" role="dialog" id="modal_codereview_stream">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Main Stream</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>
                      This stream is for reviewing implementations of papers.
            </p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal" tabIndex="-1" role="dialog" id="modal_authors_stream">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Classics Stream</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>
                      This stream is for papers presented by their original authors.
            </p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            <h3 id="past-events-title">Recent Sessions</h3>
            <article id="past-events">
              <PastEvents />
            </article>
            <h3>Upcoming Sessions</h3>
            <article id="upcoming-events">
              <UpcomingEvents />
            </article>
          </section>

          <section id="areas" className="container">

            <h2>Subject Matter Areas</h2>
            <div className="row">
              <div className="col-lg-6" id="sma-links">

              </div>
              <div className="col-lg-6">
                <iframe width="100%" height="600" seamless frameBorder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRY6QXhp9sU4Y_ede25AEAwkSnS-xcOCQhxJMUfiq4xtWB04chEpkyDgWvFHSD0zakgSqnxuNzTGwk6/pubchart?oid=1131229791&format=interactive"></iframe>
              </div>
            </div>
          </section>
          <section className="container" id="useful_links" >
            <hr />
            <h2>Useful Links</h2>
            <article id="useful-links">
              <ul>
                {[
                  ["Distill Pub", "https://distill.pub/about/"],
                  ["Papers with Code", "https://paperswithcode.com/"],
                  ["ArXiv", "https://arxiv.org/archive/cs"],
                  ["Arxiv Sanity", "http://www.arxiv-sanity.com/"],
                  ["State of the Art in AI", "https://www.stateoftheart.ai/"],
                  ["TDLS Classic Papers", "https://docs.google.com/spreadsheets/d/1PTaFyE2AsgTd0p7A5aHvEw0lLzw-9OXJC8Wa1Bg10ug"],
                ].map(([name, link]) => (
                  <li key={name}>
                    <a href={link} target="_blank">
                      <p className="card-title">{name}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </main>
      </EventModalWrapper>
      <Footer />
      <SharedBodyScripts />
    </Fragment>
  );
}
