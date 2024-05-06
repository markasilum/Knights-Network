import React from 'react';

const DateOnlyConverter = ({ isoString }) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    
    return `${month}/${day}/${year}`;
  };

  return (
   <p>{formatDate(isoString)}</p>
  );
};

export default DateOnlyConverter;
