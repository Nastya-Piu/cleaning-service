import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { required, email, validateForm, confirmation } from 'redux-form-validators'
import Input from '../shared/form/Input';
import UploadImage from '../shared/form/UploadImage';
import TextArea from '../shared/form/TextArea';


class ProfileForm extends Component {

  onSubmit = (company) => {
    if (company.lat && company.lng) company.coordinates = [+company.lat, +company.lng];
    delete company['lat'];
    delete company['lng']
    this.props.onSubmit(company);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="needs-validation" noValidate>
        <Field name="logo" component={UploadImage} label="Service logo" />
        <Field name="name" type="text" component={Input} label="Service name" />
        <Field name="description" type="text" component={TextArea} label="Description" />
        <Field name="address" type="text" component={Input} label="Address" />
        <Field name="lat" type="number" component={Input} label="Coordinates" placeholder="Lat" />
        <Field name="lng" type="number" component={Input} placeholder="Lng" />
        <Field name="price" type="number" component={Input} label="Price" />
        <button className="btn btn-primary">{this.props.initialValues ? 'Save company' : 'Create company'}</button>
      </form>
    )
  }
}

const validate = validateForm({
  name: [required({ msg: "You should enter name" })],
  description: [required({ msg: "You must enter description" })]
});

export default reduxForm({
  form: 'companyForm',
  validate: validate
})(ProfileForm);