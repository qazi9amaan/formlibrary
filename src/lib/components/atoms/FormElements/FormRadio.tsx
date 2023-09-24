import React from 'react';
import { IFormikElement } from './FormTypes';
import { isNA } from '@lib/util';
import { AutoLayout } from '@lib/components/atoms/Layouts/AutoLayout';
import { useForm } from '@lib/hooks';
import { getIn } from 'formik';
import valueConverter from '@lib/util/helpers/valueConverter';

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
  const formik = useForm();

  /** ----- Handlers----- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = valueConverter(e.target.value, props.convertOptions);
    props?.setFieldValue?.(props.name, value);
    formik?.setFieldValue?.(props.name, value);
  };

  const formikError = props?.error || formik?.getError?.(props.name);
  const value = props.value || getIn(formik?.values, props.name);
  const disabled = props.disabled || formik?.getDisabled?.(props.name);

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
            {props.options.map((option: IRadioOption, i: number) => {
              const key = `${props.name}/${option.value}/${i}`;

              return (
                <div key={key} className='w-full sm:flex-1 sm:w-auto md:flex-none  '>
                  <input
                    type='radio'
                    value={option.value}
                    name={props.name}
                    className='peer hidden'
                    onChange={handleChange}
                    id={key}
                    disabled={option.disabled || disabled}
                    placeholder={props.placeholder}
                    checked={value === option.value}
                    onBlur={props?.handleBlur || formik?.handleBlur}
                  />
                  <label
                    htmlFor={key}
                    className={`form--radio-btn ${!isNA(formikError) && 'form--radio-btn--error'}`}
                  >
                    <span className='circle'></span>
                    {option.label}
                  </label>
                </div>
              );
            })}
          </AutoLayout>

          {formikError && <span className='form--error-text'>{formikError}</span>}
        </div>
      </label>
    </div>
  );
};
