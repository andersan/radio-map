"use strict";

const path = require("path");

const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

// import webpack from "webpack";
// import CopyPlugin from "copy-webpack-plugin";
// import HtmlPlugin from "html-webpack-plugin";
// import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
// See also: https://github.com/CesiumGS/cesium-webpack-example

module.exports = (_env, args) => ({
  mode: args.mode === "production" ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        "useBuiltIns": "usage",
                        "corejs": 3
                    }
                ],
                ['@babel/preset-typescript', { allowNamespaces: true }]
            ],
            plugins: args.mode === "production" ? [] : ["react-refresh/babel"],
          }
        }],
      },
      {
          test: /\.tsx?$/,
          include: path.resolve(__dirname, "src"),
          use: [{
              loader: 'ts-loader',
              options: {
                  transpileOnly: true,
                  // minimize: true
              }
          }]
      },
      {
        test: /\.css$/,
        use: ["style-loader","css-loader"]
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
        use: ["url-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify(""),
    }),
    new CopyPlugin({
      patterns: [
        { from: "node_modules/cesium/Build/Cesium/Workers", to: "Workers" },
        { from: "node_modules/cesium/Build/Cesium/ThirdParty", to: "ThirdParty" },
        { from: "node_modules/cesium/Build/Cesium/Assets", to: "Assets" },
        { from: "node_modules/cesium/Build/Cesium/Widgets", to: "Widgets" },
      ],
    }),
    new HtmlPlugin({
      template: "index.html"
    }),
    // new HtmlPlugin({
    //   filename: 'test.html',
    //   template: "test.html"
    // }),
    // new HtmlPlugin({
    //   filename: './express-test.html',
    //   inject: true,
    //   template: "express-test.html",
    //   chunks: ['express-test', "/src/express-basic-test/express-test.tsx"]
    // }),
    // new HtmlPlugin({
    //   filename: 'radio.html',
    //   template: "radio.html"
    // }),
    // new HtmlPlugin({
    //   filename: 'radio-garden.html',
    //   template: "radio-garden.html"
    // }),
    ...(args.mode === "production" ? 
    [new CompressionPlugin({
      filename: '[path][base].br', //asset: '[path].br[query]'
      algorithm: 'brotliCompress', //for CompressionPlugin
      deleteOriginalAssets: false, //for CompressionPlugin
      test: /\.(ts|tsx|jsx|js|css|html|svg)$/,
      compressionOptions: {
        // zlib’s `level` option matches Brotli’s `BROTLI_PARAM_QUALITY` option.
        level: 11,
      },
      threshold: 10240,
      minRatio: 0.8
    }),
    new CompressionPlugin({
      filename: '[path][base].gz', //asset: '[path].gz[query]'
      algorithm: 'gzip',
      test: /\.(ts|tsx|jsx|js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    })] : [new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()]),
  ],
  // resolve: {
  //     fallback: {
  //     "url": false,
  //     "zlib": false,
  //     "http": false,
  //     "https": false,
  //   },
  // },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],    
      fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "url": require.resolve("url/"),
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/"),
      "assert": require.resolve("assert/"),
      "stream": require.resolve("stream-browserify"),
    },
  },
  experiments: {
    topLevelAwait: true
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: 2,
      test: /\.[tj]sx?$/i,
    })],
  },
});
