
import React, { useState, useEffect, Fragment } from 'react';

import fetch from 'isomorphic-unfetch'

import Header from '../components/header'
import Footer from '../components/footer'
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
import ResponsiveEmbedEmpty from 'react-bootstrap/ResponsiveEmbed';

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

    const fetchAndSetProfile = async () => {
      const linkedInDict = await getLinkedInProfiles(false);
      setLinkedInData({ linkedInDict });
    }

    useEffect(() => {
      fetchAndSetProfile();
    }, [getEventId(ev)]);

    const timeSnippet = (
      <Fragment>
        {WEEKDAYS[date.getDay()]}&nbsp;
                {dashedDate(date)}&nbsp;{time(date)}
        {{
          'live': ' (this event is live!)',
          'expired': ' (This is a past event.)'
        }[status]}
      </Fragment>
    );
    const venueSnippet = (
      status !== 'expired' ?
        "(TDLS members: please refer to Slack or your calendar invite for location)" : venueToLink(ev.venue)
    )

    const agenda = (
      <Fragment>
        <h4 >Agenda</h4>
        <ul className="list-unstyled">
          <li>5:30-6:15,   arrivals and socializing</li>
          <li>6:15-6:30    intros and announcements</li>
          <li>6:30-7:15,   algorithm review</li>
          <li>7:15-8:00,   results and discussions</li>
        </ul>
      </Fragment>
    );

    let desc = ``;
    if (ev.why) {
      desc += `${ev.why} | `;
    }
    lead += `lead: ${ev.lead}, facilitators: ${ev.facilitators.join(', ')}; `;
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
            <div className="col-12 col-md-9">
              {
                ev.video ? (
                  <ResponsiveEmbed
                    src={`https://www.youtube.com/embed/${getYouTubeId(ev.video)}`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />) : (
                    <ResponsiveEmbedEmpty aspectRatio="16by9">
                      <div className="empty-info">
                        <p className="lead">
                          No recording or live stream video available yet.
                        </p>
                        <p className="lead">
                          If this is a future event, please check back a few days before the session starts.
                        </p>
                      </div>
                    </ResponsiveEmbedEmpty>
                  )
              }
              <div className="title-info">
                <h1 className="title inline">
                  <Link href="/events" >
                    <a ><i className="fa fa-arrow-circle-left"></i>
                    </a></Link> {ev.title}
                </h1>
                <a
                  className="btn btn-danger subscribe-youtube pull-right"
                  target="_blank"
                  href="https://www.youtube.com/c/TorontoDeepLearningSeries?view_as=subscriber&sub_confirmation=1">
                  <i className="fa fa-youtube"></i>&nbsp;Subscribe
                </a>
              </div>
              <p><strong>Time:</strong> {timeSnippet}</p>
            </div>
            <div className="col-12 col-md-3">
              <section className="info-box">
                <h5>Presenter Panel</h5>
                <dl className="row">
                  {ev.lead.indexOf('?') < 0 && (
                    <Fragment>
                      <dt className="col-sm-3">Lead:</dt>
                      <dd className="col-sm-9"><strong>{nameToLink(ev.lead, linkedInDict[ev.lead])}</strong></dd>
                    </Fragment>
                  )}
                  {ev.facilitators.length !== 0 && (
                    <Fragment>
                      <dt className="col-sm-3">Facilitators: </dt>
                      <dd className="col-sm-9">{ev.facilitators.map((f, i) => (
                        <Fragment key={i}>
                          <strong key={i}>{nameToLink(f, linkedInDict[f])}</strong>&nbsp;
                    </Fragment>
                      ))}</dd>
                    </Fragment>
                  )}
                </dl>
                {
                  ev.why && (
                    <Fragment>
                      <h6>Motivation</h6>
                      {ev.why}
                    </Fragment>
                  )
                }
                {
                  status !== 'expired' && (
                    <Fragment>
                      {agenda}
                      <Link href="/code-of-conduct">
                        <a className="btn btn-secondary">Code of Conduct</a>
                      </Link>
                    </Fragment>
                  )
                }

              </section>
              <div>
                <Link href="/get-engaged">
                  <a className="btn btn-primary">Get Engaged</a>
                </Link>&nbsp;
                <Link href="/events" >
                  <a className="btn btn-secondary" >&larr; Back to events
                </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section>
          <header>
          </header>
          <main className={isTentative(ev) ? 'tentative' : ''}>
            <dl className="row">
              {[
                [ev.paper, 'Paper', iconLinkFn('fa-file-text-o')],
                [ev.slides, 'Slides', link => iconLinkFn('fa-file-powerpoint-o')(`/static/${link}`)],
                [ev.reddit, 'Reddit post', iconLinkFn('fa-reddit')],
                [ev.code_official, 'Official code', iconLinkFn('fa-github')],
                [ev.code_unofficial, 'Unofficial code', iconLinkFn('fa-github')],
                [ev.dataset1, 'Unofficial code 1', iconLinkFn('fa-database')],
                [ev.dataset2, 'Unofficial code 2', iconLinkFn('fa-database')],

              ].map(([content, label, linkFn]) => content &&
                (
                  <Fragment key={label}>
                    < dt className="col-sm-4">{label}</dt>
                    <dd className="col-sm-8">{linkFn(content)}</dd>
                  </Fragment>
                ))}

              <dt className="col-sm-4">Category:</dt> <dd className="col-sm-8">{READABLE_EVENT_TYPE[ev.type]}</dd>
            </dl>
          </main>
          <footer>

          </footer>
        </section>
        <Footer />
        <SharedBodyScripts />
      </Fragment >
    )
  }

};


function iconLinkFn(iconClass) {
  return (url) => (
    <Fragment>
      <a target="_blank" href={url}>
        <i className={`fa fa-lg ${iconClass}`}></i>
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