import React, { useState, useEffect } from 'react';
import TimePicker from 'react-time-picker';
import styled from "styled-components";
import { BaseInput } from './BaseInput';

const StyledTimePicker = styled(TimePicker)`
  >div {
    padding: 5px;
    border-color: #eee;
  }
  button:first-child {
    padding: 5px;
  }
  button:last-child {
    display:none;
  }
`

const TimePickerInput = ({ input, label, meta: { error, touched } }) => {

  const [time, setTime] = useState("10:00");

  const onChange = time => setTime(time)

  useEffect(() => {
    input.onChange(time)
  });

  return (
    <BaseInput error={error} touched={touched}>
      <p>{label}</p>
      <StyledTimePicker
        onChange={onChange}
        value={time}
      />
    </BaseInput>
  );

}

export default TimePickerInput