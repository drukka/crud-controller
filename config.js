'use strict';

const args = require('./args');
const helpers = require('./helpers');

if (!args.name) {
  console.log('\x1b[31m', 'No --name specified!');
  return;
}

const defaultConfig = {
  currentDir: process.cwd(),
  name: helpers.capitalize(args.name),
  overwrite: args.overwrite ? true : false,
  paths: {
    controllers: 'app/controllers/v1',
    models: 'app/models',
  }
};

let configFile = {};

if (args.config) {
  const file = defaultConfig.currentDir + '/' + args.config;

  configFile = require(file);

  if (configFile.hasOwnProperty('paths')) {
    defaultConfig.paths = {
      ...defaultConfig.paths,
      ...configFile.paths
    };
  }
}

defaultConfig.paths.models = helpers.getModelsRelativePath(defaultConfig);

module.exports = defaultConfig;