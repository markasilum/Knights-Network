import React from 'react';

const TimeConverter = ({ isoString }) => {
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
   <p>{formatTime(isoString)}</p>
  );
};

export default TimeConverter;
