import xs from 'xstream';
import {html} from 'snabbdom-jsx';
import {Header} from './common/components/header';
import {MemberPage} from './pages/member';

export const App = (sources) => {
  const props$ = xs.of({
    tabName: 'Member'
  });

  const childSources = {
    DOM: sources.DOM,
    props: props$
  };

  const header$ = Header(childSources).DOM;
  const memberPage$ = MemberPage(childSources).DOM;

  const vtree$ = xs.combine(header$, memberPage$)
    .map(([header, memberPage]) =>
      <div className="container-fluid">
        {header}
        {memberPage}
      </div>
  );

  return {
    DOM: vtree$
  };
};
