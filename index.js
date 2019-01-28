#!/usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');

const copy = require('./actions/copy');
const componentActions = require('./actions/component');

commander
  .version('1.0.0')
  .command('component <action> <componentPath>')
  .alias('c')
  .description('Performs component actions ( generate|g - create, delete|d - delete )')
  .action((...arguments) => {
    componentActions.init(...arguments);
  });

commander
  .version('1.0.0')
  .command('copy')
  .description('Creates a .vue-pod file for customization')
  .action((...arguments) => {
    copy.init(...arguments);
  });


commander.on('--help', function(){
  console.log(chalk.green(`    Read documentation http://js-pods.github.io/vue-pods/`));
});


commander.parse(process.argv);
