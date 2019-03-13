import React from 'react'
import App, { Container } from 'next/app'
import UserContextWrapper from '../components/auth-context-wrapper';


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
        <UserContextWrapper>
          <Component {...pageProps} />
        </UserContextWrapper>
      </Container>
    )
  }
}

export default MyApp