import React, { Fragment, useState, useEffect } from 'react';
import Slider from "react-slick";
import Link from 'next/link';

import { WEEKDAYS, MONTH_NAMES } from '../utils/datetime';

import {
  getEventsAndGroupings, getLinkedInProfiles
} from '../utils/event-fetch';
import {
  READABLE_EVENT_TYPE, getEventId, isTentative,
} from '../../common/event';


import { nameToLink } from './profile';

export const UpcomingEvents = ({ }) => {
  const [{ events }, setEventsData] = useState({ events: [] });
  const [{ linkedInDict }, setLinkedInData] = useState({ linkedInDict: {} });

  const fetchAndSetFutureEvent = async () => {
    const { futureEvents } = await getEventsAndGroupings();

    setEventsData({ events: futureEvents });
  }

  const fetchAndSetProfile = async () => {
    const linkedInDict = await getLinkedInProfiles();
    setLinkedInData({ linkedInDict });
  }

  useEffect(() => {
    fetchAndSetFutureEvent();
    fetchAndSetProfile();
  }, []);
  return (
    <ul className="list-group upcoming-event-list">
      {
        // display only first 8
        events.slice(0, 8).map(event => {
          const leadLink = linkedInDict[event.lead];
          const facLinks = event.facilitators.map(n => linkedInDict[n]);
          return (
            <UpcomingEventItem key={getEventId(event)}
              {...{ event, leadLink, facLinks }}
            />
          );
        })
      }
    </ul>
  );
}

const UpcomingEventItem = ({ event: ev, leadLink, facLinks }) => {
  const date = new Date(ev.date);
  const dateBlock = (
    <p>
      {WEEKDAYS[date.getDay()]},&nbsp;
{date.getDate()}-{MONTH_NAMES[date.getMonth()]}-{date.getYear() + 1900}
    </p>
  );
  return (
    <li className={'list-group-item' + (ev.type ? ' event-' + ev.type : '') + (isTentative(ev) ? ' tentative' : '')}>
      {dateBlock}
      <h5 className="title">
        <Link href={`/events/${getEventId(ev)}`}>
          <a className="title">
            {ev.type !== 'main' && `[${READABLE_EVENT_TYPE[ev.type].toLowerCase()}] `}
            {ev.title.toLowerCase()}
          </a>
        </Link>
        &nbsp;{ev.paper && <a target="_blank" href={ev.paper}>
          &nbsp;<i className="fa fa-file-text-o"></i></a>}
        &nbsp;{ev.code_official && <a target="_blank" href={ev.code_official}>
          &nbsp;<i className="fa fa-github"></i></a>}
        &nbsp;{ev.code_unofficial && <a target="_blank" href={ev.code_unofficial}>
          &nbsp;<i className="fa fa-github"></i></a>}
      </h5>
      {ev.lead.indexOf('?') < 0 && (
        <Fragment>
          Discussion Lead: <strong>{nameToLink(ev.lead, leadLink)}</strong>
        </Fragment>
      )}
      {ev.facilitators.length !== 0 && (
        <Fragment>
          &nbsp;| Facilitators: {
            ev.facilitators.map((f, i) => (
              <Fragment key={i}>
                <strong key={i}>{nameToLink(f, facLinks[i])}</strong>&nbsp;
              </Fragment>
            ))
          }
        </Fragment>
      )}
    </li>
  );
}
