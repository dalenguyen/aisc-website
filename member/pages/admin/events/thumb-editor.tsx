import { getQueryStringValue } from '../../../../common/utils';
import { useEffect, useState, Fragment, useRef, forwardRef } from 'react';
import Header from '../../../components/header';
import Head from 'next/head'
import Meta from '../../../components/meta';
import SideBar from '../../../components/side-bar';
import TopBar from '../../../components/top-bar';
import MemberFooter from '../../../components/footer';
import { ensureFirebase } from '../../../utils/firebase';
import { ytThumb } from '../../../../common/youtube';
import { Row, Col, Container, Button } from 'react-bootstrap';
import getConfig from 'next/config'
import * as html2canvas from 'html2canvas';
import { MemberEvent, PublicEvent } from '../../../../common/types';
import { EventId } from '../../../functions/common/types';
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

  const drawEl = useRef<HTMLDivElement>(null);
  const saveImage = () => {
    if (drawEl.current && eventId) {
      printDiv(eventId, drawEl.current);
    }
  }

  async function fetchAndSetEvent() {
    const { data: event }: { data: MemberEvent } = await fetchSingleEvent({ id: eventId }) as any;
    setEventState({ event });
    setContentState({
      content: `<div class="th-spotlight" />
<div class="th-acronym">${event.acronym}</div>
<div class="th-title">${event.title}</div>

<style>
  .th-acronym {
    right: 10%;
    top: 10%;
    font-size: 5vw;
    line-height: 5vw;
    color: #1cff41;
    text-shadow: 0.2vw 0.2vw 0.2vw #444;
  }
  .th-title {
    right: 10%; left: 10%;
    bottom: 10%;
    font-size: 3vw;
    line-height: 3vw;
    color: #fff;
    text-shadow: 0.1vw 0.1vw 0.1vw #444;
  }
  .th-thumb {
    background: url(${ytThumb(event.video)}) no-repeat center center;
    background-size: cover;
    text-align: right;
  }
  .th-spotlight {
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: radial-gradient(
      circle,
      transparent 20vw,
      rgba(0, 0, 0, 0.85) 25vw
  );
  }
</style>`
    })
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
                <Col sm={6} lg={6}>
                  {
                    event !== "fetching" && (
                      <ThumbCanvas ref={drawEl} content={content} event={event} />
                    )
                  }
                </Col>
                <Col sm={6}>
                  <textarea style={{
                    width: "100%",
                    height: "100%"
                  }}
                    onChange={(e) => updateContent(e.target.value)}
                    value={content}
                  >

                  </textarea>
                </Col>

              </Row>
              <Row>
                <Col sm={12}>
                  {/* <Button onClick={saveImage}>
                    Save image
                  </Button> */}
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

const ThumbCanvas = forwardRef<HTMLDivElement, {
  content: string, event: PublicEvent
}>((
  { content, event: ev }, ref) => {
  return (
    <div ref={ref} style={{
      width: "100%",
      paddingTop: "56.25%",
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0
      }}
      >
        <style>
          {`
          .th-thumb, .th-title, .th-acronym, .th-spotlight {
            position: absolute;
          }
        `}
        </style>
        <div
          style={{
            position: 'relative',
            top: 0, left: 0, width: "100%", height: "100%"
          }}
          className="th-thumb"
          dangerouslySetInnerHTML={{ __html: content }}>
        </div>

      </div>
    </div>
  )
});

async function printDiv(eventId: EventId, div: HTMLDivElement) {
  const canvas = await html2canvas(div, { useCORS: true });
  const myImage = canvas.toDataURL();
  downloadURI(myImage, `event-thumb-${eventId}.png`);
}

function downloadURI(uri: string, name: string) {
  var link = document.createElement("a");

  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  //after creating link you should delete dynamic link
  //clearDynamicLink(link); 
}