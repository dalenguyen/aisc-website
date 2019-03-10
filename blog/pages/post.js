import React from 'react'
import { withRouter } from 'next/router'
import Page from '../src/components/Page'
import PagePreview from '../src/components/PagePreview'
import { formatDate } from '../src/utils/date'

import CONFIG from '../content/index.json'
import SUMMARY_JSON from '../content/summary.json'

function Index(props) {
  let pageJson = {}
  if (props.router.query) {
    if (props.router.query.fullUrl) {
      pageJson = require(`../content${props.router.query.fullUrl}.json`)
    }
  }

  return (
    <div>
      <style jsx global>{`
        .content a {
          color: #0365A5;
          text-decoration: none;
          border-bottom: 1px solid #DFDFDF;
          transition: all 300ms ease;
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
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.1/dist/katex.min.css" integrity="sha384-dbVIfZGuN1Yq7/1Ocstc1lUEm+AT+/rCkibIcC/OmWo5f0EA48Vf8CytHzGrSwbQ" crossOrigin="anonymous" />
      <Page
        body={Body(pageJson)}
        siteTitle={`${CONFIG.siteTitle} - ${pageJson.title}`}
        heroTitle={CONFIG.siteTitle}
        description={CONFIG.description}
        stylesheets={CONFIG.stylesheets}
        topLinks={CONFIG.topLinks}
        backgroundClass={CONFIG.backgroundClass}
        copyright={CONFIG.copyright}
        siteId={CONFIG.siteId}
        author={CONFIG.author}
        editor={CONFIG.editor}
      />
    </div>
  )
}

function Body(props) {
  return (
    <div className="content center mw7 pa3 pa4-ns">
      <h1 className="mt0 lh-title">{props.title}</h1>
      <p>Written by <b>{props.author}</b> | Edited by <b>{props.editor}</b></p>
      <div dangerouslySetInnerHTML={{ __html: props.bodyHtml }}></div>
    </div >
  )
}

export default withRouter(Index)
