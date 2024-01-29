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
    
    <div className='flex flex-col w-9/12  h-screen  bg-neutral '>
      <div className='pt-5 pr-5 pl-3'>

        <div className='overflow-hidden w-full bg-white h-80 p-5 flex flex-col shadow-md rounded-xl'>
                <div className='w-28 min-h-28 bg-black flex flex-col'></div>
                <h1 className='font-bold text-2xl mt-5'>{data.firstName+" "+data.middleName+" "+data.lastName}</h1>
                <p>{data.streetAddress}</p>
                <p>{data.cityName}</p>
                <p>{data.countryName}</p>

                <div className='mt-5 border-t-2 border-solid border-neutral pt-2 flex flex-row gap-5 '>
                  <button className='font-bold'>About</button>
                  <button className='font-bold'>Credentials</button>
                  <button className='font-bold'>Contact</button>
                </div>
        </div>

        <div className='overflow-auto-y w-full bg-white h-full mt-5 p-5 flex flex-col'>
            <p>{data.biography}</p>
        </div>  
      </div>
    </div>
  )
}

export default HomePage