import type { FormikHelpers, FormikProps, FormikValues } from 'formik';
import { getIn } from 'formik';
import { Formik } from 'formik';

/** Formik helpers + { props }*/
type FormikBag<P, V> = { props: P } & FormikHelpers<V>;

/*** withFormik() configuration options.*/
export interface IConfig<Props, Values extends FormikValues> {
  initialValues?: Values;
  handleSubmit?: (values: Values, formikBag: FormikBag<Props, Values>) => void;
  mapPropsToValues?: (props: Props) => Partial<Values> & Record<string, any>;
  validationSchema?: any;
  mode?: 'VIEW' | 'EDIT' | 'CREATE' | 'CLONE';
}

/*** This is the type of props that wrapped Component will receive */
export type IFormikComponent<V extends FormikValues, P = Record<string, any>> = P &
  IConfig<P, V> &
  FormikProps<V>;

/*** This is the type of props that parent Component will have */
export type IFormikParent<V extends FormikValues, P = Record<string, any>> = P & IConfig<P, V>;

/**
 * A public higher-order component
 * to access the imperative API
 * @type - [V => Values,P => Props (to be passed to wrapped component))]
 *
 * @usage
 * 1. withForm<Values,Props>(config)(Component)
 */
const withForm = <V extends FormikValues, P = Record<string, any>>(config: IConfig<P, V>) => {
  return (Component: any) => {
    //wrapper
    return function WrappedComponent(props: P & IConfig<P, V>) {
      //
      const initValFromFn = config?.mapPropsToValues?.(props);
      const initialValues = config?.initialValues || props?.initialValues;
      const validation = config?.validationSchema || props?.validationSchema;
      //
      const onSubmit = (values: V, helpers?: FormikHelpers<V>) => {
        config?.handleSubmit?.(values, { ...helpers, props } as FormikBag<P, V>);
        props?.handleSubmit?.(values, { ...helpers, props } as FormikBag<P, V>);
      };
      //  return component
      return (
        <Formik
          initialValues={{ ...initialValues, ...initValFromFn } as V}
          validationSchema={validation}
          onSubmit={onSubmit as any}
        >
          {(formikProps: FormikProps<V>) => {
            const getError = (name: string) => {
              return (
                getIn(formikProps.errors, name) &&
                getIn(formikProps.touched, name) &&
                getIn(formikProps.errors, name)
              );
            };
            return (
              <form onSubmit={formikProps.handleSubmit}>
                <Component {...props} {...formikProps} getError={getError} />
              </form>
            );
          }}
        </Formik>
      );
    };
  };
};

export default withForm;
export { withForm };
