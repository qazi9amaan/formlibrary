import { FormikValues, useFormikContext } from 'formik';
import { IProps } from './FormBuilder';
import { IFormRow } from './types';
import { isNA } from '@lib/util';
import { FormItem } from './FormItem';
import { memo } from 'react';

const FormRowComponent = <V extends FormikValues>(props: IFormRow<V, IProps<V>> & IProps<V>) => {
  const { hiddenWhen, title, subtitle, items } = props || {};

  const { values } = useFormikContext<V>();

  // hide if row is hidden
  const isRowHidden = hiddenWhen?.(values, props);
  if (isRowHidden) return null;

  return (
    <section className='form--section'>
      {!isNA(title) && <h2 className='form--title'>{title}</h2>}
      {!isNA(subtitle) && <p className=' text-gray-500 text-sm mt-0 leading-tight'>{subtitle}</p>}
      <div className='form--container'>
        {items?.map((item: any, i) => (
          <FormItem key={i} {...item} {...props} />
        ))}
      </div>
    </section>
  );
};

export const FormRow = memo(FormRowComponent);
