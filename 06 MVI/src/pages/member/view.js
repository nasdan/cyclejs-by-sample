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
