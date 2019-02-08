const withSass = require('@zeit/next-sass')
module.exports = 

module.exports = withSass({
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.md$/,
        use: 'raw-loader'
      }
    )

    return config
  },
})
