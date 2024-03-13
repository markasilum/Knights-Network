import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DateToWords from './DateFormatter';
const CertificationsCard = () => {
  return (
    <div className=''>
        <div className='flex flex-row justify-between border-b-2 border-solid border-neutral mb-2'>
            <span className='font-bold'>Certifications</span>
            <div className='flex gap-3'>
            <Link to="/certificationsform" className='font-thin underline'>Add</Link> 
            <Link to="/certificationsform" className='font-thin underline'>Edit</Link>
            </div>
        </div>
      </div>
  )
}

export default CertificationsCard