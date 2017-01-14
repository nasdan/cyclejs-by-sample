# 03 Composable

In this sample we will introduce to compose CycleJS components

We will take a start up point sample _02 Events_

Summary steps:

- Install bootstrap and loaders
- Create Header component
- Create Body component.

## Steps to build it

- Let's install bootstrap and loaders to work with it:

````
npm install bootstrap --save
````

````
npm install css-loader style-loader file-loader url-loader extract-text-webpack-plugin --save-dev
````

- Let's configure webpack.config.js

```javascript
entry: {
  ...
  vendorStyles: [
    '../node_modules/bootstrap/dist/css/bootstrap.css'
  ]
},
...
module: {
  loaders: [
    ...
    //Note: Doesn't exclude node_modules to load bootstrap
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style','css')
    },
    //Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
    {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
    {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
    {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
    {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
  ]
},

plugins: [
  ...
  new ExtractTextPlugin('[name].css')
]
```

- Now, we are going to create a Header component

### ./src/components/header.js

```javascript
import xs from 'xstream';
import {ul, li, a} from '@cycle/dom';

export const Header = (sources) => {
  const props$ = sources.props;

  const vtree$ = props$.map(props =>
    ul('.nav .nav-tabs', [
      li('.active', [
        a('.home', props.tabName)
      ])
    ])
  );

  return {
    DOM: vtree$
  }
}

```

- Body component

### ./src/components/body.js

```javascript
import xs from 'xstream';
import {h3} from '@cycle/dom';

export const Body = (sources) => {
  const props$ = sources.props;

  return {
    DOM: props$.map(props =>
      h3(`This is a ${props.tabName} `)
    )
  }
}

```

- Let's to replace _hello.js_ component by _app.js_

```javascript
import xs from 'xstream';
import {Header} from './components/header';
import {Body} from './components/body';
import {div, h3} from '@cycle/dom';

export const App = (sources) => {
  const props$ = xs.of({
    tabName: 'Home'
  });

  const childSources = {
    DOM: sources.DOM,
    props: props$
  };

  const header$ = Header(childSources).DOM;
  const body$ = Body(childSources).DOM;

  const vtree$ = xs.combine(header$, body$)
    .map(([header, body]) =>
      div([
        header,
        body
      ])
  );

  return {
    DOM: vtree$
  };
};
```

- And use it in _index.js_

```javascript
import {run} from '@cycle/xstream-run';
import xs from 'xstream';
import {makeDOMDriver} from '@cycle/dom';
import {App} from './app';

run(App, {
  DOM: makeDOMDriver('#root')
});

```
- Execute the example:

 ```bash
 $ npm start
 ```
