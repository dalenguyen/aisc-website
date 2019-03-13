
import React, { useState, useEffect, Fragment } from 'react';

import Header from '../components/header'
import Footer from '../components/footer'
import { Countdown } from '../components/live-button';
import Head from 'next/head'
import ThemesAndSuch from '../components/themes-and-such';
import SharedBodyScripts from '../components/shared-body-scripts'
import { getEventById, getLinkedInProfiles } from '../utils/event-fetch';
import { nameToLink } from '../components/profile';
import {
  pad, eventStatus,
} from '../../common/event';
import { ModalVideoContext, } from '../components/youtube-modal';
import { WEEKDAYS, MONTH_NAMES } from '../utils/datetime';
import { venueToLink } from '../utils/venue';
import { ytThumb, getYouTubeId } from '../../common/youtube';
import Link from 'next/link';
import ResponsiveEmbed from 'react-responsive-embed';
import { mobileCheck } from '../../common/utils';
import { PublicEvent, MemberEvent } from '../../common/types';
import { SEOTitle } from '../../common/event';
import { getQueryStringValue } from '../../common/utils';

import getConfig from 'next/config'
const { SITE_NAME_FULL, SITE_ABBREV } = getConfig().publicRuntimeConfig;

import './single-event.scss';
import DonateButton, { DonateForm } from '../components/donate-button';

