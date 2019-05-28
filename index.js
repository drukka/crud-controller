#! /usr/bin/env node
'use strict';

const config = require('./config');
if (!Object.keys(config).length) {
  return;
}

const fs = require('fs');

const controllerTemplate = __dirname + '/template/controller.js';
const name = config.name;
const requireModelReplacement = 'const models = require(\'' + config.paths.models + '\')';
const modelReplacement = 'models.' + name;
const controllerPath = config.paths.controllers + '/' + name + 'Controller.js';
const controllerFullPath = config.currentDir + '/' + controllerPath;


let content = fs.readFileSync(controllerTemplate).toString();
content = content.replace('[\'%requireModel%\']', requireModelReplacement);
content = content.split('[\'%modelName%\']').join(modelReplacement);


fs.exists(controllerFullPath, (exists) => {
  if (exists && !config.overwrite) {
    console.log('\x1b[31m', 'The "' + controllerPath + '" file already exists! If you want to overwrite use --overwrite');
    return;
  }
  fs.writeFile(controllerFullPath, content, 'utf-8', (err) => {
    if (err) {
      console.log('\x1b[31m', 'Generation failed! Something went wrong :(');
    } else {
      console.log('\x1b[32m', 'File generated successful: ' + controllerPath);
    }
  });
});
