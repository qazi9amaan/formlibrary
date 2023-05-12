import { FormikBuilder } from '@lib/components/molecules/FormBuilder';
import { IReg, formJSON, initialValues, validationSchema } from './RegistrationForm.model';
import { FormikBag } from 'formik';
import { Header } from '@lib/components/atoms/Header';
import { Row } from '@lib/components/atoms/Layouts';
import Panel from '@lib/components/atoms/Panel';
import { MODE } from '@lib/common';

const RegistrationForm = () => {
  //
  const handleSubmit = (values: IReg, { setSubmitting }: FormikBag<any, IReg>) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <Panel cs='max-w-lg mx-auto shadow-sm'>
      <Row>
        <Header title='Sign up' subtitle='Lets get started' />
        <FormikBuilder
          mode={MODE.CREATE}
          formJSON={formJSON}
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        />
      </Row>
    </Panel>
  );
};

export default RegistrationForm;
