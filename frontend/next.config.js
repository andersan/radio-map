const webpack = require('webpack');
// const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

// process.env.en
module.exports = {
  reactStrictMode: true,
  // config.serverRuntimeConfig = {
  //   API_URL: process.env.API_URL,
  // }
  // Will be available on both server and client
  env: {
    NEXT_PUBLIC_CESIUM_ACCESS_TOKEN: process.env.NEXT_PUBLIC_CESIUM_ACCESS_TOKEN,
    ENVIRONMENT: process.env.ENVIRONMENT,
  },
  webpack: config => {
    // config.mode = process.env.ENVIRONMENT === 'production' ? 'production' : 'development';
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('cesium'),
      }),
      // new CopyPlugin({
      //   patterns: [
      //     { from: "node_modules/cesium/Build/Cesium/Workers", to: "Workers" },
      //     // { from: "node_modules/cesium/Build/Cesium/ThirdParty", to: "ThirdParty" },
      //     { from: "node_modules/cesium/Build/Cesium/Assets", to: "Assets" },
      //     { from: "node_modules/cesium/Build/Cesium/Widgets", to: "Widgets" },
      //   ],
      // }),
    );
    config.optimization.minimize = true;
    config.optimization.minimizer = [new TerserPlugin({
      parallel: 1
    })];
    config.experiments.topLevelAwait = true;
    return config;
  }
}
