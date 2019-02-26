const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
const webpack = require('webpack');

const INTERNAL_TOKEN = 'aaa';
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

    const internalPaths = {};
    ['speaker-prep'].forEach((secretPath) => {
      delete defaultPathMap[secretPath];
      internalPaths[`/in-${INTERNAL_TOKEN}/${secretPath}`] = {
        page: `/${secretPath}`
      }
    });

    return {
      ...defaultPathMap,
      ...internalPaths,
      ...eventPaths,
    };
  }
})))