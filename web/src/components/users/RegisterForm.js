import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { required, email, validateForm, confirmation } from 'redux-form-validators'
import Input from '../shared/form/Input';

class RegisterForm extends React.Component {

  onSubmit = (stream) => {
    this.props.onSubmit('form', stream);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="needs-validation" noValidate>
        <Field name="name" type="text" component={Input} label="Your name"/>
        <Field name="email" type="email" component={Input} label="Email"/>
        <Field name="password" type="password" component={Input} label="Password"/>
        <Field name="repeat_password" type="password" component={Input} label="Confirm password"/>
        <button className="btn btn-primary">Sign up</button>
      </form>
    )
  }

}

const validate = validateForm({
  name: [ required({msg: "You should enter your name"})],
  email: [required({msg: "You must enter email"}), email({msg: "Please, enter a valid email"})],
  password: [required({msg: "You must enter a password"})],
  // repeat_password: [confirmation({field: "password", msg: "Passwords should be equal"})]  TODO: check why its not works!
});

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'registerForm', // DO we need this in store?
  validate: validate
})(RegisterForm);