import { IFormikElement } from './FormTypes';
import { isNA } from '@lib/util';
import { useFormikContext } from 'formik';
import { getFormikError } from '@lib/util/helpers/formikHelpers';

export type IFormInput = IFormikElement & { type?: string; uppercase?: boolean };

export const FormInput: React.FC<IFormInput> = (props) => {
  // formik
  const formik = useFormikContext();

  /** ----- Handlers----- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props?.uppercase) e.target.value = e.target.value.toUpperCase();

    props?.handleChange?.(e);
    formik?.handleChange?.(e);
  };

  const formikError = props?.error || getFormikError(formik, props.name);
  const value = props.value || (formik?.values as any)?.[props?.name] || '';

  // ----- Render -----
  return (
    <div className='form--input'>
      <label htmlFor={props.name} className='form--input-wrapper'>
        <div className={`form--label ${!isNA(formikError) && 'form--label-error'}`}>
          {props?.label}
          {props.required && <b className='form--required-icon'>*</b>}
        </div>
        <input
          value={value}
          id={props.name}
          name={props.name}
          onChange={handleChange}
          type={props.type || 'text'}
          disabled={props.disabled}
          placeholder={props.placeholder}
          onBlur={props?.handleBlur || formik?.handleBlur}
          className={`form--input-field ${!isNA(formikError) && 'form--error'}`}
        />
        {formikError && <span className='form--error-text'>{formikError}</span>}
      </label>
    </div>
  );
};
