
import React, { useState, useEffect, Fragment } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { ModalVideoContext, YouTubeModalWrapper } from '../components/youtube-modal';
import { WEEKDAYS, MONTH_NAMES } from '../utils/datetime';
import { venueToLink } from '../utils/venue';
import { ytThumb, getYouTubeId } from '../utils/youtube';
import Link from 'next/link';
import { pad, eventStatus } from '../../common/event';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { nameToLink } from './profile';


import {
  getEventsAndGroupings, getLinkedInProfiles
} from '../utils/event-fetch';
import {
  READABLE_EVENT_TYPE, getEventId, isTentative,
} from '../../common/event';


import { Countdown } from './live-button';

export const EventModalContext = React.createContext();


export const EventModalWrapper = ({ children }) => {
  const [{ isOpen, modalEventId }, setModalState] = useState({ isOpen: false });

  const [{ event: ev }, setEventsData] = useState({ events: [] });
  const [{ linkedInDict }, setLinkedInData] = useState({ linkedInDict: {} });

  const fetchAndSetEvent = async (eventId) => {
    const { pastEvents, futureEvents } = await getEventsAndGroupings(false);
    const event = futureEvents.find(ev => getEventId(ev) === eventId) || pastEvents.find(ev => getEventId(ev) === eventId);
    setEventsData({ event });
  }

  const fetchAndSetProfile = async () => {
    const linkedInDict = await getLinkedInProfiles(false);
    setLinkedInData({ linkedInDict });
  }

  useEffect(() => {
    if (modalEventId) {
      fetchAndSetEvent(modalEventId);
      fetchAndSetProfile();
    }
  }, [modalEventId]);

  const openEventModal = async (eventId) => {
    setModalState({ isOpen: true, modalEventId: eventId });
  }

  const closeEventModal = () => {
    setModalState({ isOpen: false, modalEventId: null });
    history.pushState(null, null, '#/main');
  }

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

  const date = ev && new Date(ev.date);

  const status = eventStatus(ev);
  return (
    <EventModalContext.Provider
      value={openEventModal}
    >
      <YouTubeModalWrapper>
        {children}
        {ev &&
          <Modal centered={true}
            show={isOpen} size="lg"
            onHide={closeEventModal}>
            <Modal.Header closeButton>
              <Modal.Title className="title">{ev.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={isTentative(ev) ? 'tentative' : ''}>
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
                              <i className="fa fa-youtube"></i>&nbsp;Subscribe
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
            </Modal.Body>
            <Modal.Footer>
              <CopyToClipboard text={window.location.href}
                onCopy={() => null}>
                <Button id="copy-link" variant="info" onClick={copyLink}>Copy link</Button>
              </CopyToClipboard>

              <a href="/get-engaged" className="btn btn-primary">Get Engaged</a>
              {
                status !== 'expired' && (
                  <Link href="/code-of-conduct">
                    <a className="btn btn-secondary">Code of Conduct</a>
                  </Link>
                )
              }
              <Button variant="secondary" onClick={closeEventModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        }
      </YouTubeModalWrapper>
    </EventModalContext.Provider>
  );
};

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

function ytThumbLink(url) {
  return (
    <a href={url} target="_blank">
      {ytThumbPic(url)}
    </a>
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

async function copyLink() {
  await copyToClipboard(window.location.href);
}

async function copyToClipboard(text) {
  // noop for now. this thing is kinda broken
  return null;
  // try {
  //   const toCopy = text || location.href;
  //   await navigator.clipboard.writeText(toCopy);
  // } catch (err) {
  //   console.error('Failed to copy: ', err);
  // }
}


