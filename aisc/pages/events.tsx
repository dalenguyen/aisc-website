import { Fragment, useState, useEffect, useRef, MutableRefObject } from 'react';
import React from 'react';
import {
  InputGroup, DropdownButton, Dropdown, FormControl,
  Form, Button
} from 'react-bootstrap';

import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import SharedBodyScripts from '../components/shared-body-scripts'
import EventList from '../components/events/event-list';
import { getEventsAndGroupings } from '../utils/event-fetch';
import { getQueryStringValue, mobileCheck } from '../../common/utils';
import './events.scss';


import getConfig from 'next/config'
const { SITE_NAME_FULL, SITE_ABBREV } = getConfig().publicRuntimeConfig;


import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { AllEvents, PublicEvent, MemberEvent, EventType } from '../../common/types';
import Hero from '../components/hero';

interface Filter {
  searchText: string | ""
  subject: string | 'all'
  stream: EventType | 'all'
}

const EMPTY_FILTER: Filter = {
  searchText: "", subject: "all", stream: "all"
};

const EventFilters = ({
  subject: initSubject = 'all',
  searchText: initSearchText = '',
  stream: initStream = 'all',
  onChange = () => undefined,
  subjects = [],
  streams = [] }:
  ({
    onChange: (f: Filter) => void, subjects: string[],
    streams: string[]
  } & Filter)
) => {
  const [currFilter, setFilter] = useState({
    subject: initSubject,
    searchText: initSearchText,
    stream: initStream
  });

  const { searchText, subject, stream } = currFilter;

  const onSearchChange = (e: any) => {
    const newVal = e.target.value;

    setFilter(Object.assign({}, currFilter, { searchText: newVal }));
  }

  const onSubjectChange = (newVal: string) => {
    setFilter(Object.assign({}, currFilter, { subject: newVal }));
  }
  const onStreamChange = (newVal: string) => {
    setFilter(Object.assign({}, currFilter, { stream: newVal }));
  }

  const clearFilter = () => {
    setFilter(EMPTY_FILTER);
  }

  // apply filter to event list
  useEffect(() => {
    onChange(currFilter);
  }, [searchText, subject, stream]);

  useEffect(() => {
    const subjectFromURL = getQueryStringValue('subject');
    if (subjectFromURL) {
      setFilter(Object.assign({}, currFilter, { subject: subjectFromURL }));
    }
  }, []);

  const searchElem = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isMobile = mobileCheck();
    if (!isMobile && searchElem.current) {
      searchElem.current.focus();
    }
  }, [])

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
          ref={searchElem}
          placeholder="Search events"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-2 mr-sm-2" >
        <DropdownButton
          id="subject-filter"
          size="lg"
          className="ml-1 mr-1"
          variant={subject === 'all' ? 'outline-secondary' : 'success'}
          title={subject === 'all' ? 'By subject' : subject}
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
        <DropdownButton
          id="stream-filter"
          size="lg"
          className="ml-1 mr-1"
          variant={stream === 'all' ? 'outline-secondary' : 'success'}
          title={stream === 'all' ? 'By stream' : stream}
          value={stream}
        >
          <Dropdown.Item
            value="all"
            onSelect={() => onStreamChange('all')}
          >All</Dropdown.Item>
          <Dropdown.Divider />
          {
            streams.map(s => (
              <Dropdown.Item
                key={s}
                onSelect={() => onStreamChange(s)}>
                {s}
              </Dropdown.Item>
            ))
          }
        </DropdownButton>
        {!filterClean(currFilter) && (
          <Button
            className="ml-1 mr-1"
            variant="outline-success"
            size="lg"
            onClick={clearFilter}
          >
            <i className="fa fa-times"></i>
          </Button>
        )}
      </InputGroup>


    </Form>
  );
}

function filterClean(f: Filter) {
  return !Object.keys(f).some(k => {
    if (k === 'subject') {
      return f[k] !== 'all'
    } else if (k === 'stream') {
      return f[k] !== 'all'
    } else {
      return !isEmpty(f[k])
    }
  });
}

function cap<T>(arr: T[], limit: number) {
  return arr.slice(0, limit);
}

const Events = (props: { allEvents: AllEvents, filter: Filter }) => {
  const { allEvents } = props;
  const { pastEvents, futureEvents, subjects, streams } = allEvents;

  const [{ filteredPast, filteredFuture }, setEventState] = useState({
    filteredPast: cap(pastEvents, 18), filteredFuture: futureEvents
  });

  const [{ filter }, setEventFilter] = useState({ filter: props.filter });

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
      <Head>
        <title>Events | {SITE_NAME_FULL}</title>
        <meta name="description" content="Community of intellectually curious individuals centered around technical review and discussion of advances in machine learning." />
      </Head>
      <Header allEvents={allEvents} />
      <Hero
        title={`${SITE_ABBREV} Events`}
        subtitle={`Find live stream, recordings, paper, code & more of all of our events.`}
      />
      <main role="main" id="main" className="mt-4">
        <EventFilters
          {...filter}
          onChange={(filter) => setEventFilter({ filter })}
          subjects={subjects}
          streams={streams} />
        <section className="container-fluid">
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
        </section>
      </main>
      <Footer />
      <SharedBodyScripts />
    </Fragment>
  );
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

Events.getInitialProps = async ({ req, query }) => {
  const filter = pluck(query, ['subject', 'stream']);
  const allEvents = await getEventsAndGroupings(!!req);
  return { allEvents, filter };
}


function pluck(o: { [k: string]: any }, props: string[]) {
  return Object.assign({}, ...props.map(prop => ({ [prop]: o[prop] })));
}

export default Events;