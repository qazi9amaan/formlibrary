import { IFormikElement } from './FormTypes';
import { isNA } from '@lib/util';
import { AutoLayout } from '@lib/components/atoms/Layouts/AutoLayout';
import { useForm } from '@lib/hooks';
import { getIn } from 'formik';

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
    name: fieldName,
    value,
    error,
    label,
    required,
    subLabel,
    options,
    placeholder,
    handleBlur,
  } = props;

  // formik
  const formik = useForm();
  const { values, handleBlur: formikHandleBlur } = formik || {};

  const finalValue = value || getIn(values, fieldName) || [];
  const formikError = error || formik.getError?.(fieldName);

  /** ----- Handlers----- */
  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //
    const { checked, value: optValue, name } = e.target;

    if (checked) {
      props?.setFieldValue?.(name, [...finalValue, optValue]);
      formik?.setFieldValue?.(name, [...finalValue, optValue]);
      return;
    }

    const uncheckedValue = finalValue.filter((v: string) => v !== optValue);
    props?.setFieldValue?.(name, uncheckedValue);
    formik?.setFieldValue?.(name, uncheckedValue);
  };

  const disabled = props.disabled || formik?.getDisabled?.(fieldName);

  return (
    <div className='form--input'>
      <label htmlFor={fieldName} className={`form--input-wrapper`}>
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
          {options?.map((option: ICheckBoxOption, index: number) => {
            const key = `${fieldName}/${option.value}/${index}`;

            return (
              <div key={key} className='sm:flex-none'>
                <input
                  type='checkbox'
                  value={option.value}
                  name={fieldName}
                  className='peer hidden'
                  onChange={handleCustomChange}
                  id={key}
                  disabled={option.disabled || disabled}
                  placeholder={placeholder}
                  checked={finalValue.includes(option.value)}
                  onBlur={handleBlur || formikHandleBlur}
                />
                <label
                  className={`form--chip ${!isNA(formikError) && 'form--chip--error'}`}
                  htmlFor={key}
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
