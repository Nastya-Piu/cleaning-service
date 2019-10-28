import React from 'react'

const Input = ({label, input, type, meta: { error, touched} }) => {

  return (
    <div className='field'>
      <label>{label}</label>
      <input {...input} type={type}/>
      {error && touched && <div className="ui pointing red basic label">
        {error}
      </div>}
    </div>
  );

};

export default Input;
