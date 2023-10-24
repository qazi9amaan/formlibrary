import { useForm } from '@lib/hooks';
import { IFormikElement } from './FormTypes';
import { isNA } from '@lib/util';
import { getIn } from 'formik';
import valueConverter from '@lib/util/helpers/valueConverter';
import React, { useCallback } from 'react';

export type IFormInput = IFormikElement & {
  type?: string;
  uppercase?: boolean;
};

export const FormInput: React.FC<IFormInput> = (props) => {
  // formik
  const formik = useForm();
  const { handleChange: propsHandleChange } = props || {};
  const { handleChange: formikHandleChange } = formik || {};

  /** ----- Handlers----- */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = valueConverter(e.target.value, props?.convertOptions);
      if (props?.uppercase) e.target.value = e.target.value.toUpperCase();
      propsHandleChange?.(e);
      formikHandleChange?.(e);
    },
    [propsHandleChange, formikHandleChange],
  );

  const formikError = props?.error || formik.getError?.(props.name);
  const value = props.value || getIn(formik?.values, props.name) || '';
  const disabled = props.disabled || formik?.getDisabled?.(props.name);

  // ----- Render -----
  return (
    <div className='form--input'>
      <label htmlFor={props.name} className='form--input-wrapper'>
        <div className={`form--label ${!isNA(formikError) && 'form--label-error'}`}>
          {props?.label}
          {props.required && <b className='form--required-icon'>*</b>}
        </div>
        <input
          value={String(value)}
          id={props.name}
          name={props.name}
          onChange={handleChange}
          type={props.type || 'text'}
          disabled={disabled}
          placeholder={props.placeholder}
          onBlur={props?.handleBlur || formik?.handleBlur}
          className={`form--input-field ${!isNA(formikError) && 'form--error'}`}
        />
        {formikError && <span className='form--error-text'>{formikError}</span>}
      </label>
    </div>
  );
};
