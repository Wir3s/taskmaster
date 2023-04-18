import React, { useState } from 'react';
import DatePicker from 'react-date-picker';

const DateSelection = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <DatePicker onChange={onChange} value={value} />
    </div>
  );
}

export default DateSelection;