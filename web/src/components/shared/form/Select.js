import React from 'react'
import { Form } from 'react-bootstrap'

const Select = ({label, options, input, meta: { error, touched } }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control as="select" {...input}>
        <option value="">{label}</option>
        {options && options.length && options.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
      </Form.Control>
      {error && touched && <div className="invalid-feedback">
        {error}
      </div>}
    </Form.Group>
  )
}

export default Select
