const webpack = require('webpack');
// const CopyPlugin = require("copy-webpack-plugin");

// process.env.en
module.exports = {
  reactStrictMode: true,
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
    config.experiments.topLevelAwait = true;
    return config;
  }
}
