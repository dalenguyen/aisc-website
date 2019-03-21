import React from 'react'
import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BlogHead from '../../components/blog/Header';
import ThemesAndSuch from '../../components/themes-and-such';
import Header from '../../components/header';
import Footer from '../../components/footer';
import PagePreview from '../../components/blog/PagePreview'
import { formatDate } from '../../utils/blog/date'
import { makeUrl, filterPosts } from '../../utils/blog/content'
import Hero from '../../components/blog/Hero';

import CONFIG from '../../content/index.json'
import SUMMARY_JSON from '../../content/summary.json'

function Index({ }) {
  return (
    <Fragment>
      <Head>
        <title>{`${CONFIG.siteTitle} - Index`}</title>
        <meta name="description" content={CONFIG.description} />
        <ThemesAndSuch />
      </Head>
      <BlogHead />
      <Header before={
        <Link href="/events">
          <a ><i className="top-go-back-link fa fa-arrow-circle-left"></i>
          </a>
        </Link>
      } />
      <Hero />
      <Body summaryJson={SUMMARY_JSON} />
      <Footer />
    </Fragment>
  )
}

function Body({ summaryJson }) {
  const postList = filterPosts(summaryJson)
  return (
    <section className="mt-4 mb-4 postlist container text-center">
      {postList.map((article, i) => {
        const href = makeUrl(article)
        const date = formatDate(article.date)
        return (
          <PagePreview
            title={article.title}
            preview={article.preview}
            date={date}
            href={href}
            key={i}
          />
        )
      })}
    </section>
  )
}

export default Index
