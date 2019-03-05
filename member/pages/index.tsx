import { Fragment, useContext, useEffect, useState } from "react";
import Header from '../components/header';
import Meta from '../components/meta';
import TopBar from '../components/top-bar';
import SideBar from '../components/side-bar';
import Head from 'next/head'
import { AllEvents, MemberEvent } from "../../common/types";
import { getEventId } from '../../common/event';
import { ensureFirebase } from '../utils/firebase';
import { AuthContext } from '../components/user-context-wrapper';
import getConfig from 'next/config'
const { SITE_ABBREV } = getConfig().publicRuntimeConfig;

const firebase = ensureFirebase();
const fetchEventsFb = firebase.functions().httpsCallable('fetchEvents');

export default () => {
  const [{ upcomingEvents }, setEvents] = useState<{ upcomingEvents: MemberEvent[] }>({
    upcomingEvents: []
  });

  const fetchAndSetEvents = async () => {
    try {
      const { data }: { data: AllEvents } = await fetchEventsFb() as any;
      setEvents({ upcomingEvents: data.futureEvents as MemberEvent[] });
    } catch (e) {
      console.error('e', e)
    }
  }

  const user = useContext(AuthContext);

  useEffect(() => {
    if (user && user.emailVerified) {
      fetchAndSetEvents();
    }
  }, [user]);

  useEffect(() => {
    if (user && user.emailVerified) {
      fetchAndSetEvents();
    }
  }, []);

  return (
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
              <div className="row">
                <div className="col-12">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Next Up
                      </h6>
                    </div>
                    <div className="card-body">
                      <ul className="list-group">
                        {
                          upcomingEvents.slice(0, 2).map(ev => (
                            <li className="list-group-item" key={getEventId(ev)}>
                              <h5>{ev.title}</h5>
                              Venue: {ev.venue}
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; Aggregate Intellect, Inc 2019</span>
              </div>
            </div>
          </footer>
        </main>
      </div>

      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </Fragment>
  )
}