import React, { useState } from 'react';

const DateTimeConverter = ({dateString}) => {
  const [isoString, setIsoString] = useState(dateString);
  const [formattedDate, setFormattedDate] = useState('');

  const handleInputChange = (event) => {
    setIsoString(event.target.value);
  }

  const convertIsoToDDMMYYYY = () => {
    const dtObject = new Date(isoString);
    const formattedDate = dtObject.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    setFormattedDate(formattedDate);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ISO String"
        value={isoString}
        onChange={handleInputChange}
      />
      <button onClick={convertIsoToDDMMYYYY}>Convert</button>
      {formattedDate && (
        <div>
          <p>Formatted Date: {formattedDate}</p>
        </div>
      )}
    </div>
  );
}

export default DateTimeConverter;
