import { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';

import Header from '../components/header'
import Footer from '../components/footer'
import Head from 'next/head'
const content = require(`../docs/code-of-conduct.md`);

const CodeOfConduct = () => (
  <Fragment>
    <Head>
      <title>Code of Conduct</title>
    </Head>
    <Header />
    <style jsx>{`
      main {
        margin-top: 40px;
      }
    `}</style>
    <main className="container">
      <ReactMarkdown source={content} />
    </main>
    <Footer />
  </Fragment>
);

export default CodeOfConduct;