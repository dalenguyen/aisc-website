import React, { Fragment, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { getEventId, sleep, getEventsAndGroupings, pad } from '../utils/event';

export default () => {
  const [{ upcomingEvent, h, m, s }, setUpcomingEventData] = useState(
    { upcomingEvent: null, h: null, m: null, s: null });
  const fetchAndSetUpcomingEvent = async () => {
    const upcomingEvent = await findNextUpcomingEvent();
    setUpcomingEventData({
      upcomingEvent
    });

    if (upcomingEvent) {
      while (true) {
        const [h, m, s] = timeFromNow(upcomingEvent.date);
        setUpcomingEventData({
          upcomingEvent, h, m, s
        });
        await sleep(1000);
      }
    }
  }

  useEffect(() => {
    fetchAndSetUpcomingEvent();
  }, []);

  return (
    upcomingEvent && (
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
        <a className="live-button btn btn-danger" href={`/#/events/${getEventId(upcomingEvent)}`}>
          <i className="fa fa-play-circle"></i>
          &nbsp;Live in {pad(h)}:{pad(m)}:{pad(s)}
        </a>

      </Fragment>
    )
  );
};

async function findNextUpcomingEvent() {
  const { futureEvents } = await getEventsAndGroupings();
  const futureWithStreams = futureEvents.filter(f => f.video);
  if (futureWithStreams.length === 0) {
    return null;
  } else {
    const candidate = futureWithStreams[0];
    if (candidate.date.getTime() - new Date().getTime() > 48 * 60 * 60 * 1000) {
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