/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1557715749283_8666';

  // add your middleware config here
  config.middleware = [];

  config.security = {
		csrf: {
			enable: false,
		},
		methodnoallow: {enable: false,},
		domainWhiteList: ['*', 'http://127.0.0.1:7001'],
  };
  
  config.bodyParser = {
		jsonLimit: `${10 * 1024 * 1024}`
  }

  console.log(path.join(appInfo.baseDir, '/temp/'))
  config.static = {
    prefix: '/resource',
    dir: path.join(appInfo.baseDir, '/temp')
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
