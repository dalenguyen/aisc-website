import Link from 'next/link';
import Head from 'next/head';
import Meta from '../components/meta';
import { Fragment } from 'react';
import {
  Container, Row, Col
} from 'react-bootstrap';

export default () => {
  return (
    <Fragment>
      <Head>
        <Meta />
      </Head>
      <Container>
        <Row>
          <Col>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Col>
        </Row>
      </Container>

    </Fragment>
  )
}