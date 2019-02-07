import { Fragment } from 'react';

import Head from 'next/head';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Header from '../components/header';
import AIThemes from '../components/ai-themes';

export default () => (
  <Fragment>
    <Head>
      <AIThemes />
    </Head>
    <Header />
    <style jsx>{`
      main {
        margin-top: 100px;
      }
      h1.intro {
        font-size: 8vw;
      } 
      p.intro.lead {
        font-size: 4vw;
      }
    `}
    </style>
    <main>
      <Jumbotron className="intro text-center">
        <h1 className="intro">aggregate intellect</h1>
        <p className="intro lead">
          Redefining Scientific Discovery
        </p>
        <p>
          Coming soon.
        </p>
      </Jumbotron>

    </main>
  </Fragment>
);