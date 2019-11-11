import React, { useState, useEffect } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const DayPickerInput = ({label, input}) => {

  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    input.onChange(selectedDays)
  })

  const handleDayClick = (day, { selected }) => {
    const selectedDaysArr = [...selectedDays];
    if (selected) {
      const selectedIndex = selectedDaysArr.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDaysArr.splice(selectedIndex, 1);
    } else {
      selectedDaysArr.push(day);
    }
    setSelectedDays(selectedDaysArr);
  }

  return (
    <div>
      <p>{label}</p>
      <DayPicker
        {...input}
        selectedDays={selectedDays}
        onDayClick={handleDayClick}
      />
    </div>
  );

}

export default DayPickerInput