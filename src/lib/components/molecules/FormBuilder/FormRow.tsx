import { FormikValues } from 'formik';
import { IProps } from './FormBuilder';
import { IFormItem, IFormRow } from './types';
import { isNA } from '@lib/util';
import FormItem from './FormItem';
import { memo } from 'react';

const FormRow = <V extends FormikValues>(props: IFormRow<V, IProps<V>> & IProps<V>) => {
  const { values, hiddenWhen, title, subtitle, items } = props || {};

  // hide if row is hidden
  const isRowHidden = hiddenWhen?.(values, props);
  if (isRowHidden) return null;

  return (
    <section className='form--section'>
      {!isNA(title) && <h2 className='form--title'>{title}</h2>}
      {!isNA(subtitle) && <p className=' text-gray-500 text-sm mt-0 leading-tight'>{subtitle}</p>}
      <div className='form--container'>
        {items?.map((item: IFormItem<V, IProps<V>>, i) => (
          <FormItem key={i} {...item} {...props} />
        ))}
      </div>
    </section>
  );
};

export default memo(FormRow);