const SingleEvent = ({
  event: ev,
  isMember: initIsMember = false,
  linkedInDict,
}
  :
  {
    event: PublicEvent | MemberEvent,
    isMember: boolean,
    router: { query: { member?: boolean } },
    linkedInDict: { [n: string]: string },
  }) => {

  if (!ev) {
    return (
      <div>
        Event not found.
      </div>
    );
  } else {

    const [{ isMember }, updateIsMember] = useState({ isMember: initIsMember });

    const date = ev && new Date(ev.date);
    const status = eventStatus(ev);


    const [{ isMobile }, setIsMobile] = useState({ isMobile: true });

    useEffect(() => {
      const isMobile = mobileCheck();
      setIsMobile({ isMobile });
    }, []);

    const embedDomain = typeof window === 'undefined' ? 'tdls.a-i.science' : window.location.host.split(":")[0];

    useEffect(() => {
      // force rerender
      const routerIsMember = !!getQueryStringValue("member");
      updateIsMember({ isMember: routerIsMember });
    }, []);


    useEffect(() => {
      (window as any).lever = () => {
        console.log('lever placed');
        pageTransitionReadyToEnter();
      }
    }, [])

    const timeSnippet = (
      <Fragment>
        {WEEKDAYS[date.getDay()]}&nbsp;
        {dashedDate(date)}
        {!isMember && ` ${time(date)}`}
        {{
          'live': ' (this event is live!)',
          'expired': ' (This is a past event.)'
        }[status]}
      </Fragment>
    );
    const venueSnippet = (
      <Fragment><strong>Venue</strong>: {
        status !== 'expired' ?
          `(${SITE_ABBREV} members: please refer to Slack or your calendar invite for location)` : venueToLink((ev as MemberEvent).venue)
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
        <h5>Filming and Photography</h5>
        <p>
          Please note that there will be photography and livestreaming at this event.
        </p>
        <p>
          If you do not wish to be shown on the live stream or in photographs, please come talk to us ahead of the session.
        </p>
        <Link href="/code-of-conduct">
          <a className="btn btn-outline-secondary btn-sm">Code of Conduct</a>
        </Link>

      </Fragment >
    );

    const liveChat = (ev.video || null) && (
      <Fragment>
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
                    <iframe
                      className={status === 'live' ? '' : 'collapse'}
                      id="live-chat-area"
                      width="100%"
                      frameBorder={0}
                      height="500px"
                      src={`https://www.youtube.com/live_chat?v=${getYouTubeId(ev.video)}&embed_domain=${embedDomain}`}>
                    </iframe>
                  </Fragment>
                )
            )
          }
        </section>
        <hr />
      </Fragment>
    )

    let desc = ``;
    if (ev.why) {
      desc += `${ev.why} | `;
    }
    desc += `lead: ${ev.lead}, facilitators: ${ev.facilitators.join(', ')}; `;
    return (
      <Fragment>
        <Head>
          <title>{SEOTitle(ev)} | {ev.type} | {SITE_NAME_FULL}</title>
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
            <div className="col-12 col-lg-8">
              {
                ev.video ? (
                  <ResponsiveEmbed
                    src={`https://www.youtube.com/embed/${getYouTubeId(ev.video)}?enablejsapi=1`}
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
                    </a></Link> {SEOTitle(ev)}
                </h1>
              </div>
              <article className="info-below ml-3">
                {
                  ev.why && (
                    <Fragment>
                      <h5>Motivation</h5>
                      {ev.why}
                    </Fragment>
                  )
                }
                <section>
                  <h5 className="mt-3">Subjects: </h5>
                  <ul
                    className="list-unstyled list-inline display-inline"
                  >
                    {
                      ev.subjects.map(s => (
                        <li className="list-inline-item mr-2" key={s}
                          style={{
                            textAlign: 'center',
                          }}
                        >
                          <Link href={`/events?subject=${s}`}>
                            <a className="btn btn-outline-secondary">
                              {s}
                            </a>
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </section>
                <section>
                  <h5 className="mt-3">
                    Stream:
                </h5>
                  &nbsp;
                <Link href={`/events?stream=${ev.type}`}>
                    <a className="btn btn-info">{ev.type}</a>
                  </Link>
                </section>
              </article>
            </div>

            <div className="col-12 col-lg-4">
              {liveChat}

              <section className="live-info">
                {
                  (status === 'too_early' || status === 'countdown') && (
                    <Fragment>
                      <a
                        target="_blank"
                        href="https://www.youtube.com/c/TorontoDeepLearningSeries?view_as=subscriber&sub_confirmation=1">
                        <h5 style={{ display: 'inline-block' }}>
                          <span className={`badge badge-${{ 'countdown': 'danger', 'too_early': 'outline-danger' }[status]}`}>
                            Live in <Countdown expiresAt={date} />
                          </span>
                        </h5>
                      </a>
                      {!isMember && (status === 'too_early' || status === 'countdown') && (
                        <p>This is an online streaming event.</p>
                      )}
                    </Fragment>

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
                <ul className="list-unstyled artifact-list">
                  {([
                    [ev.paper, 'Paper', iconLinkFn('fa-file-text-o')],
                    [ev.slides, 'Slides', (lbl: string, link: string) => iconLinkFn('fa-file-powerpoint-o')(lbl, `/static/${link}`)],
                    [ev.reddit, 'Reddit post', iconLinkFn('fa-reddit')],
                    [ev.code_official, 'Official code', iconLinkFn('fa-github')],
                    [ev.code_unofficial, 'Unofficial code', iconLinkFn('fa-github')],
                    [ev.dataset1, 'Dataset 1', iconLinkFn('fa-database')],
                    [ev.dataset2, 'Dataset 2', iconLinkFn('fa-database')],
                  ] as [string, string, Function][]).map(([content, label, linkFn]) => content &&
                    (
                      <li key={label}>
                        {linkFn(label, content)}
                      </li>
                    ))}
                </ul>
                <hr />
                <p><strong>Time:</strong> {timeSnippet}</p>
                {
                  (isMember || status === 'expired') && (
                    <p>
                      {venueSnippet}
                    </p>
                  )
                }
                {
                  isMember && status !== 'expired' && agenda
                }
              </section>
              <hr />
              <div className="">
                <a
                  className="btn btn-danger subscribe-youtube"
                  target="_blank"
                  href="https://www.youtube.com/c/TorontoDeepLearningSeries?view_as=subscriber&sub_confirmation=1">
                  <i className="fa fa-youtube"></i>&nbsp;Subscribe
                </a>&nbsp;
                <Link href="/get-engaged">
                  <a className="btn btn-primary">Get Engaged</a>
                </Link>&nbsp;
                <DonateForm className="d-inline-block">
                  <input
                    className="btn btn-warning"
                    type="submit"
                    name="submit"
                    value="Donate"
                    title="PayPal - The safer, easier way to pay online!"
                    alt="Donate" />
                </DonateForm>
              </div>

              <div className="mt-2">
                <Link href="/events">
                  <a className="btn btn-secondary">
                    <i className="fa fa-arrow-circle-left"></i> Back to events
                </a>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
        <SharedBodyScripts />
      </Fragment >
    )
  }

};

function iconLinkFn(iconClass: string) {
  return (label: string, url: string) => (
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

function dashedDate(date: Date) {
  return `${date.getDate()}-${MONTH_NAMES[date.getMonth()]}-${date.getYear() + 1900}`;
}

function time(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function ytThumbModal(url: string) {
  return (
    <ModalVideoContext.Consumer>
      {(openYoutube: Function) => (
        <a type="button" onClick={() => openYoutube(getYouTubeId(url))}>
          {ytThumbPic(url)}
        </a>
      )}
    </ModalVideoContext.Consumer>
  )
}

function ytThumbPic(url: string) {
  return (
    <Fragment>
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

SingleEvent.getInitialProps = async (
  { query: { id, member: isMember }, req }: {
    query: { id: string, member?: boolean }, req: any
  }
) => {
  const isServer = !!req;
  const event: PublicEvent = await getEventById(isServer, id);
  const linkedInDict = await getLinkedInProfiles(isServer);

  const relevantLinkedInProfiles = (event ? [event.lead, ...event.facilitators] : []).reduce(
    (acc, n) => Object.assign(acc, {
      [n]: linkedInDict[n]
    }), {});

  return { event, isMember, linkedInDict: relevantLinkedInProfiles };
}

export default SingleEvent;