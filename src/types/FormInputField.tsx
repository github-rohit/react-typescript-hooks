import { UseFormMethods } from 'react-hook-form';

export interface InputField {
  label: string;
  name: string;
  value?: any;
  type: string;
  onChange?: any;
  autoFocus?: boolean;
  error?: string | null;
  helperText?: string;
  placeholder?: string;
  classess?: string;
  onKeyDown?: any;
  onKeyUp?: any;
  register?: UseFormMethods['register'];
  options?: {
    [key: string]: any;
  }[];
}
