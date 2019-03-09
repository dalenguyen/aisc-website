import { Fragment, useEffect } from 'react';
import $ from 'jquery-slim';


export default () => {
  useEffect(() => {
    loadFulLStory();
  }, []);
  return (
    <Fragment>
      <script async src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
      <script async src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
      <script src="https://apis.google.com/js/platform.js"></script>
    </Fragment>
  );
}


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


