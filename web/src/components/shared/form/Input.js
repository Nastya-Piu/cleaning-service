import React from 'react'

const Input = ({label, input, type, meta: { error, touched} }) => {

  return (
    <div className="form-group">
      <label>{label}</label>
      <input className="form-control" {...input} type={type}/>
      {error && touched && <div className="invalid-feedback">
        {error}
      </div>}
    </div>
  );

};

export default Input;
