import { Fragment, useState, ChangeEvent, useEffect } from 'react';
import React from 'react';
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import SharedBodyScripts from '../components/shared-body-scripts'
import ThemesAndSuch from '../components/themes-and-such';


const SpeakerPrep = ({ }) => {

  return (
    <Fragment>
      <Head>
        <title>Events | Toronto Deep Learning Series #TDLS</title>
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
          <article>

          </article>
        </section>
      </main>
      <Footer />
      <SharedBodyScripts />
    </Fragment>
  );
}

export default SpeakerPrep;