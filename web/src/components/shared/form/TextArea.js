import React from 'react'
import { BaseInput } from './BaseInput';

const TextArea = ({ label, input, meta: { error, touched } }) => {

  return (
    <BaseInput error={error} touched={touched}>
      <label>{label}</label>
      <textarea className="form-control" {...input} />
    </BaseInput>
  );

};

export default TextArea;