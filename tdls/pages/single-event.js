
import React, { useState, useEffect, Fragment } from 'react';

import fetch from 'isomorphic-unfetch'

import Header from '../components/header'
import Footer from '../components/footer'
import { Countdown } from '../components/live-button';
import Head from 'next/head'
import ThemesAndSuch from '../components/themes-and-such';
import SharedBodyScripts from '../components/shared-body-scripts'
import { getEventById, getLinkedInProfiles } from '../utils/event-fetch';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { nameToLink } from '../components/profile';
import {
  pad, eventStatus, getEventId,
  isTentative, READABLE_EVENT_TYPE
} from '../../common/event';
import { Button } from 'react-bootstrap';
import { ModalVideoContext, YouTubeModalWrapper } from '../components/youtube-modal';
import { WEEKDAYS, MONTH_NAMES } from '../utils/datetime';
import { venueToLink } from '../utils/venue';
import { ytThumb, getYouTubeId } from '../utils/youtube';
import Link from 'next/link';
import ResponsiveEmbed from 'react-responsive-embed';
import { mobileCheck } from '../../common/utils';

import './single-event.scss';

const SingleEvent = ({ event: ev }) => {
  if (!ev) {
    return (
      <div>
        Event not found.
      </div>
    );
  } else {

    const date = ev && new Date(ev.date);
    const status = eventStatus(ev);

    const [{ linkedInDict }, setLinkedInData] = useState({ linkedInDict: {} });

    const [{ isMobile }, setIsMobile] = useState({ isMobile: true });

    useEffect(() => {
      const isMobile = mobileCheck();
      setIsMobile({ isMobile });
    }, []);

    const fetchAndSetProfile = async () => {
      const linkedInDict = await getLinkedInProfiles(false);
      setLinkedInData({ linkedInDict });
    }

    const embedDomain = typeof window === 'undefined' ? 'tdls.a-i.science' : window.location.host.split(":")[0];

    useEffect(() => {
      fetchAndSetProfile();
    }, [getEventId(ev)]);

    const timeSnippet = (
      <Fragment>
        {WEEKDAYS[date.getDay()]}&nbsp;
                {dashedDate(date)}
        {{
          'live': ' (this event is live!)',
          'expired': ' (This is a past event.)'
        }[status]}
      </Fragment>
    );
    const venueSnippet = (
      <Fragment><strong>Venue</strong>: {
        status !== 'expired' ?
          "(TDLS members: please refer to Slack or your calendar invite for location)" : venueToLink(ev.venue)
      }
      </Fragment >
    )

    const agenda = (
      <Fragment>
        <h5>Agenda</h5>
        <ul className="list-unstyled">
          <li>5:30-6:15,   arrivals and socializing</li>
          <li>6:15-6:30    intros and announcements</li>
          <li>6:30-7:15,   algorithm review</li>
          <li>7:15-8:00,   results and discussions</li>
        </ul>
        <Link href="/code-of-conduct">
          <a className="btn btn-outline-secondary btn-sm">Code of Conduct</a>
        </Link>
      </Fragment >
    );

    const liveChat = (
      <section className="live-chat">
        {
          status !== 'expired' && (
            isMobile ?
              (
                <a className="live-chat btn btn-primary btn-lg"
                  href={ev.video} target="_blank">
                  <i className="fa fa-youtube"></i>&nbsp;
                  &nbsp;Live Chat&nbsp;&nbsp;
                  <i className="fa fa-external-link-square"></i>
                </a>
              ) :
              (
                <Fragment>
                  <a className={`live-chat btn btn-primary btn-lg ${status === 'live' ? '' : 'collapsed'}`}
                    data-toggle="collapse"
                    href="#live-chat-area"
                    role="button"
                    aria-expanded="false" aria-controls="live-chat-area">
                    <i className="fa fa-comments"></i>&nbsp;Live Chat&nbsp;&nbsp;<i className="fa indicator"></i>
                  </a>
                  {
                    status !== 'expired' && (
                      <iframe
                        className={status === 'live' ? '' : 'collapse'}
                        id="live-chat-area"
                        width="100%"
                        frameBorder={0}
                        height="500px"
                        src={`https://www.youtube.com/live_chat?v=${getYouTubeId(ev.video)}&embed_domain=${embedDomain}`}>
                      </iframe>
                    )
                  }
                </Fragment>
              )

          )
        }

      </section>
    )

    let desc = ``;
    if (ev.why) {
      desc += `${ev.why} | `;
    }
    desc += `lead: ${ev.lead}, facilitators: ${ev.facilitators.join(', ')}; `;
    if (ev.venue) {
      desc += `Venue: ${ev.venue} ;`;
    }

    return (
      <Fragment>
        <Head>
          <title>{ev.title} | {READABLE_EVENT_TYPE[ev.type]} | Toronto Deep Learning Series (#TDLS)</title>
          <meta name="description" content={desc} />
          <ThemesAndSuch />
        </Head>
        <Header before={
          <Link href="/events">
            <a ><i className="top-go-back-link fa fa-arrow-circle-left"></i>
            </a>
          </Link>
        } />
        <section className="single-event container-fluid">
          <div className="row">
            <div className="col-12 col-lg-9">
              {
                ev.video ? (
                  <ResponsiveEmbed
                    src={`https://www.youtube.com/embed/${getYouTubeId(ev.video)}`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />) : (
                    <div className="empty-info">
                      <p className="lead">
                        No recording or live stream video available yet.
                        </p>
                      <p className="lead">
                        If this is a future event, please check back a few days before the session starts.
                        </p>
                    </div>
                  )
              }
              <div className="title-info">
                <h1 className="title">
                  <Link href="/events" >
                    <a ><i className="fa fa-arrow-circle-left"></i>
                    </a></Link> {ev.title}
                </h1>
              </div>
              <p><strong>
                Stream:
                </strong> {READABLE_EVENT_TYPE[ev.type]}</p>
            </div>
            <div className="col-12 col-lg-3">
              {liveChat}
              <hr />

              <section className="live-info">
                {
                  (status === 'too_early' || status === 'countdown') && (
                    <a
                      target="_blank"
                      href="https://www.youtube.com/c/TorontoDeepLearningSeries?view_as=subscriber&sub_confirmation=1">
                      <h5>
                        <span className={`badge badge-${{ 'countdown': 'danger', 'too_early': 'danger' }[status]}`}>
                          Live in <Countdown expiresAt={date} />
                        </span>
                      </h5>
                    </a>
                  )
                }
                {
                  status === 'live' && (
                    <h4>
                      <span className="badge badge-danger">
                        We are live!
                      </span>
                    </h4>
                  )
                }
              </section>
              <hr />
              <section className="info-box">
                <h5>Presenters</h5>
                <ul className="list-unstyled">
                  {ev.lead.indexOf('?') < 0 && (
                    <li>
                      Lead:&nbsp;
                        <strong>
                        {nameToLink(ev.lead, linkedInDict[ev.lead])}
                      </strong>
                    </li>
                  )}
                  {ev.facilitators.length !== 0 && (
                    <li>
                      Facilitators:&nbsp;
                      {ev.facilitators.map((f, i) => (
                        <strong key={i}>{nameToLink(f, linkedInDict[f])}</strong>
                      )).reduce((prev, curr) => (
                        <Fragment>
                          {prev}, {curr}
                        </Fragment>
                      ))}
                    </li>
                  )}
                </ul>
                <hr />
                {
                  ev.why && (
                    <Fragment>
                      <h5>Motivation</h5>
                      {ev.why}
                    </Fragment>
                  )
                }
                <ul className="list-unstyled artifact-list">
                  {[
                    [ev.paper, 'Paper', iconLinkFn('fa-file-text-o')],
                    [ev.slides, 'Slides', (lbl, link) => iconLinkFn('fa-file-powerpoint-o')(lbl, `/static/${link}`)],
                    [ev.reddit, 'Reddit post', iconLinkFn('fa-reddit')],
                    [ev.code_official, 'Official code', iconLinkFn('fa-github')],
                    [ev.code_unofficial, 'Unofficial code', iconLinkFn('fa-github')],
                    [ev.dataset1, 'Dataset 1', iconLinkFn('fa-database')],
                    [ev.dataset2, 'Dataset 2', iconLinkFn('fa-database')],

                  ].map(([content, label, linkFn]) => content &&
                    (
                      <li key={label}>
                        {linkFn(label, content)}
                      </li>
                    ))}
                </ul>
                <hr />
                <p><strong>Time:</strong> {timeSnippet}</p>
                <p>{
                  venueSnippet
                }</p>
                {
                  status !== 'expired' && agenda
                }
              </section>
              <hr />
              <p className="lead">
                <a
                  className="btn btn-danger subscribe-youtube btn-lg"
                  target="_blank"
                  href="https://www.youtube.com/c/TorontoDeepLearningSeries?view_as=subscriber&sub_confirmation=1">
                  <i className="fa fa-youtube"></i>&nbsp;Subscribe
                </a>&nbsp;
                <Link href="/get-engaged">
                  <a className="btn btn-primary btn-lg">Get Engaged</a>
                </Link>&nbsp;
              </p>
              <p>
                <Link href="/events">
                  <a className="btn btn-secondary" >
                    <i className="fa fa-arrow-circle-left"></i> Back to events
                </a>
                </Link>
              </p>
            </div>
          </div>
        </section>
        <Footer />
        <SharedBodyScripts />
      </Fragment >
    )
  }

};


function iconLinkFn(iconClass) {
  return (label, url) => (
    <Fragment>
      <a target="_blank" href={url}>
        <i className={`fa fa-lg ${iconClass}`}></i>
        &nbsp;&nbsp;
        <strong>{label}</strong>
        &nbsp;<i className="fa fa-external-link"></i>
      </a>
    </Fragment>
  );
}

function dashedDate(date) {
  return `${date.getDate()}-${MONTH_NAMES[date.getMonth()]}-${date.getYear() + 1900}`;
}

function time(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function ytThumbModal(url) {
  return (
    <ModalVideoContext.Consumer>
      {(openYoutube) => (
        <a type="button" onClick={() => openYoutube(getYouTubeId(url))}>
          {ytThumbPic(url)}
        </a>
      )}
    </ModalVideoContext.Consumer>
  )
}

function ytThumbPic(url) {
  return (
    <Fragment>
      <style jsx>{`
      .youtube-thumb-outer {
        display: inline-block;
      }
      `}</style>
      <div className="youtube-thumb-outer">
        <img src={ytThumb(url)} />
        <div className="overlay">
        </div>
      </div>
    </Fragment>
  );
}


function profileCard([name, title, photo, linkedIn]) {
  return (
    <div key={name} className="col-lg-3 col-6">
      <div className="media-top">
        <img
          className="profile rounded-circle mr-3"
          src={photo} width="120px" />
        <div className="media-body">
          <a href={linkedIn}>
            <b>{name} <i className="fa fa-linkedin-square"></i></b>
          </a>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
}

SingleEvent.getInitialProps = async ({ query: { id }, req }) => {
  const isServer = !!req;
  const event = await getEventById(isServer, id);
  return { event };
}

export default SingleEvent;