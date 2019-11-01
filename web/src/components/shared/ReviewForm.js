import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, reset } from 'redux-form'
import Input from '../shared/form/Input';
import { validateForm, required } from 'redux-form-validators';
import TextArea from '../shared/form/TextArea';
import RatingInput from './form/RatingInput';


const ReviewForm = props => {

  const onSubmit = (credentials) => {
    props.onSubmit(credentials);
    props.reset();
  }

  return (
    <div>
      <form onSubmit={props.handleSubmit(onSubmit)} className="needs-validation review-form" noValidate>
        <Field name="rating" component={RatingInput} label="Rate the company" />
        <Field name="title" type="text" component={Input} label="Title of the review" />
        <Field name="description" component={TextArea} label="Review text" />
        <button className="btn btn-primary float-right">Save review</button>
      </form>
    </div>
  )
}

ReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

const validate = validateForm({
  rating: [required({ msg: "You should rate your experience" })],
  title: [required({ msg: "You should enter a title" })],
  description: [required({ msg: "You should enter text" })]
});

export default reduxForm({
  form: 'reviewForm',
  validate: validate
})(ReviewForm);
