import React, { Fragment, useState, useEffect } from 'react';
import { EventCard } from './event-carousel';
import './event-list.scss';

import {
  getEventId
} from '../../common/event';

export default ({ events }: { events: Event[] }) => {
  return (
    <article className="container-fluid">
      <div className="row">
        {events.map(ev => (
          <div key={getEventId(ev)}
            className="col-12 col-sm-6 col-md-4 col-lg-2">
            <EventCard event={ev} />
          </div>
        ))}
      </div>
    </article>
  );
}