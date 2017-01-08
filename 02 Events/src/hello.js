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
