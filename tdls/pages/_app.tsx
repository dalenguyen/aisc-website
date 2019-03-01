import React from 'react'
import App, { Container } from 'next/app'
import { PageTransition } from 'next-page-transitions'

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
        <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
          }
          .page-transition-enter-active {
            opacity: 1;
            transition: opacity 300ms;
          }
          
        `}</style>
      </Container>
    )
  }
}

export default MyApp