import { Fragment, useEffect, useState } from "react";
import Header from '../components/header';
import Meta from '../components/meta';
import TopBar from '../components/top-bar';
import SideBar from '../components/side-bar';
import Head from 'next/head'
import { AllEvents, MemberEvent } from "../../common/types";
import { getEventId } from '../../common/event';
import { ensureFirebase, authStateChecker } from '../utils/firebase';
import Router from 'next/router'

const firebase = ensureFirebase();
const fetchEventsFb = firebase.functions().httpsCallable('fetchEvents');

const checkAuth = authStateChecker();

export default () => {


  const [{ user }, setUserState] = useState<{ user: firebase.User | null }>(
    { user: null }
  );

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

  const checkLogin = async () => {
    const user = await checkAuth(firebase.auth());
    if (!user || !user.email) {
      Router.push('/login');
    } else {
      setUserState({ user });
    }
  }

  useEffect(() => {
    checkLogin();
  }, [])

  useEffect(() => {
    if (user) {
      fetchAndSetEvents();
    }
  }, [user]);

  return (
    <Fragment>
      <Head>
        <Meta />
        <title>TDLS Members</title>
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
                        Upcoming Events
                      </h6>
                    </div>
                    <div className="card-body">
                      <ul className="list-group">
                        {
                          upcomingEvents.map(ev => (
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

      {/* <!-- Logout Modal--> */}
      <div className="modal fade" id="logoutModal"
        tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
              <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
              <a className="btn btn-primary" href="login.html">Logout</a>
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  )
}