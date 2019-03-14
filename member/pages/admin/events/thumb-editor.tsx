import { getQueryStringValue } from '../../../../common/utils';
import { useEffect, useState, Fragment } from 'react';
import Header from '../../../components/header';
import Head from 'next/head'
import Meta from '../../../components/meta';
import SideBar from '../../../components/side-bar';
import TopBar from '../../../components/top-bar';
import MemberFooter from '../../../components/footer';
import { ensureFirebase } from '../../../utils/firebase';
import { ytThumb } from '../../../../common/youtube';
import { Row, Col, Container } from 'react-bootstrap';
import getConfig from 'next/config'
import { MemberEvent, PublicEvent } from '../../../../common/types';
const firebase = ensureFirebase();

const { SITE_ABBREV } = getConfig().publicRuntimeConfig;
const fetchSingleEvent = firebase.functions().httpsCallable('fetchSingleEvent');

export default () => {
  const [{ eventId }, setEventIdState] = useState<{
    eventId: string | null,
  }>({ eventId: null });
  const [{ event }, setEventState] = useState<{
    event: MemberEvent | "fetching"
  }>({ event: "fetching" });

  const [{ content }, setContentState] = useState<{
    content: string
  }>({
    content: ``
  });

  async function fetchAndSetEvent() {
    const { data: event }: { data: MemberEvent } = await fetchSingleEvent({ id: eventId }) as any;
    setEventState({ event });
    setContentState({
      content: `
      <style>
      .th-thumb, th-title, th-acronym {
        position: absolute;
      }
      .th-thumb {
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: 0;
      }
      </style>
      <img class="th-thumb" src="${ytThumb(event.video)}" />
      <div class="th-title">${event.title}</div>
      <div class="th-acronym">${event.acronym}</div>
      `})
  }

  useEffect(() => {
    const eventId = getQueryStringValue("event");
    setEventIdState({ eventId });
  }, []);

  useEffect(() => {
    if (eventId) {
      fetchAndSetEvent();
    }
  }, [eventId]);

  const updateContent = (content: string) => {
    setContentState({ content });
  }

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
            <Container fluid={true}>
              <Row>
                <Col lg={5}>
                  <textarea style={{
                    width: "100%",
                    height: "100%"
                  }}
                    onChange={(e) => updateContent(e.target.value)}
                    value={content}
                  >

                  </textarea>
                </Col>
                <Col lg={7}>
                  {
                    event !== "fetching" && thumbCanvas(content, event)
                  }
                </Col>
              </Row>
            </Container>
            <MemberFooter />
          </div>
        </main>
      </div>
    </Fragment >
  );
}

function thumbCanvas(content: string, ev: PublicEvent) {
  return (
    <div style={{
      width: "100%",
      paddingTop: "56.25%",
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0
      }}
      >
        <div
          style={{
            position: 'relative',
            top: 0, left: 0, width: "100%", height: "100%"
          }}
          dangerouslySetInnerHTML={{ __html: content }}>
        </div>
      </div>
    </div>
  )
}