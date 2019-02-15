import { Fragment, useState, ChangeEvent, useEffect } from 'react';
import React from 'react';
import {
  InputGroup, DropdownButton, Dropdown, FormControl,
  Form, Button
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
import isEmpty from 'lodash/isEmpty';

interface Filter {
  searchText?: string
  subject: string | 'all'
  stream?: string
}

const EMPTY_FILTER = { searchText: "", subject: "all" };

const EventFilters = ({
  onChange = () => undefined, subjects = [] }:
  { onChange: (f: Filter) => void, subjects: string[] }
) => {
  const [currFilter, setFilter] = useState(EMPTY_FILTER);

  const onSearchChange = (e: any) => {
    const newVal = e.target.value;
    const newFilter = Object.assign({}, currFilter, { searchText: newVal });
    setFilter(newFilter);
  }

  const onSubjectChange = (newVal: string) => {
    const newFilter = Object.assign({}, currFilter, { subject: newVal });
    setFilter(newFilter);
  }

  const clearFilter = () => {
    setFilter(EMPTY_FILTER);
  }

  useEffect(() => {
    onChange(currFilter);
  }, [Object.keys(EMPTY_FILTER)]);

  const { searchText, subject } = currFilter;

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

      </InputGroup>
      <InputGroup className="mb-2 mr-sm-2" >
        <DropdownButton
          size="lg"
          variant="outline-secondary"
          title={subject === 'all' ? 'By subject' : subject}
          id="input-group-dropdown-1"
          value={subject}
        >
          <Dropdown.Item
            value="all"
            onSelect={() => onSubjectChange('all')}
          >All</Dropdown.Item>
          <Dropdown.Divider />
          {
            subjects.map(s => (
              <Dropdown.Item
                key={s}
                onSelect={() => onSubjectChange(s)}>{s}</Dropdown.Item>
            ))
          }
        </DropdownButton>
      </InputGroup>

      {
        <InputGroup className="mb-2 mr-sm-2">
          {!filterClean(currFilter) && (
            <Button
              variant="outline-secondary"
              size="lg"
              onClick={clearFilter}
            >
              <i className="fa fa-times"></i>
            </Button>)}
        </InputGroup>
      }
    </Form>
  );
}

function filterClean(f: Filter) {
  return !Object.keys(f).some(k => {
    if (k === 'subject') {
      return f[k] !== 'all'
    } else {
      return !isEmpty(f[k])
    }
  });
}

function cap(arr: any[], limit: number) {
  return arr.slice(0, limit);
}

const Events = ({ allEvents }) => {
  const { pastEvents, futureEvents, subjects } = allEvents;

  const [{ filteredPast, filteredFuture }, setEventState] = useState({
    filteredPast: cap(pastEvents, 18), filteredFuture: cap(futureEvents, 5)
  });

  const filterEvents = debounce(({ searchText, subject }: Filter) => {
    let filteredPast = pastEvents, filteredFuture = futureEvents;
    if (searchText && searchText.length > 0) {
      filteredPast = filteredPast.filter(ev => match(ev, { searchText }));
      filteredFuture = filteredFuture.filter(ev => match(ev, { searchText }));
    }

    if (subject && subject !== 'all') {
      filteredPast = filteredPast.filter(ev => ev.subjects.some(s => s === subject));
      filteredFuture = filteredFuture.filter(ev => ev.subjects.some(s => s === subject));
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
        <EventFilters onChange={filterEvents} subjects={subjects} />
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