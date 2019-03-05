require('dotenv').config();

const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass')
const webpack = require('webpack');

const SITE_NAME = "Toronto Deep Learning Series";
const SITE_ABBREV = "TDLS";
const SITE_NAME_FULL = `${SITE_NAME} (#${SITE_ABBREV})`

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

  publicRuntimeConfig: {
    FB_BASE: process.env.FB_BASE,
    SITE_NAME, SITE_NAME_ABBREV: SITE_ABBREV, SITE_NAME_FULL
  }
}))