# 06 MVI

In this sample we will use MVI pattern.

We will take a start up point sample _05 Reusable_

Summary steps:
- Using MVI in Input and MemberPage components.

## Steps to build it

- Let's to create `intent.js`, `model.js` and `view.js` files for Input component:

### ./src/common/components/input/intent.js

```javascript
export const intent = ({DOM}) => ({
  onChange$: DOM.select('.form-control').events('input').map(e => e.target.value)
});
```

### ./src/common/components/input/model.js

```javascript
import xs from 'xstream';

export const model = ({onChange$}, props$) => {
  const validation$ = xs.combine(onChange$, props$)
    .map(([value, props]) => props.validationFn(value))
    .startWith(true);

  return xs.combine(validation$, props$)
    .map(([isValid, props]) => ({
      ...props,
      isValid
    })
  );
};
```

### ./src/common/components/input/view.js

```javascript
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
```

### ./src/common/components/input/index.js

```javascript
import {intent} from './intent';
import {model} from './model';
import {view} from './view';

export const Input = (sources) => {
  const props$ = sources.props;

  const actions$ = intent(sources);
  const state$ = model(actions$, props$);
  const vtree$ = view(state$);

  return {
    DOM: vtree$
  }
}
```

- Let's to create `intent.js`, `model.js` and `view.js` files for MemberPage component:

### ./src/pages/member/intent.js

```javascript
import isolate from '@cycle/isolate';
import {Input} from '../../common/components/input';

export const intent = ({DOM}, props) => {
  const NameInput = isolate(Input);
  const EmailInput = isolate(Input);

  return {
    nameInput$: NameInput({DOM, props: props.nameProps$}).DOM,
    emailInput$: EmailInput({DOM, props: props.emailProps$}).DOM
  };
};
```

### ./src/pages/member/model.js

```javascript
import xs from 'xstream';

export const model = ({nameInput$, emailInput$}) => {
  return xs.combine(nameInput$, emailInput$);
};
```

### ./src/pages/member/view.js

```javascript
import {html} from 'snabbdom-jsx';

export const view = (state$) => {
  return state$
    .map(([name, email]) =>
      <div>
        {name}
        {email}
      </div>
  );
};
```

### ./src/pages/member/index.js

```javascript
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
```

- Execute the example:

 ```bash
 $ npm start
 ```
