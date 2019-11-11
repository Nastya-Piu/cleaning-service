import React from 'react'
import Rating from '@material-ui/lab/Rating'
import { BaseInput } from './BaseInput';

const RatingInput = ({ label, input, meta: { error, touched } }) => {

  return (
    <BaseInput error={error} touched={touched}>
      {label && <div>{label}</div>}
      <Rating
        name="simple-controlled"
        value={input.value ? input.value : 0}
        onChange={(event, newValue) => {
          input.onChange(newValue);
        }}
      />
    </BaseInput>
  )
}

export default RatingInput
