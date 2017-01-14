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
