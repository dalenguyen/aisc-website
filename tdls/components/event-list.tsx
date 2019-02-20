import React, { Fragment, useState, useEffect } from 'react';
import EventCard from './event-card';
import './event-list.scss';

import {
  getEventId
} from '../../common/event';

export default ({
  events, showToolbar = true,
  showEventStatus = true }:
  {
    events: Event[],
    showToolbar?: boolean,
    showEventStatus?: boolean
  }) => {
  return (
    <article className="container-fluid">
      <div className="row">
        {events.map(ev => (
          <div key={getEventId(ev)}
            className="col-12 col-md-6 col-lg-4 col-lg-3 col-xl-2">
            <EventCard event={ev}
              showToolbar={showToolbar}
              showEventStatus={showEventStatus}
            />
          </div>
        ))}
      </div>
    </article>
  );
}
