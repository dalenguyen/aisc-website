import { Fragment } from 'react';
import Header from '../components/header'
import Footer from '../components/footer'
import Head from 'next/head'
import ThemesAndSuch from '../components/themes-and-such';
import GetEngagedSection from '../components/get-engaged-section';

const GetEngaged = ({ }) => (
  <Fragment>
    <Head>
      <title>Get Engaged</title>
      <ThemesAndSuch />
    </Head>
    <Header />
    <GetEngagedSection />
    <Footer />
  </Fragment>
);

export default GetEngaged;