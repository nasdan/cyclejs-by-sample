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
