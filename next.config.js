require('dotenv').config();
const webpack = require('webpack');
const withTypescript = require('@zeit/next-typescript');
const fs = require('fs');

const withSass = require('@zeit/next-sass')

module.exports = withTypescript(withSass({

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

  exportPathMap: async function (defaultPathMap) {
    const { pastEvents, futureEvents } = require('./tdls/static/data/events.json');
    const events = pastEvents.concat(futureEvents);
    const { getEventId } = require('./common/event');
    const eventPaths = {}
    for (let ev of events) {
      const id = getEventId(ev);
      eventPaths[`/events/${id}`] = {
        page: '/single-event', query: { id }
      }
    }

    return {
      ...defaultPathMap,
      ...eventPaths
    };
  }
}))
