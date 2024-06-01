import { useForm } from '@lib/hooks';
import { IFormOption, IFormikElement } from './FormTypes';
import { cn, isNA } from '@lib/util';
import { getIn } from 'formik';
import valueConverter from '@lib/util/helpers/valueConverter';

export type IFormSelect = IFormikElement & {
  options: IFormOption[];
  showEmptyOption?: boolean;
};

export const FormSelect = (props: IFormSelect) => {
  // formik
  const formik = useForm();

  const formikError = props?.error || formik.getError?.(props.name);
  const value = props.value || getIn(formik?.values, props.name);
  const disabled = props.disabled || formik?.getDisabled?.(props.name);

  /** ----- Handlers----- */
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.value = valueConverter(e.target.value, props?.convertOptions);
    props?.handleChange?.(e);
    formik?.handleChange?.(e);
  };

  return (
    <div className='form--input'>
      <label htmlFor={props.name} className='form--input-wrapper'>
        <div className={`form--label ${!isNA(formikError) && 'form--label-error'}`}>
          {props?.label}
          {props.required && <b className='form--required-icon'>*</b>}
        </div>

        <select
          value={value}
          id={props.name}
          name={props.name}
          onChange={handleChange}
          disabled={disabled}
          onBlur={props?.handleBlur || formik?.handleBlur}
          className={cn(
            `form--input-field ${!isNA(formikError) && 'form--error'}`,
            props?.className,
          )}
        >
          {props?.showEmptyOption && <option value=''>Select</option>}
          {props?.options?.map((option: any) => (
            <option key={option.value} {...option}>
              {option.label}
            </option>
          ))}
        </select>
        {formikError && <span className='form--error-text'>{formikError}</span>}
      </label>
    </div>
  );
};
