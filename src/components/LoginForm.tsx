import * as React from 'react';
import { Link } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { ILogin } from '../ducks/Users';
import Button from './Button';
import Center from './Center';
import Input from './Input';

class LoginForm extends React.Component<InjectedFormProps<ILogin>> {
  public render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field label='Correo' placeholder='Email' name='email' type='email' component={Input} />
        <Field label='Contraseña' placeholder='Contraseña' name='password' type='password' component={Input} />
        <Button block={true}>Enviar</Button>
        <Center>
          <Link to='register'>Ir al Registro</Link>
        </Center>
      </form>
    )
  }
}

export default reduxForm<ILogin>({
  form: 'login',
})(LoginForm)