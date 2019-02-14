import { Fragment } from 'react';
import React, { useEffect } from 'react';

import Link from 'next/link';

import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import SharedBodyScripts from '../components/shared-body-scripts'
import ThemesAndSuch from '../components/themes-and-such';
import { UpcomingEvents } from '../components/event-related';
import EventCarousel from '../components/event-carousel';

import { getEventsAndGroupings } from '../utils/event-fetch';
import Router from 'next/router'

import "./index.scss";

const EventRoutingHandler = ({ }) => {
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

      if (hash.startsWith('/events')) {
        Router.push(hash);
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

const Index = ({ allEvents }) => {
  return (
    <Fragment>
      <Head>
        <title>Toronto Deep Learning Series #TDLS</title>
        <meta name="description" content="Community of intellectually curious individuals centered around technical review and discussion of advances in machine learning." />
        <link rel="canonical" href="./index.html" />
        <ThemesAndSuch />
        <link href="/static/smooth-scroll.css" rel="stylesheet" />
      </Head>
      <EventRoutingHandler />
      <Header allEvents={allEvents} />
      <section id="welcome">
        <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-ride="carousel" data-interval="6000">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100 carousel-taint" src="/static/images/slide_01.jpeg" alt="First slide" />
              <div className="carousel-caption d-none d-md-block bg-dark">
                <h4>welcoming & supportive community</h4>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100 carousel-taint" src="/static/images/slide_02.jpeg" alt="Second slide" />
              <div className="carousel-caption d-none d-md-block bg-dark">
                <h4>intellectually curious individuals</h4>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100 carousel-taint" src="/static/images/slide_03.jpeg" alt="Third slide" />
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
        <a className="scroll-button" href="#main"><span></span></a>
        <div className="container tdls-intro">
          <h1 className="title">Toronto Deep Learning Series (#TDLS)</h1>
        </div>
      </section>
      <main role="main" id="main">
        <section id="content" className="container-fluid">
          {
            [
              ['Trending Papers', { type: 'fasttrack' }],
              ['Authors Speaking', { type: 'authors' }],
              ['Recent Presentations', { type: 'main' }],
              ['Implementations', { type: 'codereview' }],
              ['Classic Papers', { type: 'classics' }]
            ].map(([label, filter]) => (
              <Fragment key={label}>
                <div style={{ marginTop: '10px' }}>
                  <h4><span className="badge badge-primary badge-info">{label}</span></h4>
                  <EventCarousel filter={filter} shuffle={false} allEvents={allEvents} />
                </div>
              </Fragment>
            ))
          }
        </section>
        <section id="events" className="container">
          <hr />
          <h2 className="inline">Events</h2>
          <p>We meet twice a week to review advances in machine learning in various "streams".</p>
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

          <a className="collapse-button collapsed" data-toggle="collapse"
            href="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample">
            <h3>Upcoming Sessions <i className="fa"></i></h3>
          </a>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              <p>Click on each stream name to
                know more about them and then explore our upcoming events.</p>
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
              <article id="upcoming-events">
                <UpcomingEvents />
              </article>
            </div>
          </div>
        </section>
        <style jsx>{`
            section.about-tdls {
              text-align: center;
            }
          `}</style>
        <section className="container about-tdls">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h2>About TDLS</h2>
              <p className="lead">
                TDLS is a community of intellectually curious individuals, centered around technical
                review and discussion of advances in machine learning.
            </p>
              <p>
                <Link href="/about">
                  <a className="btn">Learn more...</a>
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <SharedBodyScripts />
    </Fragment>
  );
}

Index.getInitialProps = async ({ req }) => {
  const allEvents = await getEventsAndGroupings(!!req);
  return { allEvents };
}

export default Index;