import { Fragment, useState, useEffect } from "react";
import debounce from 'lodash/debounce';
import { AllEvents, PublicEvent, MemberEvent } from '../../../common/types';
import EventList from './event-list';
import { Filter } from './event-search-filter';

export default (props: { allEvents: AllEvents, filter: Filter }) => {

  const { allEvents, filter } = props;
  const { pastEvents, futureEvents } = allEvents;


  const [{ filteredPast, filteredFuture }, setEventState] = useState({
    filteredPast: cap(pastEvents, 18), filteredFuture: futureEvents
  });


  useEffect(debounce(() => {
    const { searchText, subject, stream } = filter;
    let filteredPast = pastEvents, filteredFuture = futureEvents;
    if (searchText && searchText.length > 0) {
      filteredPast = filteredPast.filter(ev => match(ev, { searchText }));
      filteredFuture = filteredFuture.filter(ev => match(ev, { searchText }));
    }

    if (subject && subject !== 'all') {
      filteredPast = filteredPast.filter(ev => ev.subjects.some(s => s === subject));
      filteredFuture = filteredFuture.filter(ev => ev.subjects.some(s => s === subject));
    }

    if (stream && stream !== 'all') {
      filteredPast = filteredPast.filter(ev => ev.type === stream);
      filteredFuture = filteredFuture.filter(ev => ev.type === stream);
    }

    filteredPast = cap(filteredPast, 18);
    filteredFuture = cap(filteredFuture, 10);

    setEventState({
      filteredFuture, filteredPast
    });
  }, 300), [filter]);

  return (
    <Fragment>
      {filteredFuture.length > 0 && (
        <h4 id="upcoming">
          <span className="badge badge-outline-danger badge-pill">
            Upcoming</span></h4>
      )}
      <EventList
        events={filteredFuture} showToolbar={false}
        showEventStatus={true}
      />
      {filteredPast.length > 0 && (
        <h4><span className="badge badge-pill badge-secondary">Past</span></h4>
      )}
      <EventList events={filteredPast} showToolbar={false} />
    </Fragment>
  );
}



function cap<T>(arr: T[], limit: number) {
  return arr.slice(0, limit);
}


function match(ev: MemberEvent | PublicEvent, { searchText }: { searchText: string }) {
  if (searchText && searchText.length > 0) {
    return (
      textContainsCaseInsensitive(searchText, ev.title) ||
      textContainsCaseInsensitive(searchText, ev.acronym) ||
      textContainsCaseInsensitive(searchText, ev.why) ||
      textContainsCaseInsensitive(searchText, ev.lead) ||
      ev.subjects.some(s => textContainsCaseInsensitive(searchText, s)) ||
      textContainsCaseInsensitive(searchText, ev.facilitators.join(' ')) ||
      textContainsCaseInsensitive(searchText, (ev as MemberEvent).venue)
    );
  }
}


function textContainsCaseInsensitive(term: string, text?: string) {
  if (!text) {
    return false;
  }
  return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
}