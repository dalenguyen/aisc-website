require('dotenv').config();
const webpack = require('webpack')

const withSass = require('@zeit/next-sass')
const BLOG_SUMMARY_JSON = require('./blog/content/summary.json')
module.exports = withSass({

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
  }
})
