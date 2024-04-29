export const formatDateToString = (isoString) => {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
  };
  
  // Example usage:
//   const isoDateString = '2024-04-29T14:30:00';
//   const formattedDateString = formatDateToString(isoDateString);
//   console.log(formattedDateString); // Output: "04/29/24 02:30 PM"
  