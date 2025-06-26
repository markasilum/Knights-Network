import React from 'react';

function formatDateToWords(dateString) {
    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    const dateParts = dateString.split("-");
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2].substring(0, 2));

    const monthWord = months[month - 1];
    const dayWord = getOrdinalSuffix(day);

    return `${monthWord} ${year}`;
}

function getOrdinalSuffix(number) {
    if (number === 1 || number === 21 || number === 31) {
        return number + "st";
    } else if (number === 2 || number === 22) {
        return number + "nd";
    } else if (number === 3 || number === 23) {
        return number + "rd";
    } else {
        return number + "th";
    }
}

function DateToWords({ dateString }) {
    let dateOnly
    let dateInWords
    if(dateString){
         dateOnly = dateString.split("T")[0];
         dateInWords = formatDateToWords(dateOnly);
    }

    return <div>{dateInWords}</div>;
}

export default DateToWords;