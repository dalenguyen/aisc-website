import { Fragment } from 'react';
import React, { useEffect } from 'react';

import Link from 'next/link';

import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import SharedBodyScripts from '../components/shared-body-scripts'
import ThemesAndSuch from '../components/themes-and-such';
import { UpcomingEvents } from '../components/event-related';
import EventCarousel from '../components/event-carousel';

import { getEventsAndGroupings } from '../utils/event-fetch';
import Router from 'next/router'
import './events.scss';

const Index = ({ allEvents }) => {
  return (
    <Fragment>
      <Head>
        <title>Events | Toronto Deep Learning Series #TDLS</title>
        <meta name="description" content="Community of intellectually curious individuals centered around technical review and discussion of advances in machine learning." />
        <link rel="canonical" href="./index.html" />
        <ThemesAndSuch />
        <link href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css" rel="stylesheet" />
        <link href="/static/smooth-scroll.css" rel="stylesheet" />

      </Head>
      <Header allEvents={allEvents} />
      <main role="main" id="main">
        <form className="event-filter-bar form-inline">
          <label className="sr-only" for="inlineFormInputName2">Name</label>
          <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Jane Doe" />
          <label className="sr-only" for="inlineFormInputGroupUsername2">Username</label>
          <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
              <div className="input-group-text">@</div>
            </div>
            <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Username" />
          </div>
          <div className="form-check mb-2 mr-sm-2">
            <input className="form-check-input" type="checkbox" id="inlineFormCheck" />
            <label className="form-check-label" for="inlineFormCheck">
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary mb-2">Submit</button>
        </form>
        <section id="content" className="container-fluid">
          {
            [
              ['Trending Papers', { type: 'fasttrack' }],
              ['Authors Speaking', { type: 'authors' }],
              ['Recent Presentations', { type: 'main' }],
              ['Implementations', { type: 'codereview' }],
              ['Classic Papers', { type: 'classics' }]
            ].map(([label, filter]) => (
              <Fragment key={label}>
                <div style={{ marginTop: '10px' }}>
                  <h4><span className="badge badge-primary badge-info">{label}</span></h4>
                  <EventCarousel filter={filter} shuffle={false} allEvents={allEvents} />
                </div>
              </Fragment>
            ))
          }
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