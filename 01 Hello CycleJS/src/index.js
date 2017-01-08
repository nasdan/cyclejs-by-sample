import {run} from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import {Hello} from './hello';

run(Hello, {
  DOM: makeDOMDriver('#root')
});
