const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass')
const webpack = require('webpack');

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

    return {
      ...defaultPathMap,
      ...eventPaths
    };
  }
}))