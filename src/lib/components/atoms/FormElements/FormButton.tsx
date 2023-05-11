import { useForm } from '@lib/hooks';
import { IFormikElement } from './FormTypes';
import { isNA } from '@lib/util';

export type IFormButton = IFormikElement & {
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, setFieldValue?: any) => void;
};

export const FormButton = (props: IFormButton) => {
  // formik
  const formik = useForm();

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props?.onClick && props?.onClick?.(e, props?.setFieldValue || formik?.setFieldValue);
  };

  const formikError = props?.error || formik.getError?.(props.name);

  return (
    <div className='form--input'>
      <label htmlFor={props.name} className='form--input-wrapper'>
        <button
          id={props.name}
          onClick={handleOnClick}
          disabled={props.disabled}
          className={`form--input-button ${!isNA(formikError) && 'form--input-button-error'}`}
          name={props.name}
          type={props.type}
        >
          {props?.label}
          {props?.required && <b className='text-red-600 ml-1'>*</b>}
        </button>
        {formikError && <span className='form--error-text'>{formikError}</span>}
      </label>
    </div>
  );
};
