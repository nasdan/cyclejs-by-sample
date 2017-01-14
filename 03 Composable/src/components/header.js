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
