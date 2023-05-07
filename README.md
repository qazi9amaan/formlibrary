# 🎨✨ @qazi9amaan/formlibrary

A delightful npm package that provides you with Tailwind CSS styled UI elements 🌟, fully compatible with Formik 📝. Unleash your creativity with a variety of components and utilities to design stunning dashboards, including tables, forms, and more! Get ready to level up your web projects! 🚀💯

## 🌟 Features

- Tailwind CSS styled components
- Formik support for form handling
- Dashboard components: tables, forms, and more
- Highly modular and reusable code

## 🚀 Getting Started


### Installation

1. Install the package via npm:

```bash
npm install @qazi9amaan/formlibrary
```

2. Import the style.css file in your index:
```javascript
import '@qazi9amaan/formlibrary/dist/style.css'
```

3. Import the components you need in your project:

```javascript
import { Table, Form } from '@qazi9amaan/formlibrary';
```

## 📝 Documentation

```javascript
// form components
import { Button } from '@qazi9amaan/formlibrary';
import { FormInput } from '@qazi9amaan/formlibrary';
import { FormDate } from '@qazi9amaan/formlibrary';
import { FormButton } from '@qazi9amaan/formlibrary';
import { FormSelect } from '@qazi9amaan/formlibrary';
import { FormMultiSelect } from '@qazi9amaan/formlibrary';
import { FormCheckbox } from '@qazi9amaan/formlibrary';
import { FormRadio } from '@qazi9amaan/formlibrary';
import { FormChips } from '@qazi9amaan/formlibrary';
import { FormTextarea } from '@qazi9amaan/formlibrary';

// formik builder forms from json
import { FormikBuilder } from '@qazi9amaan/formlibrary'

// layouts
import { Row } from '@qazi9amaan/formlibrary'
import { Column } from '@qazi9amaan/formlibrary'
import { AutoLayout } from '@qazi9amaan/formlibrary'

import { Alert } from '@qazi9amaan/formlibrary'

import { Button } from '@qazi9amaan/formlibrary'
import { EmptyPlaceHolder } from '@qazi9amaan/formlibrary'
import { Header } from '@qazi9amaan/formlibrary'
import { Panel } from '@qazi9amaan/formlibrary'

// Loader with utility
import { Loader } from '@qazi9amaan/formlibrary'
import { useLoader } from '@qazi9amaan/formlibrary'
import { LoaderProvider, LoaderContext } from '@qazi9amaan/formlibrary'

// Modal with utility
import { Modal } from '@qazi9amaan/formlibrary'
import { useModal } from '@qazi9amaan/formlibrary';
import { ModalContext, ModalProvider } from '@qazi9amaan/formlibrary';

// hocs, hooks and utils
import { useError } from '@qazi9amaan/formlibrary';
import { withForm } from '@qazi9amaan/formlibrary';
```


## 📝 withForm

```javascript
import { withForm } from '@qazi9amaan/formlibrary';
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
```

## 📝 FormikBuilder

```javascript
 // formik builder
    <FormikBuilder
        mode='CREATE'
        formJSON={formJSON}
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
    />

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
```

## 📝 useError

```javascript
import { useError } from '@qazi9amaan/formlibrary';

const { error, setError } = useError();

setError('Error message');
```

## 📝 useLoader

```javascript

import { useLoader } from '@qazi9amaan/formlibrary';

const { loading, setLoading } = useLoader();

setLoading(true);

```

## 📝 useModal

```javascript
import { useModal } from '@qazi9amaan/formlibrary';
const { openDeleteModal } = useModal();
openDeleteModal();
```

## 🤝 Contributing

Contributions are more than welcome! 🎉 


## 👥 Credits

Built with ❤️ by [Qazi Amaan](https://github.com/qazi9amaan).