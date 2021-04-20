import * as React from 'react';
import { InputField } from '../../types/FormInputField';

const textarea: React.SFC<InputField> = (props) => {
  const { register, helperText, classess = '', ...rests } = props;
  return (
    <textarea
      ref={register}
      className={`form-control ${classess}`}
      {...rests}
    />
  );
};

export default textarea;
