import React, { useEffect, useState } from 'react';

const HomePage = () => {
const [data, setData] = useState([]);

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    
    <div className='w-9/12 bg-slate-300 h-full p-3'>
        <div className='w-full bg-white h-72 p-5 flex flex-col gap-3'>
            <div className='w-28 h-28 bg-black flex flex-col'></div>
              <h1 className='font-bold'>{data.firstName+" "+data.middleName+" "+data.lastName}</h1>
              <p>{data.streetAddress}</p>
              <p>{data.cityName}</p>
              <p>{data.country}</p>
        </div>
    </div>
  )
}

export default HomePage