import { withForm } from '@lib/hocs';
import { Row } from '../atoms/Layouts';
import { FormInput } from '../atoms/FormElements';
import { Button } from '../atoms/Button';
import Panel from '../atoms/Panel';
import { Header } from '../atoms/Header';
import * as Yup from 'yup';
import { useForm } from '@lib/hooks';

type ILogin = {
  username: string;
  password: string;
};

const LoginWrappedForm = () => {
  const { isSubmitting } = useForm<ILogin>();
  return (
    <Panel cs='max-w-lg mx-auto shadow-sm'>
      <Row>
        <Header title='Sign In' subtitle='Please enter your username' />
        <FormInput label='Username' placeholder='iamuser' name='username' />
        <FormInput label='Password' placeholder='*****' name='password' type='password' />
        <Button
          cs='mt-2'
          type='submit'
          label={isSubmitting ? 'Signing in...' : 'Sign In'}
          disabled={isSubmitting}
        />
      </Row>
    </Panel>
  );
};

const LoginForm = withForm<ILogin>({
  initialValues: {
    username: '',
    password: '',
  },
  mapPropsToValues: (props) => {
    return { username: props.hello };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  }),
  mode: 'CREATE',
})(LoginWrappedForm);

export { LoginForm };
