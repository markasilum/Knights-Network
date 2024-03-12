import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import DateToWords from './DateFormatter';
const LicenseCard = () => {
  return (
    <div className=''>
        <div className='flex flex-row justify-between border-b-2 border-solid border-neutral mb-2'>
            <span className='font-bold'>License</span>
            <div className='flex gap-3'>
            <Link to="/licenseform" className='font-thin underline'>Add</Link> 
            <Link to="/licenseform" className='font-thin underline'>Edit</Link>
            </div>
        </div>
      </div>
  )
}

export default LicenseCard