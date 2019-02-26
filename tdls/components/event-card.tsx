import React, { Fragment } from 'react';
import { ytThumb } from '../utils/youtube';
import FitText from 'react-fittext';
import { Countdown } from '../components/live-button';
import { PublicEvent } from '../../common/types';
import Link from 'next/link';
import "./event-card.scss";
import { SEOTitle } from '../../common/event';
import {
  getEventId, eventStatus
} from '../../common/event';
import { toLongDateString } from '../utils/datetime';

export default ({
  event: ev,
  showToolbar = true,
  showDate = true,
  showEventStatus = true }: {
    event: PublicEvent,
    showToolbar?: boolean,
    showDate?: boolean,
    showEventStatus?: boolean
  }) => {
  const date = new Date(ev.date);
  const status = eventStatus(ev);


  const cardTitle = (
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

  const dateElem = (
    <div
      className="date align-self-end"
      style={{
        position: 'absolute',
        bottom: 5, right: 5,
        textAlign: 'right',
        color: "white",
        fontWeight: 'bold',
        textShadow: '0 0 5px #000, 0 0 15px #000, 0 0 20px #fff'
      }}
    >
      {toLongDateString(date)}
    </div>
  );

  const thumb = (
    <img className="card-img-top" src={ev.video ? ytThumb(ev.video) : '/static/images/placeholder.jpeg'} alt="Card image cap" />
  );

  return (
    <div className={"d-flex flex-column justify-content-between event card " + (ev.type ? ' event-' + ev.type : '')}>
      <Link href={`/events/${getEventId(ev)}`}>
        <a style={{ display: "block", position: 'relative' }}>
          {thumb}
          {showEventStatus && (
            status === 'too_early' || status === 'countdown' || status === 'live'
          ) && (
              <h5 style={{ position: 'absolute', top: 5, left: 5, textAlign: 'right' }}>
                <span
                  className="badge badge-danger">
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
              </h5>
            )}
          {showDate && dateElem}
        </a>
      </Link>
      <div className="card-body d-flex flex-column justify-content-center"
        style={{
          height: `${9}rem`,
          marginLeft: '0.5em',
          marginRight: '0.5em',
        }}
      >
        <FitText compressor={1.6} minFontSize={20}>
          {cardTitle}
        </FitText>
      </div>
      <div className="align-self-end card-end">
        {showToolbar && toolbarElem}
      </div>
    </div >
  );
}