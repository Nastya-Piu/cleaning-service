import React from 'react'
import Rating from '@material-ui/lab/Rating'

const RatingInput = ({ label, input }) => {

  return (
    <>
      {label && <div>{label}</div>}
      <Rating
        name="simple-controlled"
        value={input.value ? input.value : 0}
        onChange={(event, newValue) => {
          input.onChange(newValue);
        }}
      />
    </>
  )
}

export default RatingInput
