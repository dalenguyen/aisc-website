import React, { Fragment, useState, useEffect } from 'react';
import Slider from "react-slick";
import { ytThumb } from '../utils/youtube';
import './event-carousel.scss';

import {
  READABLE_EVENT_TYPE, getEventId,
  getLinkedInProfiles,
  toShortDateString
} from '../utils/event';


export default ({ filter = null, shuffle = false, allEvents }) => {
  const { pastEvents: events } = allEvents;
  const [{ linkedInDict }, setLinkedInData] = useState({ linkedInDict: {} });

  const fetchAndSetProfile = async () => {
    const linkedInDict = await getLinkedInProfiles();
    setLinkedInData({ linkedInDict });
  }

  useEffect(() => {
    fetchAndSetProfile();
  }, [])

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6.1,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1560,
        settings: {
          slidesToShow: 6.1,
          slidesToScroll: 6,
        }
      },
      {
        breakpoint: 1429,
        settings: {
          slidesToShow: 4.1,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3.1,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1
        }
      }
    ],
    variableHeight: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SampleNextArrow />
  };

  return (
    <Slider className="past-event-list event-carousel" {...settings}>
      {(shuffle ? randomShuffle : a => a)(filterEvents(events, filter), 41).map((event, idx) => {
        const leadLink = linkedInDict[event.lead];
        const facLinks = event.facilitators.map(n => linkedInDict[n]);
        return (
          <EventCard key={idx} {...{ event, leadLink, facLinks }} />
        );
      })}
    </Slider>
  );
}

function filterEvents(events, filter) {
  if (!filter) {
    return events;
  }
  return events.filter(e => match(e, filter));
}

function match(event, filter) {
  return Object.keys(filter).every(k => {
    const val = event[k];
    if (Array.isArray(val)) {
      return val.some(v => v === filter[k]);
    } else {
      return val === filter[k];
    }
  });
}

const EventCard = ({ event: ev, leadLink, facLinks }) => {
  const cardTitle = (
    <Fragment>
      <style jsx>{`
      .title {
        margin-bottom: 5px;
        display: block;
      }
    `}</style>
      <a className="title card-title" href={`/#/events/${getEventId(ev)}`}>
        {ev.title.toLowerCase()}
      </a>
    </Fragment>
  )


  const toolbar = (
    <div className="toolbar">
      &nbsp;<a href="#/events/${getEventId(ev)}"><i className="fa fa-share-alt fa-lg"></i></a>
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
    <img className="card-img-top" src={ev.video ? ytThumb(ev.video) : '/static/images/placeholder.png'} alt="Card image cap" />
  );

  return (

    <div className={"event card " + (ev.type ? ' event-' + ev.type : '')}>
      <a href={`/#/events/${getEventId(ev)}`}>
        {thumb}
      </a>

      <div className="card-body">
        {cardTitle}
      </div>
      {toolbar}
    </div>
  );
}

function SampleNextArrow({ className, style, onClick }) {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        color: "black",
      }}
      onClick={onClick}
    />
  );
}

function randomShuffle(array, seed) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  seed = seed || 1;
  let random = function () {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}