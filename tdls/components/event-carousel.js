import React, { Fragment, useState, useEffect } from 'react';
import Slider from "react-slick";
import Link from 'next/link';
import EventCard from './event-card';
import './event-carousel.scss';

import {
  getLinkedInProfiles,
} from '../utils/event-fetch';
import {
  READABLE_EVENT_TYPE, getEventId, toShortDateString
} from '../../common/event';

export default ({ shuffle = false, events }) => {

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
        breakpoint: 1490,
        settings: {
          slidesToShow: 5.1,
          slidesToScroll: 5,
        }
      },
      {
        breakpoint: 1380,
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
      {(shuffle ? randomShuffle : a => a)(events, 41).map((event, idx) => {
        return (
          <EventCard key={idx} {...{ event }} showDate={false} />
        );
      })}
    </Slider>
  );
}

export function filterEvents(events, filter) {
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