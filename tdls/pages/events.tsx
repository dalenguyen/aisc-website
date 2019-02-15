import { Fragment, useState, ChangeEvent } from 'react';
import React from 'react';
import {
  InputGroup, DropdownButton, Dropdown, FormControl,
  Form
} from 'react-bootstrap';

import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import SharedBodyScripts from '../components/shared-body-scripts'
import ThemesAndSuch from '../components/themes-and-such';
import EventList from '../components/event-list';
import { getEventsAndGroupings } from '../utils/event-fetch';
import './events.scss';

import debounce from 'lodash/debounce';

interface Filter {
  searchText?: string
  category: string | 'all'
  stream?: string
}

const EventFilters = ({ onChange = () => undefined }: { onChange: (f: Filter) => void }) => {

  const [{ searchText }, setSearchText] = useState({ searchText: "" });
  const [{ category }, setCategory] = useState({ category: "all" });

  const onSearchChange = (e) => {
    console.log(e)
    const newVal = e.target.value;
    setSearchText({ searchText: newVal });
    onChange({ searchText: newVal, category });
  }

  const onCategoryChange = (e) => {
    const newVal = e.target.value;
    setCategory({ category: newVal });
    onChange({ searchText, category: newVal });
  }

  return (
    <Form inline className="event-filter-bar form-inline">
      <InputGroup className="mb-2 mr-sm-2" size="lg">
        <InputGroup.Text
          as={InputGroup.Prepend}
        >
          <i className="fa fa-search"></i>
        </InputGroup.Text>
        <FormControl
          onChange={onSearchChange}
          value={searchText}
          placeholder="Search events"
          aria-describedby="basic-addon1"
        />
        {/* <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title="By subject"
          id="input-group-dropdown-1"
        >
          <Dropdown.Item value="all">All</Dropdown.Item>
          <Dropdown.Item href="#">Another action</Dropdown.Item>
          <Dropdown.Item href="#">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#">Separated link</Dropdown.Item>
        </DropdownButton> */}
      </InputGroup>
    </Form>
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

  const filterEvents = debounce(({ searchText }) => {
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
  }, 300);

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
      ev.subjects.some(s => textContainsCaseInsensitive(searchText, s)) ||
      textContainsCaseInsensitive(searchText, ev.facilitators.join(' ')) ||
      textContainsCaseInsensitive(searchText, ev.venue)
    );
  }
}

function textContainsCaseInsensitive(term: string, text: string) {
  if (!text) {
    return false;
  }
  return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
}

Events.getInitialProps = async ({ req }) => {
  const allEvents = await getEventsAndGroupings(!!req);
  return { allEvents };
}

export default Events;