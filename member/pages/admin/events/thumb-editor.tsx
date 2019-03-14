import { getQueryStringValue } from '../../../../common/utils';
import { useEffect, useState, Fragment } from 'react';
import Header from '../../../components/header';
import Head from 'next/head'
import Meta from '../../../components/meta';
import SideBar from '../../../components/side-bar';
import TopBar from '../../../components/top-bar';
import MemberFooter from '../../../components/footer';

import getConfig from 'next/config'

const { SITE_ABBREV } = getConfig().publicRuntimeConfig;

export default () => {
  const [{ eventId }, setEventIdState] = useState<{
    eventId: string | null
  }>({ eventId: null });
  useEffect(() => {
    const eventId = getQueryStringValue("event");
    setEventIdState({ eventId });
  }, []);
  return !eventId ? null : (
    <Fragment>
      <Head>
        <Meta />
        <title>{SITE_ABBREV} Members</title>
      </Head>
      <Header />
      <div id="wrapper">
        <SideBar />
        <main id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
              </button>
              <TopBar />
            </nav>
            <div className="container-fluid">
              {eventId}
            </div>
            <MemberFooter />
          </div>
        </main>
      </div>
    </Fragment >
  );
}