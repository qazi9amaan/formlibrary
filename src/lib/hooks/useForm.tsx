/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormikContext, FormikContextType, getIn } from 'formik';
import { useCallback } from 'react';
import { MODE } from '@lib/common';

export type useFormReturn<Values extends Record<string, any>> = FormikContextType<Values> & {
  mode: MODE;
  setFieldValueAndTouch: (field: string, value: any) => void;
  getError: (field: string) => string | undefined;
  hasError: (field: string) => boolean;
  getDisabled: (field: string) => boolean;
};

export const useForm = <V extends Record<string, any>>(): useFormReturn<V> => {
  const { disabler, mode, ...formik }: any = useFormikContext<V>();

  const setFieldValueAndTouch = useCallback(
    (field: string, value: any, touch = true) => {
      formik.setFieldValue(field, value);
      formik.setFieldTouched(field, touch);
    },
    [formik],
  );

  const getError = useCallback(
    (field: string) => {
      const hasError = getIn(formik.errors, field);
      const isTouched = getIn(formik.touched, field);

      if (hasError && isTouched) {
        return getIn(formik.errors, field);
      }
      return undefined;
    },
    [formik.errors, formik.touched],
  );

  const hasError = useCallback(
    (field: string) => {
      return getIn(formik.errors, field)?.length > 0;
    },
    [formik.errors],
  );

  const getDisabled = useCallback(
    (field: string) => disabler?.(field, formik.values, mode) || false,
    [disabler, formik.values, mode],
  );

  return {
    ...formik,
    getError,
    hasError,
    getDisabled,
    mode,
    setFieldValueAndTouch,
  };
};
