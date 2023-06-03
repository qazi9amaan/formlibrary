import { IFormikElement } from './FormTypes';
import { isNA } from '@lib/util';
import { useForm } from '@lib/hooks';
import { getIn } from 'formik';

export type ICheckBoxOption = {
  label: string;
  subLabel?: string;
  value: string;
  disabled?: boolean;
};

export type IFormCheckBox = IFormikElement & {
  options: ICheckBoxOption[];
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
  horizontalOnSm?: boolean;
};

export const FormCheckbox = (props: IFormCheckBox) => {
  // props
  const {
    name,
    value,
    error,
    horizontalOnSm,
    label,
    required,
    options,
    placeholder,
    disabled,
    handleBlur,
  } = props;

  // formik
  const formik = useForm();
  const { values, handleBlur: formikHandleBlur } = formik || {};

  const finalValue = value || getIn(values, name) || [];
  const formikError = error || formik.getError?.(name);

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
        <div className={`form--label mb-2 ${!isNA(formikError) && 'form--label-error'}`}>
          {label}
          {required && <b className='form--required-icon'>*</b>}
        </div>

        <>
          <div
            className={`${
              horizontalOnSm
                ? 'space-y-2 flex-col '
                : 'sm:space-y-0 sm:!flex-row flex items-baseline'
            }`}
          >
            {options.map((option: ICheckBoxOption) => {
              const hasSubtitle = isNA(option.subLabel);
              return (
                <div
                  style={{ alignItems: !hasSubtitle ? 'flex-start' : 'center' }}
                  key={`${option.value}-${option.label}`}
                  className={`form--check-box ${!isNA(formikError) && 'form--check-box--error'}`}
                >
                  <input
                    type='checkbox'
                    value={option.value}
                    name={name}
                    onChange={handleChange}
                    id={`${option.value}-${option.label}`}
                    disabled={option.disabled || disabled}
                    placeholder={placeholder}
                    checked={finalValue.includes(option.value)}
                    onBlur={handleBlur || formikHandleBlur}
                  />
                  <label
                    className='form--check-box-text'
                    style={{ marginTop: !hasSubtitle ? '-.3em' : '0' }}
                    htmlFor={`${option.value}-${option.label}`}
                  >
                    <span>{option.label}</span>
                    {!hasSubtitle && <span className='sub-label'>{option.subLabel}</span>}
                  </label>
                </div>
              );
            })}
          </div>

          {formikError && <span className='form--error-text'>{formikError}</span>}
        </>
      </label>
    </div>
  );
};

FormCheckbox.defaultProps = {
  horizontalOnSm: false,
  required: false,
  disabled: false,
  placeholder: '',
  handleBlur: undefined,
  error: undefined,
  value: undefined,
  setFieldValue: undefined,
};
