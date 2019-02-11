import React, { Fragment, useState, useEffect } from 'react';
import { getEventId, sleep, getEventsAndGroupings, pad, eventStatus } from '../utils/event';

export const Countdown = ({ expiresAt }) => {
  const [{ h, m, s }, setClockArms] = useState({ h: -1, m: -1, s: -1 });

  const tick = async () => {
    if (expiresAt) {
      while (true) {
        const [h, m, s] = timeFromNow(expiresAt);
        setClockArms({
          h, m, s
        });
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

  let upcomingEvent;

  if(allEvents) {
    upcomingEvent = findNextUpcomingEvent(allEvents);
  } else {
    const [{ upcomingEvent_ }, setUpcomingEventData] = useState({ upcomingEvent: null });
    upcomingEvent = upcomingEvent_;

    const fetchAndSetUpcomingEvent = async () => {
      const allEvents = await getEventsAndGroupings();
      upcomingEvent = findNextUpcomingEvent(allEvents);
      setUpcomingEventData({ upcomingEvent });
    }
  
    useEffect(() => {
      fetchAndSetUpcomingEvent();
    }, []);  
  }

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
        <a className="live-button btn btn-danger btn-sm" href={`/#/events/${getEventId(upcomingEvent)}`}>
          <i className="fa fa-play-circle"></i>
          &nbsp;Live in <Countdown expiresAt={new Date(upcomingEvent.date)} />
        </a>

      </Fragment>
    )
  );
};


function findNextUpcomingEvent(allEvents) {
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
  const diffInMillSec = date.getTime() - new Date().getTime();
  const h = Math.floor(diffInMillSec / (1000 * 60 * 60));
  const m = Math.floor((diffInMillSec - h * (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diffInMillSec - h * (1000 * 60 * 60) - m * (1000 * 60)) / 1000);
  return [h, m, s];
}