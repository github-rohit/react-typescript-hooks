import * as React from 'react';
import { InputField } from '../../types/FormInputField';

const select: React.SFC<InputField> = ({
  register,
  options,
  helperText,
  classess = '',
  value,
  ...props
}) => {
  let selectValue: string;

  if (Array.isArray(value)) {
    [selectValue] = value;
  } else {
    selectValue = value;
  }

  return (
    <select
      ref={register}
      className={`form-control ${classess}`}
      value={selectValue}
      {...props}
    >
      <option />
      {options?.map(({ _id, category }) => {
        return (
          <option key={_id} value={category}>
            {category}
          </option>
        );
      })}
    </select>
  );
};

export default select;
