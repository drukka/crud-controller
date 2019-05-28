'use strict';

const args = require('yargs');

args.option('name', {
  describe: 'Model name, with which will be generated the controller: {Name}Controller.js',
  type: 'string'
});
args.option('config', {
  describe: 'Specify the JSON config file location if don\'t want to use the default config.',
  type: 'string'
});
args.option('overwrite', {
  describe: 'Overwrite already existing controller file.',
  type: 'boolean'
});

args
  .help()
  .version()
  .wrap(args.terminalWidth())
  .strict();


module.exports = args.argv;