import React from 'react'
import { BaseInput } from './BaseInput';

const Input = ({ label, input, type, placeholder, meta: { error, touched } }) => {

  return (
    <BaseInput error={error} touched={touched}>
      <label>{label}</label>
      <input className="form-control" {...input} type={type} placeholder={placeholder} />
    </BaseInput>
  );

};

export default Input;
