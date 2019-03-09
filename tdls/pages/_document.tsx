import Document, { Head, Main, NextScript } from 'next/document'


class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="google-site-verification" content="vNQ5Pwbxdj5xT2e0HVRqnjAV88NNjmwNf5NI6k8zdNs" />    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-131780670-1"></script>

        </Head>
        <body>
          <Main />
          <NextScript />
          <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css?family=Titillium+Web:400,400i,500,700,500i,700i,900,900i" rel="stylesheet" />
          <link rel="icon" type="image/png" href="/static/images/tdls_logo.png" />
          <link href="/static/main.css" rel="stylesheet" />
        </body>
      </html>
    )
  }
}

export default MyDocument
