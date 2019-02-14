import React, { Fragment, useState, useEffect } from 'react';
import { ytThumb } from '../utils/youtube';

import Link from 'next/link';
import "./event-card.scss";

import {
  READABLE_EVENT_TYPE, getEventId, toShortDateString
} from '../../common/event';

export default ({ event: ev, toolbar = true }) => {
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
    <div className="toolbar">
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

  const thumb = (
    <img className="card-img-top" src={ev.video ? ytThumb(ev.video) : '/static/images/placeholder.jpeg'} alt="Card image cap" />
  );

  return (

    <div className={"event card " + (ev.type ? ' event-' + ev.type : '')}>
      <Link href={`/events/${getEventId(ev)}`}>
        <a>
          {thumb}
        </a>
      </Link>
      <div className="card-body">
        {cardTitle}
      </div>
      {toolbar && toolbarElem}
    </div>
  );
}