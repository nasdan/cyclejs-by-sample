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
