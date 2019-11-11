import React from 'react'
import NativeSelect from '@material-ui/core/NativeSelect';

const Select = (props) => {

  const { options, value, onChange } = props;

  return (
    <NativeSelect
      className="select-input"
      value={value}
      onChange={onChange}>
      {options.map(option => <option value={option.value}>{option.name}</option>)}
    </NativeSelect>
  )

}

export default Select