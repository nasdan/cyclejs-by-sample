export const intent = ({DOM}) => ({
  onChange$: DOM.select('.form-control').events('input').map(e => e.target.value)
});
