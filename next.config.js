require('dotenv').config();
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const withFonts = require('next-fonts');

module.exports = withTypescript(
  withSass(
    withFonts({
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

      exportPathMap: async function (defaultPathMap, config) {
        const { dir } = config;
        const { exportPathMap } = require(path.join(dir, 'next.config'));

        if (exportPathMap) {
          return exportPathMap(defaultPathMap, config);
        } else {
          return defaultPathMap;
        }
      }
    })
  )
)
