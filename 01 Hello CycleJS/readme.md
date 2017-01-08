# 01 Hello CycleJS

In this sample we will create our first CycleJS Component and connect it with the
DOM via CycleDOM.

We will take a start up point sample _00 Boilerplate_

Summary steps:

- Install [`xstream`](https://github.com/staltz/xstream) and [`@cycle/xstream-run`](https://github.com/cyclejs/cyclejs/tree/master/xstream-run) and [`@cycle/dom`](https://github.com/cyclejs/cyclejs/tree/master/dom) libraries.
- Update the index.html to create a placeholder for the cycle components
- Create a simple Cycle component.
- Wire up this component by using `@cycle-dom`.

## Steps to build it

- Let's install [`xstream`](https://github.com/staltz/xstream) and [`@cycle/xstream-run`](https://github.com/cyclejs/cyclejs/tree/master/xstream-run) and [`@cycle/dom`](https://github.com/cyclejs/cyclejs/tree/master/dom) libraries:

````
npm install xstream @cycle/xstream-run @cycle/dom --save
````

- Add it to vendor section in webpack config file

### webpack.config.js

```javascript
...
entry: {
  app: './index.js',
  vendor: [
    "xstream",
    "@cycle/xstream-run",
    "@cycle/dom"
  ]
},
...
```

- Update the index.html to create a placeholder for the components

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>CycleJS + Webpack + ES6 by sample</title>
  </head>
  <body>
    <h1>Sample app</h1>
    <div id="root">
    </div>   
  </body>
</html>
```

- Create a simple component _./src/hello.js_

```javascript
import xs from 'xstream';
import {span} from '@cycle/dom';

export const Hello = (sources) => {
  const sinks = {
    DOM: xs.of(
      span('Hello CycleJS from Component!')
    )
  };

  return sinks;
};

```

- Wire up this component by using `@cycle/dom` under _index.js_.

```javascript
import {run} from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import {Hello} from './hello';

run(Hello, {
  DOM: makeDOMDriver('#root')
});
```

- Execute the example:

 ```bash
 $ npm start
 ```
