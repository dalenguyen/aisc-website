import { Fragment, useState, ChangeEvent, useEffect } from 'react';
import React from 'react';
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import SharedBodyScripts from '../components/shared-body-scripts'
import ThemesAndSuch from '../components/themes-and-such';
import { getEventById } from '../utils/event-fetch';
import { toLongDateString } from '../utils/datetime';
import Chart from "react-google-charts";
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'


function daysToMilliseconds(days) {
  return days * 24 * 60 * 60 * 1000;
}
const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" }
];

const rows = [
  [
    "Research",
    "First Draft of Slides",
    new Date(2015, 0, 1),
    new Date(2015, 0, 5),
    null,
    100,
    null
  ],
  [
    "Write",
    "Write paper",
    null,
    new Date(2015, 0, 9),
    daysToMilliseconds(3),
    25,
    "Research,Outline"
  ],
  [
    "Cite",
    "Contact Author",
    null,
    new Date(2015, 0, 7),
    daysToMilliseconds(1),
    20,
    "Research"
  ],
  [
    "Complete",
    "Presentation",
    null,
    new Date(2015, 0, 10),
    daysToMilliseconds(1),
    0,
    "Cite,Write"
  ],
  [
    "Outline",
    "Outline paper",
    null,
    new Date(2015, 0, 6),
    daysToMilliseconds(1),
    100,
    "Research"
  ]
];

const SpeakerPrep = ({ event }) => {
  if (!event) {
    return 'no event specified';
  }
  const date = new Date(event.date);

  return (
    <Fragment>
      <Head>
        <title>Presentation Preparation | Toronto Deep Learning Series #TDLS</title>
        <meta name="description" content="Community of intellectually curious individuals centered around technical review and discussion of advances in machine learning." />
        <link rel="canonical" href="./index.html" />
        <ThemesAndSuch />
      </Head>
      <Header allEvents={null} />
      <main role="main" id="main">
        <section className="container">
          <h1>
            Preparation
          </h1>
          <p>
            Thanks for offering to present a paper. We appreciate your effort.
            The key to a success presentation is to <strong>prepare early</strong> and <strong>get feedback often</strong>.
            We hope that this guide will help you along the way.
          </p>
          <p className="lead">
            Title: {event.title}<br />
            Presentation date: {toLongDateString(date)}
          </p>
          <article>
            <Chart
              options={{
                gantt: {
                  criticalPathEnabled: true,
                  criticalPathStyle: {
                    stroke: '#e64a19',
                    strokeWidth: 5,
                  },
                },
              }}
              chartType="Gantt"
              data={[columns, ...rows]}
              width="100%"
              height="50vw"
              legendToggle
            />
          </article>
        </section>
      </main>
      <Footer />
      <SharedBodyScripts />
    </Fragment>
  );
}

SpeakerPrep.getInitialProps = async ({ query, req }) => {
  const { event: eventId } = query;
  const isServer = !!req;
  const event = await getEventById(isServer, eventId);
  return { event };
}

export default SpeakerPrep;