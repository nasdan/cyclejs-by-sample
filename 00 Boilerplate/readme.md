# 00 Boilerplate

In this sample we are going to setup the basic plumbing to "build" our project and launch it in a dev server.

Summary steps:

- Initialize **package.json** (with `npm init`)
- Install:
    - Webpack and webpack-dev-server.
- Setup **webpack.config.js**
- Create a test js file.
- Create a simple HTML file.

## Steps to build it

- Create and navigate to the folder where you are going to create the empty project.

- Execute `npm init`, you will be prompted to answer some information request
about the project (e.g. set name to _cyclejs-by-sample_ and description to _Sample working with CycleJS and Webpack_).
Once you have successfully fullfilled them a **package.json** file we will generated.

```
npm init
```

- Install **webpack** as a development dependency.

 ```
 npm i webpack --save-dev
 ```
- Install **webpack-dev-server** locally, as a development dependency (the reason to install it locally and not globally is to be easy to setup, e.g. can be launched on a clean machine without having to install anything globally but nodejs).

 ```
 npm i webpack-dev-server --save-dev
 ```

 - Let's install a list of plugins and loaders that will add powers to
 our webpack configuration.

 ```
 npm i html-webpack-plugin --save-dev
 ```

 - We also need to add babel support to handle ES6 syntax

 ```
 npm i babel-core babel-loader babel-preset-env --save-dev
 ```

 - Create a `.babelrc` config file to enable babel plugins like `babel-preset-env`

 ```json
 {
   "presets": ["env"]
 }
 ```

 - In order to launch webpack-dev-server, modify the **package.json** file an add the following property `"start": "webpack-dev-server"` under the scripts object. It allows us to launch webpack from the command line through npm typing `npm start`.

 - Now, our **package.json** file should looks something like:

 ```json
 {
   "name": "cyclejs-by-sample",
   "version": "1.0.0",
   "description": "Samples working with CycleJS and Webpack",
   "main": "index.js",
   "scripts": {
     "start": "webpack-dev-server"
   },
   "repository": {
     "type": "git",
     "url": "git+https://github.com/Nasdan/cyclejs-by-sample.git"
   },
   "author": "Daniel Sanchez",
   "license": "ISC",
   "bugs": {
     "url": "https://github.com/Nasdan/cyclejs-by-sample/issues"
   },
   "homepage": "https://github.com/Nasdan/cyclejs-by-sample#readme",
   "devDependencies": {
     "babel-core": "^6.21.0",
     "babel-loader": "^6.2.10",
     "babel-preset-env": "^1.1.6",
     "html-webpack-plugin": "^2.26.0",
     "webpack": "^1.14.0",
     "webpack-dev-server": "^1.16.2"
   }
 }
 ```

 - Let's create a subfolder called _src_.

 - Let's create a basic _src/index.js_ file:

 ```javascript
 const personToGreet = "CycleJS";
 const messageToDisplay = `Hello ${personToGreet}!`;

 document.write(messageToDisplay);
 ```

 - Let's create a basic _src/index.html_ file (under src folder):

 ```html
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="utf-8">
     <title>CycleJS + Webpack + ES6 by sample</title>
   </head>
   <body>
     <h1>Sample app</h1>
   </body>
 </html>
 ```

 - Now it's time to create a basic _webpack.config.js_ file, this configuration will
 include plumbing for:

 - Launching a web dev server.
 - Transpiling from ES6 to ES5.
 - Generating the build under a _dist_ folder.

 ```javascript
 var path = require('path');
 var webpack = require('webpack');
 var HtmlWebpackPlugin = require('html-webpack-plugin');
 var basePath = __dirname;

 module.exports = {
   context: path.join(basePath, "src"),
   resolve: {
     extensions: ['', '.js']
   },

   entry: {
     app: './index.js',
     vendor: [

     ]
   },

   output: {
     path: path.join(basePath, "dist"),
     filename: '[name].js'
   },

   devServer: {
     contentBase: './dist', //Content base
     inline: true, //Enable watch and live reload
     host: 'localhost',
     port: 8080,
     noInfo: true
   },

   devtool: 'source-map',

   module: {
     loaders: [
       {
         test: /\.js$/,
         exclude: /node_modules/,
         loader: 'babel-loader'
       }
     ]
   },

   plugins: [
     new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
     new HtmlWebpackPlugin({
       filename: 'index.html',
       template: 'index.html'
     })
   ]
 }
 ```
