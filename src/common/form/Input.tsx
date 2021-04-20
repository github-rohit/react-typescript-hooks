import * as React from 'react';
import { InputField } from '../../types/FormInputField';

const TEXT = 'text';
const EMAIL = 'emal';
const PASSWORD = 'password';

interface InputProps extends InputField {
  type: typeof TEXT | typeof EMAIL | typeof PASSWORD | string;
}

const input: React.SFC<InputProps> = (props) => {
  const { register, helperText, classess = '', ...rests } = props;
  return (
    <input ref={register} className={`form-control ${classess}`} {...rests} />
  );
};

export default input;
