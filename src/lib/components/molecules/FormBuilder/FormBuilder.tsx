import { FormikValues, useFormikContext } from 'formik';
import { IFormRow } from './types';
import { FormRow } from './FormRow';
import { Button } from '@lib/components/atoms/Button';
import { memo } from 'react';

export type FormJSON<V extends FormikValues> = IFormRow<V, IFormBuilderProps<V>>[];
export type IProps<V extends FormikValues> = IFormBuilderProps<V>;

export type IFormBuilderProps<V extends FormikValues> = {
  formJSON: FormJSON<V>;
  buttonName?: string;
  mode?: 'VIEW' | 'EDIT' | 'CREATE' | 'CLONE';
};

export const FormBuilder = memo(<V extends FormikValues>(props: IProps<V>) => {
  // destructure props
  const { formJSON, buttonName, mode } = props;
  const { isSubmitting } = useFormikContext<V>();

  return (
    <div className='form--row'>
      {/* rendering each row */}
      {formJSON.map((row: any) => (
        <FormRow {...row} {...props} key={row.id} />
      ))}
      {/* button */}
      {mode !== 'VIEW' && (
        <Button type='submit' disabled={isSubmitting} cs='mt-5'>
          {isSubmitting ? 'Submitting...' : buttonName || 'Continue'}
        </Button>
      )}
    </div>
  );
});
