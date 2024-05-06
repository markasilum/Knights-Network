import React from 'react'
import { Link } from 'react-router-dom'

const SearchCompCard = ({companyData}) => {
  return (
    <div className="overflow-auto-y w-full  bg-white h-fit flex flex-col rounded-xl mb-20 gap-3">
      {companyData.map((comp) => (
        <Link
          to={`/profile/view/${comp.id}`}
          key={comp.id}
          className="bg-neutral h-fit w-full rounded-lg flex flex-row items-start p-5  gap-3 hover:bg-info active:bg-neutral"
        >        
        
        <figure><img className='h-40 min-h-40 min-w-40' src={`http://localhost:3000/uploads/profPic/${comp.user.profPic}`} alt="profile picture"/></figure>
          <div className='flex flex-col'>
          <h1 className="text-2xl">{comp.companyName}</h1>
          <p className="font-thin">{comp.user.streetAddress+ ","}</p>
          <p className="font-thin">{comp.user.cityName+ ","}</p>
          <p className="font-thin">{comp.user.countryName}</p>
          <p className="font-thin">{comp.user.emailAddress}</p>
          <p className="font-thin">{comp.user.contactNum}</p>
          </div>

        </Link>
        
      ))}
      
      <div></div>
    </div>
  )
}

export default SearchCompCard