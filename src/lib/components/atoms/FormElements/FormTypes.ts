import { IConvertOptions } from '@lib/util/helpers/valueConverter';

export interface IFormikElement {
  //required
  name: string;

  //formik
  value?: any;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  handleBlur?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
  error?: string;

  //default
  label?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;

  convertOptions?: IConvertOptions;
}

export type IFormOption = {
  value: string | number | boolean | null | undefined;
  label: string;
  disabled?: boolean;
};
