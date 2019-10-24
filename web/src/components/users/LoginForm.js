import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import * as emailValidator from 'email-validator';

class LoginForm extends React.Component {

  renderInput({ input, label, type, meta: { touched, error } }) {

    return (
      <div className='field'>
        <label>{label}</label>
        <input {...input} type={type}/>
        {error && touched && <div className="ui pointing red basic label">
          {error}
        </div>}
      </div>
    );
  }

  onSubmit = (stream) => {
    this.props.onSubmit(stream);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form">
        <Field name="email" type="email" component={this.renderInput} label="Email"/>
        <Field name="password" type="password" component={this.renderInput} label="Password"/>
        <button className="ui button primary">Log in</button>
      </form>
    )
  }

}

const validate = formValues => {
  const errors = {};

  if(!formValues.email) {
    errors.email = "You must enter email";
  } else if(!emailValidator.validate(formValues.email)) {
    errors.email = "Please, enter a valid email";
  }

  if(!formValues.password) {
    errors.password = "You must enter a password";
  }

  return errors;
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'loginForm',
  validate: validate
})(LoginForm);