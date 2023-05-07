import { IFormJSON } from '@lib/components/molecules/FormBuilder';
import { IBuilderProps } from '@lib/components/molecules/FormBuilder/FormikBuilder';
import * as Yup from 'yup';

export type IReg = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export const initialValues: IReg = {
  email: '',
  password: '',
  confirmPassword: '',
};

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

export const formJSON: IFormJSON<IReg, IBuilderProps<IReg>> = [
  {
    id: 1,
    items: [
      {
        label: 'Email',
        name: 'email',
        type: 'email',
      },
    ],
  },
  {
    id: 2,
    items: [
      {
        label: 'Password',
        name: 'password',
        type: 'password',
      },
      {
        label: 'Confirm Password',
        name: 'confirmPassword',
        type: 'password',
      },
    ],
  },
];
