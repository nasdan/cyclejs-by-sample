import {run} from '@cycle/xstream-run';
import xs from 'xstream';
import {makeDOMDriver} from '@cycle/dom';
import {App} from './app';

run(App, {
  DOM: makeDOMDriver('#root')
});
