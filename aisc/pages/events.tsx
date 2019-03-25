import { Fragment, useState } from 'react';
import React from 'react';

import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import SharedBodyScripts from '../components/shared-body-scripts'
import { getEventsAndGroupings } from '../utils/event-fetch';
import EventSearchFilter, { Filter } from '../components/events/event-search-filter';
import EventResults from '../components/events/event-results';
import './events.scss';


import getConfig from 'next/config'
const { SITE_NAME_FULL, SITE_ABBREV } = getConfig().publicRuntimeConfig;


import { AllEvents } from '../../common/types';
import Hero from '../components/hero';

const Events = ({ allEvents, filter: pFilter }: { allEvents: AllEvents, filter: Filter }) => {
  const { subjects, streams } = allEvents;
  const [{ filter }, setEventFilter] = useState({ filter: pFilter });

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
        <EventSearchFilter
          {...filter}
          onChange={(filter) => setEventFilter({ filter })}
          subjects={subjects}
          streams={streams} />
        <section className="container-fluid">
          <EventResults allEvents={allEvents} filter={filter} />
        </section>
      </main>
      <Footer />
      <SharedBodyScripts />
    </Fragment>
  );
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