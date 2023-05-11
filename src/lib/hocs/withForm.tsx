import { Form, FormikHelpers, FormikValues } from 'formik';
import { Formik } from 'formik';
import React, { useMemo } from 'react';

/** Formik helpers + { props }*/
type FormikBag<P, V> = { props: P } & FormikHelpers<V>;

/*** withFormik() configuration options.*/
export interface IConfig<Props, Values extends FormikValues> {
  initialValues?: Values;
  handleSubmit?: (values: Values, formikBag: FormikBag<Props, Values>) => void;
  mapPropsToValues?: (props: Props) => Partial<Values> & any;
  validationSchema?: unknown;
  mode?: 'VIEW' | 'EDIT' | 'CREATE' | 'CLONE';
}

/*** This is the type of props that parent Component will have */
export type IFormikParent<V extends FormikValues, P = Record<string, unknown>> = P & IConfig<P, V>;

/**
 * A public higher-order component
 * to access the imperative API
 * @type - [V => Values,P => Props (to be passed to wrapped component))]
 *
 * @usage
 * 1. withForm<Values,Props>(config)(Component)
 */
const withForm = <V extends FormikValues, P = Record<string, unknown>>(config: IConfig<P, V>) => {
  return (Component: React.ElementType) => {
    //wrapper
    return function WrappedComponent(props: P & IConfig<P, V>) {
      //
      const initValFromFn = useMemo(
        () => config?.mapPropsToValues?.(props),
        [JSON.stringify(props || {})],
      );
      const initialValues = config?.initialValues || props?.initialValues;
      const validation = config?.validationSchema || props?.validationSchema;
      //
      const onSubmit = (values: V, helpers?: FormikHelpers<V>) => {
        config?.handleSubmit?.(values, { ...helpers, props } as FormikBag<P, V>);
        props?.handleSubmit?.(values, { ...helpers, props } as FormikBag<P, V>);
      };
      //  return component

      const MemoComponent = React.useMemo(() => Component, [Component]);

      return (
        <Formik
          initialValues={{ ...initialValues, ...initValFromFn } as V}
          validationSchema={validation}
          onSubmit={onSubmit}
        >
          <Form>
            <MemoComponent {...props} />
          </Form>
        </Formik>
      );
    };
  };
};

export default withForm;
export { withForm };
