import Document, { Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  componentDidMount() {
    loadFulLStory();

  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="google-site-verification" content="vNQ5Pwbxdj5xT2e0HVRqnjAV88NNjmwNf5NI6k8zdNs" />
          <link rel='shortcut icon' type='image/x-icon' href='/static/aisc-logo.ico' />

          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-131780670-1"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js" integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E=" crossOrigin="anonymous"></script>
          <script async src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
          <script async src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
          <script src="https://apis.google.com/js/platform.js"></script>
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

function loadFulLStory() {
  // fullstory

  window['_fs_debug'] = false;
  window['_fs_host'] = 'fullstory.com';
  window['_fs_org'] = 'HXRJS';
  window['_fs_namespace'] = 'FS';
  (function (m, n, e, t, l, o, g, y) {
    if (e in m) { if (m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'); } return; }
    g = m[e] = function (a, b, s) { g.q ? g.q.push([a, b, s]) : g._api(a, b, s); }; g.q = [];
    o = n.createElement(t); o.async = 1; o.src = 'https://' + _fs_host + '/s/fs.js';
    y = n.getElementsByTagName(t)[0]; y.parentNode.insertBefore(o, y);
    g.identify = function (i, v, s) { g(l, { uid: i }, s); if (v) g(l, v, s) }; g.setUserVars = function (v, s) { g(l, v, s) }; g.event = function (i, v, s) { g('event', { n: i, p: v }, s) };
    g.shutdown = function () { g("rec", !1) }; g.restart = function () { g("rec", !0) };
    g.consent = function (a) { g("consent", !arguments.length || a) };
    g.identifyAccount = function (i, v) { o = 'account'; v = v || {}; v.acctId = i; g(o, v) };
    g.clearUserCookie = function () { };
  })(window, document, window['_fs_namespace'], 'script', 'user');

  // GA
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());

  gtag('config', 'UA-131780670-1');
}

