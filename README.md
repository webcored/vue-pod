# vue-pod 🤟
Pod structure cli for Vue js

<a href="https://vue-pod.slack.com/" target="_new" style="display: inline-block;"><img src="https://pbs.twimg.com/profile_images/885554951857946624/sd7GRyjY_400x400.jpg" 
alt="slack Channel" width="50" height="50" border="50px" title="slack Channel" /></a>
<a href="http://twitter.com/@js_pods" target="_new" style="display: inline-block;"><img src="http://i.imgur.com/7tVYAeF.png" 
alt="slack Channel"  width="50" height="50" border="50px" title="Twitter" /></a>

# Getting Started

If you like to use vue components in **pod structure** please do install vue-pod (https://www.npmjs.com/package/vue-pod, https://github.com/js-pods/vue-pod/)

    npm install vue-pod -g


# Usage


    component|c <action> <component-path>


#### To create a component

    vue-pod component generate <component-path> ( or ) vue-pod c g <component-path>

#### To delete a component

    vue-pod component delete <component-path> ( or ) vue-pod c d <component-path>


# Customization 🎉🤟


You can customize the component files or you **add more files** to the pod structure

    vue-pod copy

It will create .vue-pod.json file in your project folder with the following content.

		{
            "component": {
              "singleFile": false,
              "files": [
                {
                  "filename": "${componentName}",
                  "basePath": "",
                  "extension": "vue",
                  "content": "<!-- component : ${componentName} -->",
                  "tagname": "template",
                  "templateFile": true
                },
                {
                  "filename": "style",
                  "basePath": "",
                  "extension": "scss",
                  "content": ".${componentName} { /*  your styles ... */; }",
                  "tagname": "style",
                  "attributes": [ { "name": "type", "value": "scss" }, { "name": "scoped", "value": "true" } ]
                },
                {
                  "filename": "script",
                  "extension": "js",
                  "content": "export default { /* component: ${componentName} */ }",
                  "tagname": "script"
                }
              ]
            }
          }

## Available options to customize 😎

* **singleFile**

  It expects a boolean. If 'false' creates multiple files with the available files array. If 'true' it will create **single file vue component** with all available contents to be rendered in a single component.

* **files**

  It's an array, which holds all the files data to be generated while creating a component.

 * **filename**

   filename will be the name of the file while it is generated.**You can pass a ES6 string template. Accessible variable is componentName - ${componentName}**.

 * **basePath**

   basepath holds the path value in which the file will be generated.

 * **extension**

   extension holds the extension value for a file.

 * **content**

   You can **pre-fills some contents to the file**. You can pass a ES6 string template. Accessible variable is componentName -    ${componentName}.

 * **tagname**

   It represents the tagname to be use to call this file while rendered in to the template file.

 * **templateFile**
 
    It expects a boolean. The Template File will hold all the necessary contents of the files which are all has **tagname**.

 * **attributes**

    tagname can have attributes example: &lt;template type="jade"&gt;


 *As of now vue-pod cli is created to manage only components. Managing router.js,router components,vuex store, plugins and directives are in the pipeline. **Contributions** are welcome (https://github.com/js-pods/vue-pod) for the better vue experience.

 Thanks for using **vue-pod** 🙏.

 
