#!/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs');
const templateParser = require('es6-template');
const mkdirp = require('mkdirp');
const removeDirectory = require('rimraf');

const defaults = require('./defaults');

let vuePodComponentSettings;
try {
  vuePodJsonFilesContent = JSON.parse(fs.readFileSync('.vue-pod.json'));
  vuePodComponentSettings = vuePodJsonFilesContent.component;
} catch (e) {
  vuePodComponentSettings = defaults.component;
}

module.exports = {
  init: (action, componentPath) => {
    switch (action) {
      case 'g':
      case 'generate':
        create(componentPath);
        break;
      case 'd':
      case 'delete':
        deleteComponent(componentPath);
        break;
      default:
        console.log(chalk.red('Invalid option.'));
        break;
    }
  }
}

let create = (componentPath) => {
  try {
    fs.statSync(componentPath);
    console.log(chalk.red('Aborted: component path already exists.'));
  } catch (e) {
    mkdirp(componentPath, (err) => {
      if (err) {
        console.log(chalk.red('Component creation failed.'));
      } else {
        console.log(chalk.green('creating component...'));
        console.log(chalk.green(`created directory: ${componentPath}`));
        // single file
        if (vuePodComponentSettings.singleFile) {
          let templateContent = createSingleFiletemplateContent(componentPath);
          templateFile = vuePodComponentSettings.files.find((file) => file.templateFile);
          let filePath = getFilePath(templateFile, componentPath);
          fs.writeFile(filePath, templateContent, (err) => {
            if (err) {
              console.log(chalk.red(`Component creation failed : ${filePath}`));
            } else {
              console.log(chalk.green(`File created: ${filePath}`));
            }
          });
        } else {
          let componentName = getComponentName(componentPath);
          vuePodComponentSettings.files.forEach((file) => {
            let filePath = getFilePath(file, componentPath);
            // checking for basepath
            if (file.basePath && file.basePath !== '') {
              let fullBasePath = `${file.basePath}/${componentName}`;
              mkdirp.sync(fullBasePath, (err) => {
                if (err) {
                  console.log(chalk.red(`File creation failed custom base path: ${fullBasePath}`));
                }
              });
            }
            fs.writeFile(filePath, templateParser(file.content, {
              componentName
            }), (err) => {
              if (err) {
                console.log(chalk.red(`File creation failed: ${filePath}`));
              } else {
                console.log(chalk.green(`File created: ${filePath}`));
              }
            });
          });
          createTemplateFileContent(componentPath);
        }
      }
    });
  }
}

let createSingleFiletemplateContent = (componentPath) => {
  let componentName = getComponentName(componentPath);
  let templateContent = '';
  vuePodComponentSettings.files.forEach((file) => {
    if (file.tagname) {
      templateContent += `<${file.tagname} ${attachAttributes(file)}> ${templateParser(file.content, { componentName })} </${file.tagname}>\n\n`;
    }
  });
  return templateContent;
};

let createTemplateFileContent = (componentPath) => {
  let componentName = getComponentName(componentPath);
  let templateContent = '';
  let templateFile;
  vuePodComponentSettings.files.forEach((file) => {
    if (file.tagname) {
      if (file.templateFile) {
        templateContent += `<${file.tagname} ${attachAttributes(file)}> ${templateParser(file.content, { componentName })} </${file.tagname}>\n\n`;
        templateFile = file;
      } else {
        templateContent += `<${file.tagname} ${attachAttributes(file, true, componentPath)}></${file.tagname}>\n\n`;
      }
    }
  });
  let templateFilePath = getFilePath(templateFile, componentPath)
  fs.writeFile(templateFilePath, templateContent, (err) => {
    if (err) {
      console.log(chalk.red(`Adding template file content failed: ${templateFilePath}`));
    }
  });
}

let attachAttributes = (file, attachSource, componentPath) => {
  let attrs = file.attributes || [];
  if (attrs) {
    if (attachSource) {
      let componentName = getComponentName(componentPath);
      let fileName = templateParser(file.filename, {
        componentName
      });
      let source = {
        name: 'src',
        value: getSrc(file, componentPath)
      };
      attrs.splice(0, 0, source);
    }
    let attributes = '';
    let space = ` `;
    attrs.forEach((attr, index) => {
      if (attrs.length === index + 1) {
        space = '';
      }
      attributes += `${attr.name}="${attr.value}"${space}`;
    });
    return attributes;
  }
};

let getComponentName = (componentPath) => {
  let split = componentPath.split('/');
  return split[split.length - 1];
};

let getFilePath = (file, componentPath) => {
  let componentName = getComponentName(componentPath);
  let fileName = templateParser(file.filename, {
    componentName
  });
  return (file.basePath && file.basePath !== '') ?
    `./${file.basePath}/${componentName}/${fileName}.${file.extension}` :
    `./${componentPath}/${fileName}.${file.extension}`;
};

let getSrc = (file, componentPath) => {
  let componentName = getComponentName(componentPath);
  let fileName = templateParser(file.filename, {
    componentName
  });
  return (file.basePath && file.basePath !== '') ?
    `./${file.basePath}/${componentName}/${fileName}.${file.extension}` :
    `./${fileName}.${file.extension}`;
};

let getDeleteDirectoryPath = (file, componentPath) => {
  let componentName = getComponentName(componentPath);
  return (file.basePath && file.basePath !== '') ?
    `./${file.basePath}/${componentName}` :
    `./${componentPath}`;
};

let deleteComponent = (componentPath) => {
  if (vuePodComponentSettings.singleFile) {
    templateFile = vuePodComponentSettings.files.find((file) => file.templateFile);
    let deletableDirecoryPath = getDeleteDirectoryPath(templateFile, componentPath);
    deleteDirectory(deletableDirecoryPath);
  } else {
    vuePodComponentSettings.files.forEach((file) => {
      let deletableDirecoryPath = getDeleteDirectoryPath(file, componentPath);
      deleteDirectory(deletableDirecoryPath);
    });
  }
};

let deleteDirectory = (path) => {
  removeDirectory(path, (err) => {
    if (err) {
      console.log(chalk.red(`Directory Deleted : ${path}`));
    } else {
      console.log(chalk.green(`Directory Deleted : ${path}`));
    }
  });
};
