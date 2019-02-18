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
  }
}))