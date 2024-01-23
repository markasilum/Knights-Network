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
    
    <div className='w-9/12 bg-slate-300 h-full p-8'>
        <h1>Your Data</h1>
        <ul>
            {data.map(item => (
                <li key={item.id}>{item.firstName}{item.middleName}{item.lastName}</li>
            ))}
        </ul>
    </div>
  )
}

export default HomePage