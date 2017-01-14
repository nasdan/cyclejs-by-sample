import xs from 'xstream';
import {html} from 'snabbdom-jsx';

export const Input = (sources) => {
  const props$ = sources.props;

  const onChange$ = sources.DOM.select('.form-control').events('input')
    .map(e => e.target.value);

  const validation$ = xs.combine(onChange$, props$)
    .map(([value, props]) => props.validationFn(value))
    .startWith(true);

  const state$ = xs.combine(validation$, props$)
    .map(([isValid, props]) => ({
      ...props,
      isValid
    })
  );

  const vtree$ = state$.map(state =>
    <div className={state.isValid ? 'form-group' : 'form-group has-error'}>
      <label>{state.label}</label>
      <input type="text"
       className="form-control"
       placeholder={state.placeholder}
       />
       <span className="help-block">{state.isValid ? '' : state.error}</span>
     </div>
  );

  return {
    DOM: vtree$
  }
}
