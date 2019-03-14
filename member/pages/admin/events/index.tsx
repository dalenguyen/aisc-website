import { Fragment, useContext, useEffect, useState } from "react";
import Header from '../../../components/header';
import MemberFooter from '../../../components/footer';
import Meta from '../../../components/meta';
import TopBar from '../../../components/top-bar';
import SideBar from '../../../components/side-bar';
import Head from 'next/head'
import { AllEvents, MemberEvent } from "../../../../common/types";
import { getEventId } from '../../../../common/event';
import { ensureFirebase } from '../../../utils/firebase';
import { AuthContext } from '../../../components/auth-context-wrapper';
import getConfig from 'next/config'
import { Container, Row, Col, Card } from 'react-bootstrap';
import * as classnames from 'classnames';
import { toLongDateString } from "../../../../tdls/utils/datetime";
import * as moment from 'moment';
import { extrapolateEventDates } from "../../../utils/event-planner";
import { asyncify, StorageLRU } from 'storage-lru';
import { promisify } from 'util'
import Link from 'next/link';
import { ytThumb } from '../../../../common/youtube';
import { User } from "firebase";
import './index.scss';

const { SITE_ABBREV } = getConfig().publicRuntimeConfig;
const firebase = ensureFirebase();
const fetchEventsFb = firebase.functions().httpsCallable('fetchEvents');
const _createLiveStreamEvent = firebase.functions().httpsCallable('createLiveStreamEvent');

let lru: any;

if (typeof window !== 'undefined') {
  lru = new StorageLRU(asyncify(localStorage));
}

export default () => {
  const [{ upcomingEvents }, setEvents] = useState<{ upcomingEvents: MemberEvent[] | "loading" }>({
    upcomingEvents: "loading"
  });

  const fetchAndSetEvents = async () => {
    let allEvents: AllEvents | null = null;
    try {
      allEvents = await promisify(lru.getItem.bind(lru))('allEvents', { json: true });
    } catch (e) {

    }
    if (!allEvents) {
      const { data }: { data: AllEvents } = await fetchEventsFb() as any;
      allEvents = data;
      await promisify(lru.setItem.bind(lru))('allEvents', allEvents, {
        json: true,
        cacheControl: 'max-age=300'
      })
    }
    setEvents({ upcomingEvents: allEvents.futureEvents as MemberEvent[] });
  }
  let user: User | null = null;
  const c = useContext(AuthContext)
  if (c !== 'checking' && c !== null) {
    user = c.user;
  }

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
                              <Col
                                className="mt-1 mb-1"
                                sm={12}
                                xl={6}
                                key={getEventId(ev)}
                              >
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
          <MemberFooter />
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
  const dateM = moment(date);
  const keyDates = extrapolateEventDates(ev);
  return (
    <Fragment>
      <Card>
        <Card.Header>
          {toLongDateString(date)}&nbsp;
          ({dateM.diff(new Date(), 'days')} days left)
        </Card.Header>
        <Card.Body>
          <div className="yt-thumb-edit float-right m-1">
            {ev.video ?
              ytThumbEditLink(ev) :
              createLiveStreamLink(ev)}
          </div>
          <Card.Title>
            {ev.title}
          </Card.Title>

          Venue: {ev.venue}
          <section className="mt-1">
            <h6>Key dates:</h6>
            <ul className="list-group key-dates">
              {keyDates.map(kd => (
                <li className={classnames("list-group-item p-2", new Date() > kd.date && "past")}
                  key={kd.date.getTime()}>
                  {toLongDateString(kd.date)} | {kd.what}&nbsp;
                  {
                    new Date() > kd.date && (
                      <i>
                        (past)
                      </i>
                    )
                  }
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

function ytThumbEditLink(ev: MemberEvent) {
  if (ev.video) {
    return (
      <Link href={`/thumb-editor?event=${getEventId(ev)}`}>
        <a>
          <img className="yt-thumb-edit-img" src={ytThumb(ev.video)} />
        </a>
      </Link>
    );
  } else {
    return null;
  }
}

function createLiveStreamLink(ev: MemberEvent) {

  const [{ creating }, setCreatingState] = useState({ creating: false });

  async function createLiveStreamEvent(ev: MemberEvent) {
    const r = confirm(
      `Are you sure you want to create a new YouTube live stream event for "${ev.title}"?`
    );
    if (r) {
      try {
        setCreatingState({ creating: true });
        const d = await _createLiveStreamEvent({ event_id: getEventId(ev) });
        console.log(d);
      } catch (e) {
        console.error(e);
      }
      setCreatingState({ creating: false });


    } else {

    }
  }

  return (
    <button
      onClick={() => createLiveStreamEvent(ev)}
      className="btn btn-danger btn-sm"
      disabled={creating}
    >
      {creating ? "Creating..." : "+YT live stream..."}
    </button>
  )
}

