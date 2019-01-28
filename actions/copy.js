#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const beautify = require("json-beautify");
const defaultVuePodSettings = require('./defaults');

module.exports = {
  init: () => {
    fs.stat('.vue-pod.json', (err, file) => {
      if (err) {
        fs.writeFile('.vue-pod.json', beautify(defaultVuePodSettings, null, 2, 100), (err, d) => {
          if (err) {
            console.log(chalk.red('Aborted'));
          } else {
            console.log(chalk.green('created file .vue-pod.json. Happy customization 📝 !!!'));
          }
        });
      } else {
        console.log(chalk.red('Aborted. ".vue-pod.json" file already exists!'));
      }
    });
  }
}
