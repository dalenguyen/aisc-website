import React, { Fragment, useState, useEffect } from 'react';
import { getEventsAndGroupings } from '../utils/event-fetch';
import { pad, eventStatus, getEventId } from '../../common/event';

import { sleep } from '../../common/utils';

export const Countdown = ({ expiresAt }) => {
  const [_h = 0, _m = 0, _s = 0] = timeFromNow(expiresAt);
  const [{ h, m, s }, setClockArms] = useState({ h: _h, m: _m, s: _s });

  const renderTime = () => {
    const [h, m, s] = timeFromNow(expiresAt);
    setClockArms({
      h, m, s
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
      {pad(h)}:{pad(m)}:{pad(s)}
    </Fragment>
  )
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
        <Link href={`events/${getEventId(upcomingEvent)}`}>
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
    return [0, 0, 0];
  }
  const diffInMillSec = date.getTime() - new Date().getTime();
  const h = Math.floor(diffInMillSec / (1000 * 60 * 60));
  const m = Math.floor((diffInMillSec - h * (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diffInMillSec - h * (1000 * 60 * 60) - m * (1000 * 60)) / 1000);
  return [h, m, s];
}