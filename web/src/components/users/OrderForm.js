import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Input from '../shared/form/Input';
import { validateForm, required, length } from 'redux-form-validators';
import Select from '../shared/form/Select';
import TextArea from '../shared/form/TextArea';
import DayPickerInput from '../shared/form/DayPickerInput';
import TimePickerInput from '../shared/form/TimePickerInput';


const OrderForm = props => {

  const onSubmit = (credentials) => {
    props.onSubmit(credentials);
  }

  return (
    <div>
      <form onSubmit={props.handleSubmit(onSubmit)} className="needs-validation" noValidate>
        <Field name="address" type="text" component={Input} label="Your address"/>
        <Field name="cleanType" component={Select} label="Clean type" options={props.orderTypes}/>
        <Field name="description" component={TextArea} label="Room/Office description"/>
        <Field name="dates" component={DayPickerInput} label="Select days"/>
        <Field name="time" component={TimePickerInput} label="Select time"/>
        <button className="btn btn-primary float-right">Make order</button>
      </form>
    </div>
  )
}

OrderForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

const validate = validateForm({
  address: [ required({msg: "You should enter your address"})],
  cleanType: [ required({msg: "You should select clean type"})],
  description: [ required({msg: "You should enter description"})],
  dates: [ length({min: 1, msg: "You should select days"})], // TODO: create validator for checking this!
  time: [ required({msg: "You should select time"})]
});

export default reduxForm({
  form: 'orderForm',
  validate: validate
})(OrderForm);
