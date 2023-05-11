import { FormikValues, useFormikContext } from 'formik';
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
  [key in IFormItemType]: React.ElementType;
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

const FormItemComponent = <V extends FormikValues>(props: IFormItem<V, IProps<V>> & IProps<V>) => {
  const { hiddenWhen, disabledWhen, additionalProps, label, type } = props || {};

  const { values } = useFormikContext<V>();

  // hide if item is hidden
  const isHidden = hiddenWhen?.(values, props);
  const disabled = isNA(disabledWhen) ? props.disabled : disabledWhen?.(values, props);

  if (isHidden) return null;

  const Component: React.ElementType = componentMapping[type] || componentMapping.input;
  return (
    <Component {...props} {...additionalProps} label={label} type={type} disabled={disabled} />
  );
};

export const FormItem = memo(FormItemComponent);
