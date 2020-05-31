const dotenv = process.env.NODE_ENV === 'development' ? '.env.development' : '.env'
const { parsed: localEnv } = require('dotenv').config({ path: dotenv })
const webpack = require('webpack')

module.exports = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))

    return config
  }
}
