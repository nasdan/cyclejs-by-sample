# 01 Hello CycleJS

In this sample we will introduce a basic CycleJS concept, handling events.

We will take a start up point sample _01 Hello CycleJS_

Summary steps:

- Create an input element.
- Show input value in h1 element.

## Steps to build it

- Let's update __./src/hello.js__ in order to create an input and handling value updates:

### ./src/hello.js

```javascript
import xs from 'xstream';
import {div, label, input, h1} from '@cycle/dom';

export const Hello = (sources) => {
  const inputEvents$ = sources.DOM.select('.name').events('input');
  const name$ = inputEvents$.map(e => e.target.value).startWith('');

  const sinks = {
    DOM: name$.map(name =>
      div([
        label('Name: '),
        input('.name', {type: 'text'}),
        h1(`Hello ${name} !`)
      ])
    )
  };

  return sinks;
};

```

- Execute the example:

 ```bash
 $ npm start
 ```
