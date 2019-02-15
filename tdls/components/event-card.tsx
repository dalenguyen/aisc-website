import React, { Fragment } from 'react';
import { ytThumb } from '../utils/youtube';

import Link from 'next/link';
import "./event-card.scss";

import {
  getEventId
} from '../../common/event';
import { toLongDateString } from '../utils/datetime';

export default ({ event: ev, showToolbar = true, showDate = true }) => {
  const date = new Date(ev.date);

  const cardTitle = (
    <Fragment>
      <Link href={`/events/${getEventId(ev)}`}>
        <a className="title card-title">
          {ev.title.toLowerCase()}
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
    <div className="date align-self-end">
      {toLongDateString(date)}
    </div>
  );

  const thumb = (
    <img className="card-img-top" src={ev.video ? ytThumb(ev.video) : '/static/images/placeholder.jpeg'} alt="Card image cap" />
  );

  return (

    <div className={"d-flex flex-column justify-content-between event card " + (ev.type ? ' event-' + ev.type : '')}>
      <Link href={`/events/${getEventId(ev)}`}>
        <a>
          {thumb}
        </a>
      </Link>
      <div className="card-body">
        {cardTitle}
      </div>
      <div className="align-self-end card-end">
        {showToolbar && toolbarElem}
        {showDate && dateElem}
      </div>
    </div>
  );
}