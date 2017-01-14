import xs from 'xstream';

export const model = ({nameInput$, emailInput$}) => {
  return xs.combine(nameInput$, emailInput$);
};
