import { Fragment, useMemo } from 'react';
import React, { useEffect } from 'react';

import Link from 'next/link';

import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import SharedBodyScripts from '../components/shared-body-scripts'
import ThemesAndSuch from '../components/themes-and-such';
import EventCarousel, { filterEvents } from '../components/event-carousel';
import { ShowcaseEventCard } from '../components/event-card';
import { ZoomLevel } from '../components/event-carousel';
import configureProgressBar from '../utils/routing';
import { findNextUpcomingEvent } from '../components/live-button';

import getConfig from 'next/config'
const { SITE_NAME_FULL, SITE_ABBREV, SITE_NAME } = getConfig().publicRuntimeConfig;

import { getEventsAndGroupings } from '../utils/event-fetch';
import Router from 'next/router'

import "./index.scss";
import { PublicEvent, AllEvents } from '../../common/types';

const EventRoutingHandler = ({ }) => {
  function registerRoutes() {
    window.addEventListener("hashchange", ({ newURL }) => {
      handleHashChange(newURL);
    }, true);
  }

  async function handleHashChange(newURL: string) {
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

  useEffect(() => {
    configureProgressBar();
  }, []);

  return null;
}

function paperGroupLabel(label: string) {
  return (
    <h4>
      <span className="badge badge-primary badge-info">
        {label}
      </span>
    </h4>
  );
}

function eventCarousel(label: string, events: PublicEvent[], zoomLevel: ZoomLevel) {
  return (
    <Fragment key={label}>
      <div className="mt-3">
        {paperGroupLabel(label)}
        <EventCarousel
          shuffle={false}
          events={events}
          zoomLevel={zoomLevel}
        />
      </div>
    </Fragment>
  );
}

const Index = ({ allEvents }: { allEvents: AllEvents }) => {
  const { pastEvents, futureEvents, subjects } = allEvents;
  const pastAndFutureEvents = futureEvents.concat(pastEvents);
  const countdownEvent = useMemo(() => {
    const e = findNextUpcomingEvent(allEvents);
    return e;
  }, [allEvents]);

  return (
    <Fragment>
      <Head>
        <title>{SITE_NAME_FULL}</title>
        <link href="https://fonts.googleapis.com/css?family=IM+Fell+English+SC" rel="stylesheet" />
        <meta name="description"
          content="Community of intellectually curious individuals centered around technical review and discussion of advances in machine learning."
        />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <ThemesAndSuch />
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
              <img className="d-block w-100" src="/static/images/socrates.jpeg" alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100 carousel-taint" src="/static/images/slide_01.jpeg" alt="First slide" />
              <div className="carousel-caption d-none d-md-block bg-dark">
                <h4>welcoming &amp; supportive community</h4>
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
          <h1 className="title">{SITE_NAME}</h1>
        </div>
      </section>
      <main role="main" id="main">
        <section id="content" className="container-fluid">
          {
            countdownEvent && (
              <div className="mt-3">
                {paperGroupLabel("Up Next")}
                <ShowcaseEventCard
                  event={countdownEvent}
                />
              </div>
            )
          }
          {
            eventCarousel('Trending Papers', filterEvents(pastAndFutureEvents, { type: 'Trending Paper' }), 3)
          }
          {
            eventCarousel(
              'Authors Speaking',
              filterEvents(pastAndFutureEvents, { type: 'Author Speaking' }), 4
            )
          }
          {
            eventCarousel(
              'Upcoming Events',
              futureEvents.slice(0, 5), 5)
          }

          {
            eventCarousel(
              'Recent Presentations',
              pastEvents.slice(0, 20), 8)
          }
          {
            eventCarousel(
              'Implementations',
              filterEvents(pastAndFutureEvents, { type: 'Code Review' }), 8
            )
          }
          {
            eventCarousel(
              'Foundational Papers',
              filterEvents(pastAndFutureEvents, { type: 'Foundational' }), 8
            )
          }
        </section>
        <hr />
        <section className="container by-subjects">
          <h2 className="inline title">By Subjects</h2>
          <ul
            className="list-unstyled list-inline"
            style={{
              marginTop: '2rem', marginBottom: '2rem',
            }}
          >
            {
              subjects.map(s => (
                <li className="list-inline-item" key={s}
                  style={{
                    textAlign: 'center',
                    marginLeft: "0.6vw",
                    marginRight: '0.6vw',
                    marginTop: '1vw'
                  }}
                >
                  <h4>
                    <Link href={`/events?subject=${s}`}>
                      <a className="btn btn-outline-secondary">
                        {s}
                      </a>
                    </Link>
                  </h4>
                </li>
              ))
            }
          </ul>
        </section>
        <hr />
        <section id="events" className="container">
          <h2 className="title inline mb-4">Our Sessions</h2>
          <p>We meet twice a week to review advances in machine learning in various "streams".</p>

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
                &nbsp;Foundation Stream<i className="fa fa-question"></i>
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
          </ul>


          <div className="modal" tabIndex={-1} role="dialog" id="modal_main_stream">
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
          <div className="modal" tabIndex={-1} role="dialog" id="modal_classics_stream">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Foundation Stream</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    This stream is for concept defining papers. These papers are typically
                    older and historically more influencial than those in the Main Stream.
            </p>
                  <p>For inspiration, check out our <a
                    className="btn btn-info"
                    href="https://docs.google.com/spreadsheets/d/1PTaFyE2AsgTd0p7A5aHvEw0lLzw-9OXJC8Wa1Bg10ug"
                    target="_blank">foundational paper list <i className="fa fa-external-link"></i></a>.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal" tabIndex={-1} role="dialog" id="modal_fast_stream">
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
          <div className="modal" tabIndex={-1} role="dialog" id="modal_codereview_stream">
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
          <div className="modal" tabIndex={-1} role="dialog" id="modal_authors_stream">
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
          <Link href="/events">
            <h4 className="all-upcoming">
              <a href="" className="btn btn-outline-danger">
                All upcoming sessions <i className="fa fa-angle-double-right"></i>
              </a>
            </h4>
          </Link>
        </section>
        <hr />
        <section className="container about-tdls">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h2 className="title">About {SITE_ABBREV}</h2>
              <p className="lead">
                {SITE_NAME} is a community of intellectually curious individuals, centered around technical
                review and discussion of advances in machine learning.
            </p>
              <p>
                <Link href="/about">
                  <a className="btn btn-secondary btn-lg">Learn more...</a>
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <SharedBodyScripts />
    </Fragment >
  );
}

Index.getInitialProps = async ({ req }) => {
  const allEvents = await getEventsAndGroupings(!!req);
  return { allEvents };
}

export default Index;