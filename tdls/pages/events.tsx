import { Fragment } from 'react';
import React from 'react';


import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import SharedBodyScripts from '../components/shared-body-scripts'
import ThemesAndSuch from '../components/themes-and-such';
import EventList from '../components/event-list';
import { getEventsAndGroupings } from '../utils/event-fetch';
import { Event } from '../../common/types';
import './events.scss';


const Index = ({ allEvents }) => {
  const { pastEvents, futureEvents } = allEvents;
  const filteredPast: Event = pastEvents;
  const filteredFuture: Event = futureEvents;
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
        <form className="event-filter-bar form-inline">
          <label className="sr-only" htmlFor="inlineFormInputName2">Name</label>
          <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Jane Doe" />
          <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Username</label>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">@</div>
            </div>
            <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Username" />
          </div>
          <div className="form-check mb-2 mr-sm-2">
            <input className="form-check-input" type="checkbox" id="inlineFormCheck" />
            <label className="form-check-label" htmlFor="inlineFormCheck">
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary mb-2">Submit</button>
        </form>
        <section id="content" className="container-fluid">
          <h4><span className="badge badge-light">Upcoming</span></h4>
          <EventList events={filteredFuture} />
          <h4><span className="badge badge-light">Past</span></h4>
          <EventList events={filteredPast} />
        </section>
      </main>
      <Footer />
      <SharedBodyScripts />
    </Fragment>
  );
}

Index.getInitialProps = async ({ req }) => {
  const allEvents = await getEventsAndGroupings(!!req);
  return { allEvents };
}

export default Index;