import { Fragment } from 'react';
import $ from 'jquery-slim';


export default () => (
  <Fragment>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://apis.google.com/js/platform.js"></script>
    <script src="/static/main.js"></script>
  </Fragment>
);


if (typeof window !== 'undefined') {
  require('bootstrap');
  document.addEventListener('DOMContentLoaded', () => {
    // main script entry point
    assembleEvents(
      document.getElementById('useful-links'),
      document.getElementById('sma-links')
    );

    fixOffset();
    fixNavbarCollapse();
  });

  function fixNavbarCollapse() {
    $('.navbar-collapse a:not(.dropdown-toggle)').on('click', function () {
      $('.navbar-toggler').click(); //bootstrap 4.x
    });
  }


  function fixOffset() {
    const HISTORY_SUPPORT = !!(history && history.pushState);

    const anchorScrolls = {
      ANCHOR_REGEX: /^#[^ ]+$/,
      OFFSET_HEIGHT_PX: 120,

      /**
       * Establish events, and fix initial scroll position if a hash is provided.
       */
      init: function () {
        this.scrollToCurrent();
        window.addEventListener('hashchange', this.scrollToCurrent.bind(this));
        document.body.addEventListener('click', this.delegateAnchors.bind(this));
      },

      /**
       * Return the offset amount to deduct from the normal scroll position.
       * Modify as appropriate to allow for dynamic calculations
       */
      getFixedOffset: function () {
        return this.OFFSET_HEIGHT_PX;
      },

      /**
       * If the provided href is an anchor which resolves to an element on the
       * page, scroll to it.
       * @param  {String} href
       * @return {Boolean} - Was the href an anchor.
       */
      scrollIfAnchor: function (href, pushToHistory) {
        let match, rect, anchorOffset;

        if (!this.ANCHOR_REGEX.test(href)) {
          return false;
        }

        match = document.getElementById(href.slice(1));

        if (match) {
          rect = match.getBoundingClientRect();
          anchorOffset = window.pageYOffset + rect.top - this.getFixedOffset();
          window.scrollTo(window.pageXOffset, anchorOffset);

          // Add the state to history as-per normal anchor links
          if (HISTORY_SUPPORT && pushToHistory) {
            history.pushState({}, document.title, location.pathname + href);
          }
        }

        return !!match;
      },

      /**
       * Attempt to scroll to the current location's hash.
       */
      scrollToCurrent: function () {
        this.scrollIfAnchor(window.location.hash);
      },

      /**
       * If the click event's target was an anchor, fix the scroll position.
       */
      delegateAnchors: function (e) {
        const elem = e.target;

        if (
          elem.nodeName === 'A' &&
          this.scrollIfAnchor(elem.getAttribute('href'), true)
        ) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener(
      'DOMContentLoaded', anchorScrolls.init.bind(anchorScrolls)
    );
  }


  $("#modal_fast_stream").on('hidden.bs.modal', function (e) {
    $("#modal_fast_stream iframe").attr("src", $("#modal_fast_stream iframe").attr("src"));
  });


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

