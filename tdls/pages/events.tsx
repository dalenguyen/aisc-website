import { Fragment, useState, ChangeEventHandler, ChangeEvent } from 'react';
import React from 'react';


import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import SharedBodyScripts from '../components/shared-body-scripts'
import ThemesAndSuch from '../components/themes-and-such';
import EventList from '../components/event-list';
import { getEventsAndGroupings } from '../utils/event-fetch';
import './events.scss';

const EventFilters = ({ onChange }) => {

  const [{ searchText }, setSearchText] = useState({ searchText: "" });

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setSearchText({ searchText: newVal });
    if (onChange) {
      onChange({ searchText: newVal });
    }
  }

  return (
    <form className="event-filter-bar form-inline">
      <div className="input-group mb-2 mr-sm-2">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-search"></i>
          </span>
        </div>
        <input
          type="text" onChange={onSearchChange}
          value={searchText}
          className="form-control form-control-lg"
          placeholder="Search events" aria-label="search-events"
        />
      </div>
    </form>
  );
}

function cap(arr: any[], limit: number) {
  return arr.slice(0, limit);
}

const Events = ({ allEvents }) => {
  const { pastEvents, futureEvents } = allEvents;

  const [{ filteredPast, filteredFuture }, setEventState] = useState({
    filteredPast: cap(pastEvents, 18), filteredFuture: cap(futureEvents, 5)
  });

  const filterEvents = ({ searchText }) => {
    let filteredPast, filteredFuture;
    if (searchText && searchText.length > 0) {
      filteredPast = pastEvents.filter(ev => match(ev, { searchText }));
      filteredFuture = futureEvents.filter(ev => match(ev, { searchText }));
    } else {
      filteredPast = pastEvents;
      filteredFuture = futureEvents;
    }

    filteredPast = cap(filteredPast, 18);
    filteredFuture = cap(filteredFuture, 5);
    setEventState({
      filteredFuture, filteredPast
    });
  }

  return (
    <Fragment>
      <Head>
        <title>Events | Toronto Deep Learning Series #TDLS</title>
        <meta name="description" content="Community of intellectually curious individuals centered around technical review and discussion of advances in machine learning." />
        <link rel="canonical" href="./index.html" />
        <ThemesAndSuch />
      </Head>
      <Header allEvents={allEvents} />
      <main role="main" id="main">
        <EventFilters onChange={filterEvents} />
        <section className="container-fluid">
          {filteredFuture.length > 0 && (
            <h4><span className="badge badge-primary">Upcoming</span></h4>
          )}
          <EventList events={filteredFuture} toolbar={false} />
          {filteredPast.length > 0 && (
            <h4><span className="badge badge-secondary">Past</span></h4>
          )}
          <EventList events={filteredPast} toolbar={false} />
        </section>
      </main>
      <Footer />
      <SharedBodyScripts />
    </Fragment>
  );
}

function match(ev, { searchText }) {
  if (searchText && searchText.length > 0) {
    return (
      textContainsCaseInsensitive(searchText, ev.title) ||
      textContainsCaseInsensitive(searchText, ev.why) ||
      textContainsCaseInsensitive(searchText, ev.lead) ||
      textContainsCaseInsensitive(searchText, ev.facilitators.join(' ')) ||
      textContainsCaseInsensitive(searchText, ev.venue)
    );
  }
}

function textContainsCaseInsensitive(term, text) {
  if (!text) {
    return false;
  }
  return text.toLowerCase().indexOf(term) >= 0;
}

Events.getInitialProps = async ({ req }) => {
  const allEvents = await getEventsAndGroupings(!!req);
  return { allEvents };
}

export default Events;