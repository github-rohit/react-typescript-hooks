import * as React from 'react';
import { UseFormMethods, Controller } from 'react-hook-form';

import { InputField } from '../../types/FormInputField';
import InputMarkup from './InputViewMarkup';
import Input from './Input';
import Textarea from './Textarea';
import Select from './Select';
import Editor from './Editor';

type Register = UseFormMethods['register'];
type Control = UseFormMethods['control'];

interface Props {
  fields: InputField[];
  errors: any;
  register: Register;
  control?: Control;
}

interface SingleProps {
  field: InputField;
  errors?: any;
  register: Register;
}

function input(
  props: InputField,
  register: Register,
  control?: Control
): JSX.Element {
  const { type, name } = props;

  switch (type) {
    case 'textarea':
      return <Textarea register={register} {...props} />;
    case 'select':
      return <Select register={register} {...props} />;
    case 'tinymce':
      return (
        <Controller
          control={control}
          name={name}
          render={({ onChange, value }) => {
            return <Editor onChange={onChange} value={value} {...props} />;
          }}
        />
      );
    default:
      return <Input register={register} {...props} />;
  }
}

export const SingleFormInput: React.FC<SingleProps> = ({ field, register }) => {
  return input(field as InputField, register);
};

const FromInputs: React.FC<Props> = ({ fields, errors, register, control }) => {
  return (
    <>
      {fields.map((field) => {
        const { name, label, helperText } = field;
        const error = errors[name];

        return (
          <InputMarkup
            key={name}
            label={label}
            name={name}
            error={error}
            helperText={helperText}
          >
            {input(field, register, control)}
          </InputMarkup>
        );
      })}
    </>
  );
};

export default FromInputs;
