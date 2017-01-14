import {html} from 'snabbdom-jsx';

export const view = (state$) => {
  return state$.map(state =>
    <div className={state.isValid ? 'form-group' : 'form-group has-error'}>
      <label>{state.label}</label>
      <input type="text"
       className="form-control"
       placeholder={state.placeholder}
       />
       <span className="help-block">{state.isValid ? '' : state.error}</span>
     </div>
  );
};
