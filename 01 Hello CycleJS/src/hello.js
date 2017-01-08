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
