import * as React from 'react';
import { Link } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import Button from './Button';
import Center from './Center';
import Input from './Input';

class RegisterForm extends React.Component<InjectedFormProps> {
  public render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field label='Correo' placeholder='Email' name='email' type='email' component={Input} />
        <Field label='Contraseña' placeholder='Contraseña' name='password' type='password' component={Input} />
        <Button block={true}>Enviar</Button>
        <Center>ytarn
          <Link to='/'>Iniciar Sesión</Link>
        </Center>
      </form>
    )
  }
}

export default reduxForm<any, any>({
  form: 'register',
})(RegisterForm)