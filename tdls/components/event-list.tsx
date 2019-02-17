import React, { Fragment, useState, useEffect } from 'react';
import EventCard from './event-card';
import './event-list.scss';

import {
  getEventId
} from '../../common/event';

export default ({ events, toolbar = true, showEventStatus = true }:
  { events: Event[], toolbar: boolean, showEventStatus: boolean }) => {
  return (
    <article className="container-fluid">
      <div className="row">
        {events.map(ev => (
          <div key={getEventId(ev)}
            className="col-12 col-md-6 col-lg-4 col-lg-3 col-xl-2">
            <EventCard event={ev}
              showToolbar={toolbar}
              showEventStatus={showEventStatus}
            />
          </div>
        ))}
      </div>
    </article>
  );
}
