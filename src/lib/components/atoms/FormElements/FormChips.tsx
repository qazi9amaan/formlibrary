import { IFormikElement } from './FormTypes';
import { useFormikContext } from 'formik';
import { getFormikError } from '@lib/util/helpers/formikHelpers';
import { isNA } from '@lib/util';
import { AutoLayout } from '@lib/components/atoms/Layouts/AutoLayout';

type ICheckBoxOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type IFormChips = IFormikElement & {
  subLabel?: string;
  options: ICheckBoxOption[];
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
};

export const FormChips = (props: IFormChips) => {
  // props
  const {
    name,
    value,
    error,
    label,
    required,
    subLabel,
    options,
    placeholder,
    disabled,
    handleBlur,
  } = props;

  // formik
  const formik = useFormikContext<any>();
  const { values: formikValues, handleBlur: formikHandleBlur } = formik || {};

  const finalValue = value || formikValues?.[name] || [];
  const formikError = error || getFormikError(formik, name);

  /** ----- Handlers----- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //
    const { checked, value: optValue } = e.target;
    const { name, setFieldValue } = props;

    if (checked) {
      setFieldValue?.(name, [...finalValue, optValue]);
      formik?.setFieldValue?.(name, [...finalValue, optValue]);
      return;
    }

    const uncheckedValue = finalValue.filter((v: string) => v !== optValue);
    setFieldValue?.(name, uncheckedValue);
    formik?.setFieldValue?.(name, uncheckedValue);
  };

  return (
    <div className='form--input'>
      <label htmlFor={name} className={`form--input-wrapper`}>
        <div className={`form--label !mb-2 ${!isNA(formikError) && 'form--label-error'}`}>
          <p className='!mb-0 leading-tight'>
            {label}
            {required && <b className='form--required-icon'>*</b>}
          </p>
          {!isNA(subLabel) && (
            <small className='mt-0 leading-tight font-normal text-gray-500'>{subLabel}</small>
          )}
        </div>

        <AutoLayout p='0'>
          {options.map((option: ICheckBoxOption) => {
            return (
              <div key={`${option.value}-${option.label}`} className='sm:flex-none'>
                <input
                  type='checkbox'
                  value={option.value}
                  name={name}
                  className='peer hidden'
                  onChange={handleChange}
                  id={`${option.value}-${option.label}`}
                  disabled={option.disabled || disabled}
                  placeholder={placeholder}
                  checked={finalValue.includes(option.value)}
                  onBlur={handleBlur || formikHandleBlur}
                />
                <label
                  className={`form--chip ${!isNA(formikError) && 'form--chip--error'}`}
                  htmlFor={`${option.value}-${option.label}`}
                >
                  <span>{option.label}</span>
                </label>
              </div>
            );
          })}
        </AutoLayout>
        {formikError && <span className='form--error-text mt-1'>{formikError}</span>}
      </label>
    </div>
  );
};

FormChips.defaultProps = {
  required: false,
  disabled: false,
  placeholder: '',
  handleBlur: undefined,
  error: undefined,
  value: undefined,
  setFieldValue: undefined,
};
