import React from 'react';
import Slider from "react-slick";
import EventCard from './event-card';
import './event-carousel.scss';
import range from 'lodash/range';
import { EventType, PublicEvent } from '../../common/types';

export type ZoomLevel = 1 | 3 | 4 | 5 | 6 | 8;

export default ({ shuffle = false, events, zoomLevel }: {
  shuffle: boolean, events: any[], zoomLevel: ZoomLevel
}) => {
  // linearly interpolate zoom size
  const responsive = range(1, zoomLevel).map(l => ({
    breakpoint: 1440 / 8 * l + 400,
    settings: {
      slidesToShow: l === 1 ? l : l * 1.02,
      slidesToScroll: l,
    }
  }));

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: zoomLevel + 0.1,
    slidesToScroll: zoomLevel,
    responsive,
    variableHeight: false,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SampleNextArrow />
  };

  return (
    <Slider className="past-event-list event-carousel" {...settings}>
      {(shuffle ? randomShuffle : identity)(events, 41).map((event, idx) => {
        return (
          <EventCard
            key={idx}
            {...{ event, zoomLevel }}
            showDate={true}
            showToolbar={false}
          />
        );
      })}
    </Slider>
  );
}

function identity<T>(a: T): T {
  return a;
}

interface Filter {
  type?: EventType,
  subject?: string;
}

export function filterEvents(events: any[], filter: Filter) {
  if (!filter) {
    return events;
  }
  return events.filter(e => match(e, filter));
}

function match(event: PublicEvent, filter: Filter) {
  return Object.keys(filter).every(k => {
    const val: string | string[] = event[k];
    if (Array.isArray(val)) {
      return val.some(v => v === filter[k]);
    } else {
      return val === filter[k];
    }
  });
}

// function SampleNextArrow({ className, style, onClick }) {
//   return (
//     <div
//       className={className}
//       style={{
//         ...style,
//         display: "block",
//         color: "black",
//       }}
//       onClick={onClick}
//     />
//   );
// }

function randomShuffle<T>(array: T[], seed: number): T[] {
  let currentIndex = array.length, temporaryValue, randomIndex;
  seed = seed || 1;
  const random = () => {
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