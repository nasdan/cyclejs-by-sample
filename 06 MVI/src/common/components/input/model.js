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
