import xs from 'xstream';
import {html} from 'snabbdom-jsx';

export const Body = (sources) => {
  const props$ = sources.props;

  return {
    DOM: props$.map(props =>
      <h3>This is {props.tabName}</h3>
    )
  }
}
