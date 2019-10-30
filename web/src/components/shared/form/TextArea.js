import React from 'react'

const TextArea = ({label, input, meta: { error, touched} }) => {

  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea className="form-control" {...input}/>
      {error && touched && <div className="invalid-feedback">
        {error}
      </div>}
    </div>
  );

};

export default TextArea;