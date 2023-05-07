import { FormRadio, IFormikElement } from '@lib/components';
import { IFormButton } from '@lib/components/atoms/FormElements/FormButton';
import { IFormCheckBox } from '@lib/components/atoms/FormElements/FormCheckbox';
import { IFormChips } from '@lib/components/atoms/FormElements/FormChips';
import { IFormDate } from '@lib/components/atoms/FormElements/FormDate';
import { IFormInput } from '@lib/components/atoms/FormElements/FormInput';
import { IFormMultiSelect } from '@lib/components/atoms/FormElements/FormMultiSelect';
import { IFormSelect } from '@lib/components/atoms/FormElements/FormSelect';
import { IFormTextarea } from '@lib/components/atoms/FormElements/FormTextarea';
import { FormikValues } from 'formik';

export type IFormItemType =
  | 'text'
  | 'number'
  | 'email'
  | 'date'
  | 'select'
  | 'radio'
  | 'multiselect'
  | 'checkbox'
  | 'chips'
  | 'textarea'
  | 'button'
  | string;

type IAdditionalProps =
  | Partial<IFormButton>
  | Partial<IFormCheckBox>
  | Partial<IFormChips>
  | Partial<IFormDate>
  | Partial<IFormInput>
  | Partial<IFormMultiSelect>
  | Partial<FormRadio>
  | Partial<IFormSelect>
  | Partial<IFormTextarea>;

export type IFormItem<V extends FormikValues, P> = IFormikElement & {
  name: keyof V;
  type: IFormItemType;
  additionalProps?: IAdditionalProps;
  disabledWhen?: (values: V, props: P) => boolean;
  hiddenWhen?: (values: V, props: P) => boolean;
};

export type IFormRow<V extends FormikValues, P> = {
  id: string | number;
  items: IFormItem<V, P>[];

  //optional
  title?: string;
  subtitle?: string;
  hiddenWhen?: (values: V, props: P) => boolean;
};

export type IFormJSON<V extends FormikValues, P = Record<string, any>> = IFormRow<V, P>[];
