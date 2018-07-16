'use strict';
// Template version: 1.2.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/boot-pub-survey-manage": {
        // target: 'http://192.168.1.140:8080',      // 志猛个人服务器
        // target: 'http://192.168.1.154:9001',      // 和鹏个人服务器
        // target: 'http://192.168.1.18:8080',//元鹏

         //target: 'http://192.168.1.27:9099',//白杰
        //target: 'https://chakan.zhongchebaolian.com', // 生产
        target:'https://survey.zhongchebaolian.com', // 测试
        changeOrigin: true,
        // pathRewrite: {
        //   '^/boot-pub-survey-manage': '/boot-pub-survey-manage'
        // }
      },
      "/insure_survey_web": {
        // target: 'http://lipengwei.furui.com',      // 个人服务器
        // target: 'http://liangxing.furui.com',      // 个人服务器
        // target: 'http://luhongguang.furui.com',
        // target: 'http://testmall.aiganyisheng.com', // 测试
        // target: 'https://api.accidentx.zhongchebaolian.com', // 正式
       //changeOrigin: true,
        // pathRewrite: {
        //   '^/insure_survey_web': '/insure_survey_web'
        // }
      },
      '/phone-api-boot': {
        // target: 'http://lipengwei.furui.com',      // 个人服务器
        // target: 'http://liangxing.furui.com',      // 个人服务器
        // target: 'http://luhongguang.furui.com',
        //target:'http://192.168.1.126:8080',
        target:'https://survey.zhongchebaolian.com', // 测试
        //target: 'https://chakan.zhongchebaolian.com', // 生产
        // target: 'https://api.accidentx.zhongchebaolian.com', // 正式
        //changeOrigin: true,
        // pathRewrite: {
        //   '^/phone-api-boot': '/phone-api-boot'
        // }
      },
    },

    // Various Dev Server settings
    // host: 'localhost', // can be overwritten by process.env.HOST
    host: "localhost", // can be overwritten by process.env.HOST
    port: 8084, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static images for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
