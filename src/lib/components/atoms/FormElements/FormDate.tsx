import { IFormikElement } from './FormTypes';
import { isNA } from '@lib/util';
import { useFormikContext } from 'formik';
import { getFormikError } from '@lib/util/helpers/formikHelpers';

export type IFormDate = IFormikElement & {
  setFieldValue?: (field: string, value: Date, shouldValidate?: boolean) => void;
  minDate?: Date;
  maxDate?: Date;
  minToday?: boolean;
};

export const FormDate: React.FC<IFormDate> = (props) => {
  // formik
  const formik = useFormikContext();

  /** ----- Handlers----- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props?.setFieldValue?.(props.name, e.target.valueAsDate);
    formik?.setFieldValue?.(props.name, e.target.valueAsDate);
  };

  const formikError = props?.error || getFormikError(formik, props.name);
  const value = props?.value || (formik?.values as any)?.[props?.name] || new Date();

  const minDate = props?.minToday ? new Date() : props?.minDate;

  // ----- Render -----
  return (
    <div className='form--input'>
      <label htmlFor={props.name} className='form--input-wrapper'>
        <div className={`form--label ${!isNA(formikError) && 'form--label-error'}`}>
          {props?.label}
          {props.required && <b className='form--required-icon'>*</b>}
        </div>
        <input
          type='date'
          value={value?.toLocaleDateString('fr-ca')}
          min={minDate?.toLocaleDateString('fr-ca')}
          max={props?.maxDate?.toLocaleDateString('fr-ca')}
          id={props.name}
          name={props.name}
          onChange={handleChange}
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

export default Date;
