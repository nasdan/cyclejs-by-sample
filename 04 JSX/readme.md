# 04 JSX

In this sample we will use JSX with CycleJS

We will take a start up point sample _03 Composable_

Summary steps:

- Install babel-plugin-transform-react-jsx and snabbdom-jsx
- Using JSX.

## Steps to build it

- Let's install babel-plugin-transform-react-jsx and snabbdom-jsx:

````
npm install babel-plugin-transform-react-jsx snabbdom-jsx --save-dev
````

- Let's configure .babelrc

```javascript
{
  "presets": ["env"],
  "plugins": [
    "syntax-jsx",
    ["transform-react-jsx", {"pragma": "html"}]
  ]
}
```

- Now, we are going to use it

### ./src/components/header.js

```javascript
import xs from 'xstream';
import {html} from 'snabbdom-jsx';

export const Header = (sources) => {
  const props$ = sources.props;

  const vtree$ = props$.map(props =>
    <ul className="nav nav-tabs">
      <li className="active">
        <a>{props.tabName}</a>
      </li>
    </ul>
  );

  return {
    DOM: vtree$
  }
}
```

### ./src/components/body.js

```javascript
import xs from 'xstream';
import {html} from 'snabbdom-jsx';

export const Body = (sources) => {
  const props$ = sources.props;

  return {
    DOM: props$.map(props =>
      <h3>This is {props.tabName}</h3>
    )
  }
}

```


```javascript
import xs from 'xstream';
import {Header} from './components/header';
import {Body} from './components/body';
import {html} from 'snabbdom-jsx';

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
      <div>
        {header}
        {body}
      </div>
  );

  return {
    DOM: vtree$
  };
};

```

- Execute the example:

 ```bash
 $ npm start
 ```
