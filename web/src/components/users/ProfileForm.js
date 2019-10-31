import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { required, email, validateForm, confirmation } from 'redux-form-validators'
import Input from '../shared/form/Input';
import UploadImage from '../shared/form/UploadImage';

class ProfileForm extends Component {

  onSubmit = (profile) => {
    this.props.onSubmit(profile);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="needs-validation" noValidate>
        <Field name="profilePicURL" type="file" component={UploadImage} label="Profile image" />
        <Field name="name" type="text" component={Input} label="Your name" />
        <Field name="email" type="email" component={Input} label="Email" />
        <Field name="address" type="text" component={Input} label="Address" />
        <Field name="password" type="password" component={Input} label="Password" />
        <Field name="repeatPassword" type="password" component={Input} label="Repeat password"
          validate={confirmation({ field: 'password', msg: "Passwords should be equal" })} />
        <button className="btn btn-primary">{this.props.initialValues ? 'Save profile' : 'Create profile'}</button>
      </form>
    )
  }
}

const validate = validateForm({
  name: [required({ msg: "You should enter your name" })],
  email: [required({ msg: "You must enter email" }), email({ msg: "Please, enter a valid email" })]
});

export default reduxForm({
  form: 'profileForm',
  validate: validate
})(ProfileForm);
