import React from 'react'
import { Form } from 'react-bootstrap'
import { BaseInput } from './BaseInput'

const Select = ({ label, options, input, meta: { error, touched } }) => {
  return (
    <BaseInput error={error} touched={touched}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select" {...input}>
        <option value="">{label}</option>
        {options && options.length && options.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
      </Form.Control>
    </BaseInput>
  )
}

export default Select
