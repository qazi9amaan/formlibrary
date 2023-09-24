import { useForm } from '@lib/hooks';
import { IFormOption, IFormikElement } from './FormTypes';
import { isNA } from '@lib/util';
import { getIn } from 'formik';
import valueConverter from '@lib/util/helpers/valueConverter';

export type IFormMultiSelect = IFormikElement & {
  options: IFormOption[];
  setFieldValue?: (field: string, value: any[], shouldValidate?: boolean | undefined) => void;
  showEmptyOption?: boolean;
};

export const FormMultiSelect = (props: IFormMultiSelect) => {
  // formik
  const formik = useForm();

  const formikError = props?.error || formik.getError?.(props.name);
  const value = props.value || getIn(formik?.values, props.name);

  /** ----- Handlers----- */
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) =>
      valueConverter(option.value, props?.convertOptions),
    );
    props?.setFieldValue?.(props.name, selectedOptions);
    formik?.setFieldValue?.(props.name, selectedOptions);
  };

  const disabled = props.disabled || formik?.getDisabled?.(props.name);

  return (
    <div className='form--input'>
      <label htmlFor={props.name} className='form--input-wrapper'>
        <div className={`form--label ${!isNA(formikError) && 'form--label-error'}`}>
          {props?.label}
          {props.required && <b className='form--required-icon'>*</b>}
        </div>

        <select
          multiple
          value={value}
          id={props.name}
          name={props.name}
          onChange={handleChange}
          disabled={disabled}
          onBlur={props?.handleBlur || formik?.handleBlur}
          className={`form--input-field form-select ${!isNA(formikError) && 'form--error'}`}
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
