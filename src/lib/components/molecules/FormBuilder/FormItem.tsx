import { FormikValues } from 'formik';
import { IFormItem, IFormItemType } from './types';
import { IProps } from './FormBuilder';
import {
  FormButton,
  FormCheckbox,
  FormChips,
  FormDate,
  FormInput,
  FormMultiSelect,
  FormRadio,
  FormSelect,
} from '@lib/components/atoms/FormElements';
import { isNA } from '@lib/util';
import { memo } from 'react';

type ComponentMappingType = {
  [key in IFormItemType]: any;
};

const componentMapping: ComponentMappingType = {
  date: FormDate,
  select: FormSelect,
  checkbox: FormCheckbox,
  chips: FormChips,
  multiselect: FormMultiSelect,
  radio: FormRadio,
  button: FormButton,
  input: FormInput,
};

const FormItem = <V extends FormikValues>(props: IFormItem<V, IProps<V>> & IProps<V>) => {
  const { values, hiddenWhen, disabledWhen, additionalProps, label, type } = props || {};

  // hide if item is hidden
  const isHidden = hiddenWhen?.(values, props);
  const disabled = isNA(disabledWhen) ? props.disabled : disabledWhen?.(values, props);

  if (isHidden) return null;

  const Component = componentMapping[type] || componentMapping.input;
  return (
    <Component
      {...props}
      {...(additionalProps as any)}
      label={label}
      type={type as any}
      disabled={disabled}
    />
  );
};

export default memo(FormItem);
