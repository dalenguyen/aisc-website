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
import { Container, Row, Col, Card } from 'react-bootstrap';
import { toLongDateString } from "../../tdls/utils/datetime";
import { extrapolateEventDates } from "../utils/event-planner";

const { SITE_ABBREV } = getConfig().publicRuntimeConfig;

const firebase = ensureFirebase();
const fetchEventsFb = firebase.functions().httpsCallable('fetchEvents');


export default () => {
  const [{ upcomingEvents }, setEvents] = useState<{ upcomingEvents: MemberEvent[] | "loading" }>({
    upcomingEvents: "loading"
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
                        Upcoming Events
                      </h6>
                    </div>
                    <div className="card-body">
                      <Container fluid={true}>
                        <Row>
                          {upcomingEvents === 'loading' ? "Loading..." :
                            upcomingEvents.map(ev => (
                              <Col className="mt-1 mb-1" sm={6} key={getEventId(ev)}>
                                <SingleEventManager event={ev} />
                              </Col>
                            ))
                          }
                        </Row>
                      </Container>
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

function SingleEventManager({ event: ev }: { event: MemberEvent }) {
  const date = new Date(ev.date);
  const keyDates = extrapolateEventDates(ev);

  return (
    <Fragment>
      <Card>
        <Card.Header>
          {toLongDateString(date)}
        </Card.Header>
        <Card.Body>
          <Card.Title>
            {ev.title}
          </Card.Title>
          Venue: {ev.venue}
          <section className="mt-1">
            <h6>Key dates</h6>
            <ul className="list-group">
              {keyDates.map(kd => (
                <li className="list-group-item"
                  key={date.getTime()}>
                  {toLongDateString(kd.date)} - {kd.what}
                </li>
              ))}
            </ul>
          </section>
          <Container>
            <Row>
              <Col sm={6} md={4}>

              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Fragment>
  );
}