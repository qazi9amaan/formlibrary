import React from 'react';
import { useFormikContext } from 'formik';
import { IFormikElement } from './FormTypes';
import { getFormikError } from '@lib/util/helpers/formikHelpers';
import { isNA } from '@lib/util';
import { AutoLayout } from '@lib/components/atoms/Layouts/AutoLayout';

export type IRadioOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type FormRadio = IFormikElement & {
  options: IRadioOption[];
  horizontal?: boolean;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
};

export const FormRadio: React.FC<FormRadio> = (props) => {
  // formik
  const formik = useFormikContext();

  /** ----- Handlers----- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props?.setFieldValue?.(props.name, e.target.value);
    formik?.setFieldValue?.(props.name, e.target.value);
  };

  const formikError = props?.error || getFormikError(formik, props.name);
  const value = props.value || (formik?.values as any)?.[props?.name] || '';

  return (
    <div className='form--input'>
      <label
        htmlFor={props.name}
        className={`${props.horizontal && 'form-horizontal'} form--input-wrapper `}
      >
        <div className={`form--radio-btn-label`}>
          {props?.label}
          {props.required && <b className='form--required-icon'>*</b>}
        </div>

        <div>
          <AutoLayout p='' rowGap={0.5}>
            {props.options.map((option: IRadioOption, i: number) => (
              <div key={i} className='w-full sm:flex-1 sm:w-auto md:flex-none  '>
                <input
                  type='radio'
                  value={option.value}
                  name={props.name}
                  className='peer hidden'
                  onChange={handleChange}
                  id={`${option.value}-${option.label}`}
                  disabled={option.disabled || props.disabled}
                  placeholder={props.placeholder}
                  checked={value === option.value}
                  onBlur={props?.handleBlur || formik?.handleBlur}
                />
                <label
                  htmlFor={`${option.value}-${option.label}`}
                  className={`form--radio-btn ${!isNA(formikError) && 'form--radio-btn--error'}`}
                >
                  <span className='circle'></span>
                  {option.label}
                </label>
              </div>
            ))}
          </AutoLayout>

          {formikError && <span className='form--error-text'>{formikError}</span>}
        </div>
      </label>
    </div>
  );
};