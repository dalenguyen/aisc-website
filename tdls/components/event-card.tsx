import React, { Fragment } from 'react';
import { ytThumb } from '../utils/youtube';
import FitText from 'react-fittext';
import { Countdown } from '../components/live-button';
import { PublicEvent } from '../../common/types';
import Link from 'next/link';
import "./event-card.scss";
import classnames from 'classnames';
import { SEOTitle } from '../../common/event';
import {
  getEventId, eventStatus, isImminent
} from '../../common/event';
import { toLongDateString } from '../utils/datetime';
import { EventType } from '../../member/functions/common/types';

const StatusBadge = ({ event: ev }: { event: PublicEvent }) => {
  const status = eventStatus(ev);
  const date = new Date(ev.date);

  return (
    <Fragment>
      {(
        status === 'too_early' || status === 'countdown' || status === 'live'
      ) && (
          <span
            className={classnames("badge", status === 'too_early' ? 'badge-outline-danger' : 'badge-danger')}>
            {
              status === 'too_early' && "Upcoming"
            }
            {status === 'live' && "Live"}
            {
              status === 'countdown' && (
                <Fragment>
                  Live in <br /><Countdown expiresAt={date} />
                </Fragment>
              )
            }
          </span>
        )}
    </Fragment>
  )
}

const TypeBadge = ({ event: ev }: { event: PublicEvent }) => {
  const shorthand = {
    'Main Stream': 'main',
    'Foundational': 'foundational',
    'Trending Paper': 'fasttrack',
    'Author Speaking': 'authors',
    'Code Review': 'codereview'
  }[ev.type];

  return (
    <Fragment>
      <span
        className={classnames("badge badge-outline", "badge-" + shorthand)}>
        {ev.type}
      </span>
    </Fragment>
  )
}

const Thumb = ({ event: ev, height }: { event: PublicEvent, height: string }) => {
  return (
    <img className="card-img-top"
      src={ev.video ? ytThumb(ev.video) : '/static/images/placeholder.jpeg'}
      alt="Card image cap"
      style={{
        height
      }}
    />
  );
}

const DateElem = ({ date }: { date: Date }) => {
  return (
    <div
      className="date align-self-end"
      style={{
        position: 'absolute',
        bottom: "3%", right: "3%",
        textAlign: 'right',
        color: "white",
        fontWeight: 'bold',
        textShadow: '0 0 5px #000, 0 0 15px #000, 0 0 20px #fff'
      }}
    >
      {toLongDateString(date)}
    </div>
  );
}

const CardTitle = ({ event: ev }: { event: PublicEvent }) => {
  return (
    <Fragment>
      <Link href={`/events/${getEventId(ev)}`}>
        <a className="title card-title" style={{
          textAlign: 'center',
        }}>
          {SEOTitle(ev)}
        </a>
      </Link>
    </Fragment>
  )

}

export default ({
  event: ev,
  showToolbar = true,
  showDate = true,
  showEventStatus = true
}: {
  event: PublicEvent,
  showToolbar?: boolean,
  showDate?: boolean,
  showEventStatus?: boolean
}) => {
  const date = new Date(ev.date);



  const toolbarElem = (
    <div className="toolbar align-self-end">
      &nbsp;<a href={`#/events/${getEventId(ev)}`}><i className="fa fa-share-alt fa-lg"></i></a>
      {ev.paper ? <a target="_blank" href={ev.paper}><i className="fa fa-file-text-o fa-lg"></i></a> : null}
      {ev.video ? <a target="_blank" href={ev.video}><i className="fa fa-play-circle fa-lg"></i></a> : null}
      {ev.slides ? <a target="_blank" href={`/static/${ev.slides}`}><i className="fa fa-file-powerpoint-o fa-lg"></i></a> : null}
      {ev.reddit ? <a target="_blank" href={ev.reddit}><i className="fa fa-reddit fa-lg"></i></a> : null}
      {ev.code_official ? <a target="_blank" href={ev.code_official}><i className="fa fa-github fa-lg"></i></a> : null}
      {ev.code_unofficial ? <a target="_blank" href={ev.code_unofficial}><i className="fa fa-github fa-lg"></i></a> : null}
      {ev.dataset1 ? <a target="_blank" href={ev.dataset1}><i className="fa fa-database fa-lg"></i></a> : null}
      {ev.dataset2 ? <a target="_blank" href={ev.dataset2}><i className="fa fa-database fa-lg"></i></a> : null}
    </div>
  );

  return (
    <div className={classnames("flex-column justify-content-between",
      "event card",
      ev.type && ' event-' + ev.type)}>
      <div style={{
        position: 'relative'
      }}>
        <Link href={`/events/${getEventId(ev)}`}>
          <a>
            <Thumb event={ev} height={"9.5rem"} />
            <div className="badge-area" style={{
              position: 'absolute',
              top: '3%',
              left: '3%',
              width: '95%'
            }}>
              {showEventStatus && <span className="mr-1"><StatusBadge event={ev} /></span>}
              {ev.type !== 'Main Stream' && <TypeBadge event={ev} />}
            </div>
            {showDate && <DateElem date={date} />}
          </a>
        </Link>
      </div>
      <div className={classnames("vertical card-body",
        "info d-flex flex-column justify-content-center ml-1 mr-1")}
        style={{
          height: `${9}rem`,
        }}
      >
        <FitText compressor={1.6} minFontSize={20}>
          <CardTitle event={ev} />
        </FitText>
      </div>
      <div className="align-self-end card-end">
        {showToolbar && toolbarElem}
      </div>
    </div>
  );
}

export const ShowcaseEventCard = ({ event: ev }: { event: PublicEvent }) => {
  const date = new Date(ev.date);
  const status = eventStatus(ev);
  return (
    <div className="event showcase container-fluid mt-1 mb-4 ml-0 mr-0">
      <div className="row">
        <div className="col-xs-12 col-sm-6 info d-flex flex-column" style={{
          minHeight: '10rem'
        }}>
          <Link href={`/events/${getEventId(ev)}`}>
            <a>
              <div className="lead mt-1 badge-area mb-2 mt-2">
                {isImminent(ev) ? (
                  <span className="badge badge-danger mr-3">
                    {
                      status === 'live' && "We are live!"
                    }{
                      (status === 'countdown') && (
                        <Fragment>
                          Live in <Countdown expiresAt={date} />
                        </Fragment>
                      )
                    }
                  </span>
                ) : (
                    <span className="badge badge-outline-danger mr-2">
                      {status === 'too_early' && (
                        <Fragment>
                          Live in <Countdown expiresAt={date} />
                        </Fragment>
                      )}
                    </span>
                  )}
                <span className="mr-2">
                  <TypeBadge event={ev} />
                </span>
                <div style={{ display: "inline-block" }} className="mt-2 ">
                  {toLongDateString(date)}
                </div>
              </div>
            </a>
          </Link>
          <div className="d-flex flex-grow-1 flex-column justify-content-center mt-2 mb-4">
            <FitText compressor={1.6} minFontSize={20}>
              <CardTitle event={ev} />
            </FitText>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 p-0">
          <Link href={`/events/${getEventId(ev)}`}>
            <a>
              <Thumb event={ev} height={"16rem"} />
            </a>
          </Link>
        </div>

      </div>
    </div>
  )
}