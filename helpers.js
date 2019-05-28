'use strict';

exports.capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

exports.getModelsRelativePath = (defaultConfig) => {
  const controllerDepth = defaultConfig.paths.controllers.split('/');
  const modelDepth = defaultConfig.paths.models.split('/');
  let path = '';
  const erasableIndexes = [];

  controllerDepth.forEach((dir, index) => {
    if (modelDepth[index] === dir) {
      erasableIndexes.push(index);
      return;
    }
    path += '../';
  });

  erasableIndexes.slice().reverse().forEach((index) => {
    modelDepth.splice(index, 1);
  });

  return path + modelDepth.join('/');
};