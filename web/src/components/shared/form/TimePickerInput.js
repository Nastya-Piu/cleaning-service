import React, { useState, useEffect } from 'react';
import TimePicker from 'react-time-picker';


const TimePickerInput = ({input, label}) => {

  const [time, setTime] = useState("10:00");

  const onChange = time => setTime(time)

  useEffect(() => {
    input.onChange(time)
  });

  return (
    <div>
      <p>{label}</p>
      <TimePicker
        onChange={onChange}
        value={time}
      />
    </div>
  );

}

export default TimePickerInput