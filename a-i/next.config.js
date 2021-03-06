const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass')
const webpack = require('webpack');

const SITE_NAME = "A.I. Socratic Circles";

module.exports = withTypescript(withSass({

  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.md$/,
        use: 'raw-loader'
      }
    );

    config.module.rules.push(
      {
        test: /\.(jpe?g)|(png)$/,
        use: 'raw-loader'
      }
    );

    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env),
    );

    return config
  },
  publicRuntimeConfig: {
    SITE_NAME
  }
}))