import React from 'react'
import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router'
import BlogHead from '../../components/blog/Header';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Hero from '../../components/hero';
import CONFIG from '../../content/index.json'
import { nameToLink } from '../../components/profile';


import getConfig from 'next/config'


function Index(props) {
  const { fullUrl = '' } = props.router.query;
  const filename = '/posts' + fullUrl.split("/blog")[1];
  let pageJson = {}
  if (props.router.query) {
    if (props.router.query.fullUrl) {
      pageJson = require(`../../content${filename}.json`)
    }
  }

  return (
    <Fragment>
      <Head>
        <title>{`${pageJson.title} | ${CONFIG.siteTitle}`}</title>
        <meta name="description" content={CONFIG.description} />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.1/dist/katex.min.css" integrity="sha384-dbVIfZGuN1Yq7/1Ocstc1lUEm+AT+/rCkibIcC/OmWo5f0EA48Vf8CytHzGrSwbQ" crossOrigin="anonymous" />
      </Head>
      <BlogHead />
      <Header before={
        <Link href="/blog/">
          <a ><i className="top-go-back-link fa fa-arrow-circle-left"></i>
          </a>
        </Link>
      } />

      <style jsx global>{`
        .content a {
          color: #0365A5;
          text-decoration: none;
          border-bottom: 1px solid #DFDFDF;
        }

        a:hover, a:focus {
          border-bottom-color: currentColor;
        }

        img {
          margin-left: auto;
          margin-right: auto;
          display: block;
        }

        code {
          background-color: #EEE;
          line-height: 1;
          border-radius:2px;
          padding: 1px;
        }
        code:not(.hljs) {
          border: 1px solid #DDD;
        }
      `}</style>
      <Body {...pageJson} />
      <Footer />
    </Fragment>
  )
}

function Body({ author, title, editors = "", bodyHtml }) {
  return (
    <Fragment>
      <Hero
        title={title}
        subtitle={
          <p className="mt-2">Written by <b>{nameToLink(author)}</b> <br /> Edited by {editors.split(",").map(
            (e: string) => <b key={e} className="ml-1 mr-1">{nameToLink(e.trim())}</b>
          )}</p>

        }
      />
      <article
        className="content center mw7 pa3 pa4-ns"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      >
      </article>
    </Fragment>
  )
}

export default withRouter(Index)
