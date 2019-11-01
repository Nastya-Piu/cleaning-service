import React from 'react'

const Input = ({ label, input, type, placeholder, meta: { error, touched } }) => {

  return (
    <div className="form-group">
      <label>{label}</label>
      <input className="form-control" {...input} type={type} placeholder={placeholder} />
      {error && touched && <div className="invalid-form">
        {error}
      </div>}
    </div>
  );

};

export default Input;
