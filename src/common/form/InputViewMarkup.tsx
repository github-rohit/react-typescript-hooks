import * as React from 'react';
import { FieldError } from 'react-hook-form';

export interface InputViewProps {
  label: string;
  name: string;
  error?: FieldError | null;
  helperText?: string;
}

const inputView: React.SFC<InputViewProps> = (props) => {
  const { label, name, error, helperText, children } = props;
  return (
    <div className={`form-group ${error ? 'is-invalid' : ''}`}>
      <label htmlFor={name}>{label}</label>
      {children}
      {error && (
        <div className="invalid-feedback">{error && error.message}</div>
      )}
      <span className="form-text">{helperText}</span>
    </div>
  );
};

export default inputView;
