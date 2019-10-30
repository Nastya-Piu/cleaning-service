import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { required, email, validateForm } from 'redux-form-validators'
import Input from '../shared/form/Input';

class LoginForm extends React.Component {

  onSubmit = (credentials) => {
    this.props.onSubmit('form', credentials);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="needs-validation" noValidate>
        <Field name="email" type="email" component={Input} label="Email"/>
        <Field name="password" type="password" component={Input} label="Password"/>
        <button className="btn btn-primary">Log in</button>
      </form>
    )
  }
}

const validate = validateForm({
  password: [required({msg: "You must enter a password"})],
  email: [required({msg: "You must enter email"}), email({msg: "Please, enter a valid email"})],
});

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'loginForm',
  validate: validate
})(LoginForm);