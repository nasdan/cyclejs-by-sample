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
