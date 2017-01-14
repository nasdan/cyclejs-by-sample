import xs from 'xstream';
import {html} from 'snabbdom-jsx';
import isolate from '@cycle/isolate';
import {Input} from '../../common/components/input';
import {required} from '../../common/validations/required';

export const MemberPage = (sources) => {
  const nameProps$ = xs.of({label: 'Name', placeholder: 'name', error: 'Name required', validationFn: required});
  const emailProps$ = xs.of({label: 'Email', placeholder: 'email', error: 'Email required', validationFn: required});

  const NameInput = isolate(Input);
  const EmailInput = isolate(Input);

  const nameInput$ = NameInput({DOM: sources.DOM, props: nameProps$}).DOM;
  const emailInput$ = EmailInput({DOM: sources.DOM, props: emailProps$}).DOM;

  const vtree$ = xs.combine(nameInput$, emailInput$)
    .map(([name, email]) =>
      <div>
        {name}
        {email}
      </div>
  );

  return {
    DOM: vtree$
  }
}
