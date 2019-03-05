const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const webpack = require('webpack');

const INTERNAL_TOKEN = 'aaa';
const INTERNAL_PATHS = ['speaker-prep'];

const SITE_NAME = "A.I. Socratic Circles";
const SITE_ABBREV = "AISC";
const SITE_NAME_FULL = `${SITE_NAME} (#${SITE_ABBREV})`

function genPublicPaths(defaultPathMap) {
  const { pastEvents, futureEvents } = require('./static/data/events.json');
  const events = pastEvents.concat(futureEvents);
  const { getEventId } = require('../common/event');
  const eventPaths = {}
  for (let ev of events) {
    const id = getEventId(ev);
    eventPaths[`/events/${id}`] = {
      page: '/single-event', query: { id }
    }
  }

  const cleansedDefaultPathMap = Object.assign({}, defaultPathMap);

  INTERNAL_PATHS.forEach((secretPath) => {
    delete cleansedDefaultPathMap[secretPath];
  });

  return {
    ...cleansedDefaultPathMap,
    ...eventPaths
  };
}

module.exports = withTypescript(withCSS(withSass({

  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.md$/,
        use: 'raw-loader'
      }
    );
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env),
    );

    return config
  },

  exportPathMap(defaultPathMap) {
    const publicPaths = genPublicPaths(defaultPathMap);

    const internalPaths = {};
    INTERNAL_PATHS.forEach((secretPath) => {
      internalPaths[`/in-${INTERNAL_TOKEN}/${secretPath}`] = {
        page: `/${secretPath}`
      }
    });

    return {
      ...publicPaths,
      ...internalPaths,
    };
  },
  genPublicPaths,

  publicRuntimeConfig: {
    SITE_NAME, SITE_ABBREV, SITE_NAME_FULL
  }
})))
