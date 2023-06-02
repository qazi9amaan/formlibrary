/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';
import { MODE } from '@lib/common';

type O = Record<string, string | number | any>;

export const withForm =
  <V extends FormikValues, P = O>(config: IConfig<V>) =>
  (Component: React.ComponentType<any>) => {
    const FormikWrapper: React.FC<IFormikProps<V, P>> = (props) => {
      const { validationSchema, disabler } = config;
      const { initialValues, mode = MODE.CREATE, handleSubmit, ...rest } = props;

      const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, helpers) => handleSubmit?.(values, { ...helpers, props }),
        enableReinitialize: true,
      });

      return (
        <FormikProvider value={{ ...formik, disabler, mode } as any}>
          <Form>
            <Component {...rest} />
          </Form>
        </FormikProvider>
      );
    };

    return FormikWrapper;
  };

type FormikBag<P, V> = { props: P } & FormikHelpers<V>;

export type IConfig<Values extends FormikValues = O> = {
  validationSchema: any;
  disabler?: Disabler<Values>;
};

export type IFormikProps<Values extends FormikValues, Props = O> = Props & {
  initialValues: Values;
  handleSubmit?: (values: Values, formikBag: FormikBag<Props, Values>) => void;
  mode?: MODE;
};

export type IFormParent<V extends FormikValues, P = O> = IFormikProps<V, P>;
export type Disabler<V> = (key: keyof V, values?: V, mode?: MODE) => boolean;
