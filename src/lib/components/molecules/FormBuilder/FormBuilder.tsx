import { FormikValues } from 'formik';
import { IFormJSON } from './types';
import { IFormikComponent } from '@lib/hocs';
import FormRow from './FormRow';
import { Button } from '@lib/components/atoms/Button';

export type IFormBuilderProps<V extends FormikValues> = {
  formJSON: IFormJSON<V, IFormBuilderProps<V>>;
  buttonName?: string;
  mode?: 'VIEW' | 'EDIT' | 'CREATE' | 'CLONE';
};

export type IProps<V extends FormikValues> = IFormikComponent<V, IFormBuilderProps<V>>;

export const FormBuilder = <V extends FormikValues>(props: IProps<V>) => {
  // destructure props
  const { formJSON, buttonName, mode, isSubmitting } = props;

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
};
