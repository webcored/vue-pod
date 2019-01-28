module.exports = {
  component: {
    singleFile: false,
    files: [
      {
        filename: '${componentName}',
        basePath: '',
        extension: 'vue',
        content: "<!-- component : ${componentName} -->",
        tagname: 'template',
        templateFile: true
      },
      {
        filename: 'style',
        basePath: '',
        extension: 'scss',
        content: ".${componentName} { /*  your styles ... */; }",
        tagname: 'style',
        attributes: [{
            name: 'type',
            value: 'scss'
          },
          {
            name: 'scoped',
            value: 'true'
          }
        ]
      },
      {
        filename: 'script',
        basePath: '',
        extension: 'js',
        content: "export default { /* component: ${componentName} */ }",
        tagname: 'script'
      }
    ]
  }
};
