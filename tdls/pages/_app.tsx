import React from 'react'
import App, { Container } from 'next/app'
import { PageTransition } from 'next-page-transitions'

import './_app.scss';

interface P { }


class MyApp extends App<{}, {}> {
  static async getInitialProps({ Component, ctx }: P) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <PageTransition timeout={300} classNames="page-transition">
          <Component {...pageProps} />
        </PageTransition>
      </Container>
    )
  }
}

export default MyApp