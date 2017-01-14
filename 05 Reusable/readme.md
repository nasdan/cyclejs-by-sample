# 05 Reusable

In this sample we will reuse CycleJS components.

We will take a start up point sample _04 JSX_

Summary steps:
- Install babel-plugin-transform--object-rest-spread to use spread operator.
- Using JSX.

## Steps to build it

- Let's install babel-plugin-transform--object-rest-spread:

````
npm install babel-plugin-transform--object-rest-spread --save-dev
````

- Let's configure .babelrc

```javascript
{
  ...
  "plugins": [
    ...
    "transform-object-rest-spread"
  ]
}
```

- Now, we are going to create a Input component (input with validations) to reuse in other components:

### ./src/common/components/input.js

```javascript
import xs from 'xstream';
import {html} from 'snabbdom-jsx';

export const Input = (sources) => {
  const props$ = sources.props;

  const onChange$ = sources.DOM.select('.form-control').events('input');

  const validation$ = xs.combine(onChange$, props$)
    .map(([e, props]) => props.validationFn(e.target.value))
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
```

- Create required validation to validate inputs:

### ./src/common/validations/required.js

```javascript
export const required = (value) => {
  return value &&
    value.length > 0
}
```

- Create `MemberPage` with two inputs (name and email):

### ./src/pages/member/index.js

```javascript
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

```

- Refactor `app.js` to use `memberPage.js`

### ./src/app.js

```javascript
...
import {MemberPage} from './pages/member';
...

export const App = (sources) => {
  const props$ = xs.of({
    tabName: 'Member'
  });

  ...

  const memberPage$ = MemberPage(childSources).DOM;

  const vtree$ = xs.combine(header$, memberPage$)
    .map(([header, memberPage]) =>
      <div className="container-fluid">
        {header}
        {memberPage}
      </div>
  );
```

- Execute the example:

 ```bash
 $ npm start
 ```
