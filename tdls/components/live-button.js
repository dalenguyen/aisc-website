import React, { Fragment, useState, useEffect } from 'react';
import { getEventsAndGroupings } from '../utils/event-fetch';
import { pad, eventStatus, getEventId } from '../../common/event';
import Link from 'next/link';
import { sleep } from '../../common/utils';

export const Countdown = ({ expiresAt }) => {
  const [_d = 0, _h = 0, _m = 0, _s = 0] = timeFromNow(expiresAt);
  const [{ d, h, m, s }, setClockArms] = useState({ d: _d, h: _h, m: _m, s: _s });

  const renderTime = () => {
    const [d, h, m, s] = timeFromNow(expiresAt);
    setClockArms({
      d, h, m, s
    });
  }

  const tick = async () => {
    if (expiresAt) {
      while (true) {
        renderTime();
        await sleep(1000);
      }
    }
  };

  useEffect(() => {
    tick();
  }, [expiresAt])

  return expiresAt && (
    <Fragment>
      {(d || null) && `${d} ${singularOrPlural(d, 'day')} & `}{pad(h)}:{pad(m)}:{pad(s)}
    </Fragment>
  )
}

function singularOrPlural(num, unit) {
  if (num <= 1) {
    return unit;
  } else {
    return unit + 's';
  }
}

export default ({ allEvents }) => {

  const [{ upcomingEvent: prefetched }, setUpcomingEventData] = useState({
    upcomingEvent: null
  });

  const fetchAndSetUpcomingEvent = async () => {
    const allEvents = await getEventsAndGroupings(false);
    const e = findNextUpcomingEvent(allEvents);
    setUpcomingEventData({ upcomingEvent: e });
  }

  useEffect(() => {
    fetchAndSetUpcomingEvent();
  }, [allEvents]);
  const upcomingEvent = prefetched || (allEvents && findNextUpcomingEvent(allEvents));

  return (
    (upcomingEvent || null) && (
      <Fragment>
        <style jsx>{`
        .live-button {
          animation: glow 1s ease-in-out infinite alternate;
          /* box-shadow: 0 0 20px red; */
        }
        @-webkit-keyframes glow {
          from {
            box-shadow: 0 0 20px #fff;
          }
          to {
            box-shadow: 0 0 20px red;
          }
        }
      `}</style>
        <Link href={`/events/${getEventId(upcomingEvent)}`}>
          <a className="live-button btn btn-danger btn-sm">
            <i className="fa fa-play-circle"></i>
            &nbsp;Live in <Countdown expiresAt={new Date(upcomingEvent.date)} />
          </a>
        </Link>
      </Fragment>
    )
  );
};


function findNextUpcomingEvent(allEvents) {
  if (!allEvents) {
    return null;
  }
  const { futureEvents } = allEvents;
  const futureWithStreams = futureEvents.filter(f => f.video);
  if (futureWithStreams.length === 0) {
    return null;
  } else {
    const candidate = futureWithStreams[0];
    const status = eventStatus(candidate);
    if (status !== 'countdown') {
      return null;
    } else {
      return candidate;
    }
  }
}


function timeFromNow(date) {
  if (!date) {
    return [0, 0, 0, 0];
  }
  let milLLeft = date.getTime() - new Date().getTime();
  const d = Math.floor(milLLeft / (1000 * 60 * 60 * 24));
  milLLeft -= d * (1000 * 60 * 60 * 24);
  const h = Math.floor(milLLeft / (1000 * 60 * 60));
  milLLeft -= h * (1000 * 60 * 60);
  const m = Math.floor(milLLeft / (1000 * 60));
  milLLeft -= m * (1000 * 60);
  const s = Math.floor(milLLeft / 1000);
  return [d, h, m, s];
}