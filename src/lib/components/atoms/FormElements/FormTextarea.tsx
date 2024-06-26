import { useForm } from '@lib/hooks';
import { IFormikElement } from './FormTypes';
import { cn, isNA } from '@lib/util';
import { getIn } from 'formik';
import valueConverter from '@lib/util/helpers/valueConverter';

export type IFormTextarea = IFormikElement & {
  rows?: number;
};

export const FormTextarea: React.FC<IFormTextarea> = (props) => {
  const { rows = 4 } = props;
  // formik
  const formik = useForm();

  /** ----- Handlers----- */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.value = valueConverter(e.target.value, props?.convertOptions);
    props?.handleChange?.(e);
    formik?.handleChange?.(e);
  };

  const formikError = props?.error || formik?.getError?.(props.name);
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
        <textarea
          rows={rows}
          value={value}
          id={props.name}
          name={props.name}
          onChange={handleChange}
          disabled={disabled}
          placeholder={props.placeholder}
          onBlur={props?.handleBlur || formik?.handleBlur}
          className={cn(
            `form--input-field ${!isNA(formikError) && 'form--error'}`,
            props?.className,
          )}
        />

        {formikError && <span className='form--error-text'>{formikError}</span>}
      </label>
    </div>
  );
};
