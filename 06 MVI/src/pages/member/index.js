import xs from 'xstream';
import {intent} from './intent';
import {model} from './model';
import {view} from './view';
import {required} from '../../common/validations/required';

export const MemberPage = (sources) => {
  const nameProps$ = xs.of({
    label: 'Name',
    placeholder: 'name',
    error: 'Name required',
    validationFn: required
  });

  const emailProps$ = xs.of({
    label: 'Email',
    placeholder: 'email',
    error: 'Email required',
    validationFn: required
  });

  const actions$ = intent(sources, {nameProps$, emailProps$});
  const state$ = model(actions$);
  const vtree$ = view(state$);

  return {
    DOM: vtree$
  }
}
