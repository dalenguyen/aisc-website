import { Fragment } from 'react';
import Header from '../components/header'
import Footer from '../components/footer'
import Head from 'next/head'
import ThemesAndSuch from '../components/themes-and-such';
import SharedBodyScripts from '../components/shared-body-scripts';
import GetEngagedSection from '../components/get-engaged-section';

import getConfig from 'next/config'
const { SITE_NAME } = getConfig().publicRuntimeConfig;

const GetEngaged = ({ }) => (
  <Fragment>
    <Head>
      <title>Get Engaged | {SITE_NAME}</title>
      <ThemesAndSuch />
    </Head>
    <Header />
    <GetEngagedSection />
    <Footer />
    <SharedBodyScripts />
  </Fragment>
);

export default GetEngaged;