
import React, { useState, useEffect, Fragment } from 'react';

import fetch from 'isomorphic-unfetch'

import Header from '../components/header'
import Footer from '../components/footer'
import Head from 'next/head'
import ThemesAndSuch from '../components/themes-and-such';
import SharedBodyScripts from '../components/shared-body-scripts'
import { getEventById } from '../utils/event-fetch';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { nameToLink } from '../components/profile';
import {
  pad, eventStatus,
  isTentative, READABLE_EVENT_TYPE
} from '../../common/event';
import { Button } from 'react-bootstrap';
import { ModalVideoContext, YouTubeModalWrapper } from '../components/youtube-modal';
import { WEEKDAYS, MONTH_NAMES } from '../utils/datetime';
import { venueToLink } from '../utils/venue';
import { ytThumb, getYouTubeId } from '../utils/youtube';
import Link from 'next/link';

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
    return (
      <Fragment>
        <Head>
          <title>About TDLS</title>
          <ThemesAndSuch />
        </Head>
        <Header />
        <section>
          <header>
            <h1 className="title">{ev.title}</h1>
          </header>
          <main className={isTentative(ev) ? 'tentative' : ''}>
            <dl className="row">
              <dt className="col-sm-4">Time:</dt>
              <dd className="col-sm-8">
                {WEEKDAYS[date.getDay()]}&nbsp;
                {dashedDate(date)}&nbsp;{time(date)}
                {{
                  'live': ' (this event is live!)',
                  'expired': ' (This is a past event.)'
                }[status]}
              </dd>
              {status !== 'expired' ? (
                <Fragment>
                  <dt className="col-sm-4">Venue:</dt>
                  <dd className="col-sm-8">
                    (TDLS members: please refer to Slack or your calendar invite for location)
                    </dd>
                </Fragment>
              ) : (
                  <Fragment>
                    <dt className="col-sm-4">Venue:</dt>
                    <dd className="col-sm-8">
                      {venueToLink(ev.venue)}
                    </dd>
                  </Fragment>
                )
              }
              {ev.lead.indexOf('?') < 0 && (
                <Fragment>
                  <dt className="col-sm-4">Discussion lead:</dt>
                  <dd className="col-sm-8"><strong>{nameToLink(ev.lead, linkedInDict[ev.lead])}</strong></dd>
                </Fragment>
              )}
              {ev.facilitators.length !== 0 && (
                <Fragment>
                  <dt className="col-sm-4">Discussion facilitators: </dt>
                  <dd className="col-sm-8">{ev.facilitators.map((f, i) => (
                    <Fragment key={i}>
                      <strong key={i}>{nameToLink(f, linkedInDict[f])}</strong>&nbsp;
                    </Fragment>
                  ))}</dd>
                </Fragment>
              )}
              {[
                [
                  ev.video, (
                    <a href={ev.video} target="_blank">{status === 'expired' ? 'Recording' : 'Live Stream'}</a>
                  ),
                  (url) => status === 'expired' ? ytThumbModal(url) : (
                    status === 'countdown' ? (
                      <Fragment>
                        {ytThumbLink(url)}
                        <div style={{ display: 'inline-block', marginLeft: '1em', lineHeight: '2em' }}>
                          &nbsp;<a href={url} target="_blank">(live in <strong><Countdown expiresAt={date} /></strong>)</a>
                          <br />
                          <a
                            className="btn btn-danger"
                            href="https://www.youtube.com/c/TorontoDeepLearningSeries?view_as=subscriber&sub_confirmation=1">
                            <i class="fa fa-youtube"></i>&nbsp;Subscribe
                              </a>
                        </div>
                      </Fragment>
                    ) : ytThumbLink(url)
                  )
                ],
                [ev.paper, 'Paper', iconLinkFn('fa-file-text-o')],
                [ev.slides, 'Slides', link => iconLinkFn('fa-file-powerpoint-o')(`/static/${link}`)],
                [ev.reddit, 'Reddit post', iconLinkFn('fa-reddit')],
                [ev.code_official, 'Official code', iconLinkFn('fa-github')],
                [ev.why, 'Motivation', () => ev.why],
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
              {status !== 'expired' && (
                <Fragment>
                  <dt className="col-sm-4">Agenda:</dt>
                  <dd className="col-sm-8">
                    <ul className="list-unstyled">
                      <li>5:30-6:15,   arrivals and socializing</li>
                      <li>6:15-6:30    intros and announcements</li>
                      <li>6:30-7:15,   algorithm review</li>
                      <li>7:15-8:00,   results and discussions</li>
                    </ul>
                  </dd>
                </Fragment>
              )}
              <dt className="col-sm-4">Category:</dt> <dd className="col-sm-8">{READABLE_EVENT_TYPE[ev.type]}</dd>
            </dl>
          </main>
          <footer>

            <a href="/get-engaged" className="btn btn-primary">Get Engaged</a>
            {
              status !== 'expired' && (
                <Link href="/code-of-conduct">
                  <a className="btn btn-secondary">Code of Conduct</a>
                </Link>
              )
            }
            <a className="btn btn-secondary"
              href="/#main" >&larr; Go back</a>
          </footer>
        </section>
        <Footer />
        <SharedBodyScripts />
      </Fragment>
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