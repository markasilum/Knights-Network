import React from 'react'
import { Link } from 'react-router-dom'

const SearchCompCard = ({companyData}) => {
  return (
    <div className="overflow-auto-y w-full  bg-white h-fit grid grid-cols-2 rounded-xl mb-20 gap-3 ">
      {companyData.map((comp) => (
        <Link
          to={`/profile/view/${comp.id}`}
          key={comp.id}
          className="bg-neutral h-fit w-full rounded-lg flex flex-row items-start p-3 gap-3 hover:bg-info active:bg-neutral"
        >        
        
        <div className="avatar">
            <div className="rounded w-28">
              <img
                src={`http://localhost:3000/uploads/profPic/${comp.user.profPic}`}
                alt="profile picture"
              />
            </div>
          </div>
          <div className='flex flex-col'>
          <h1 className="text-lg">{comp.companyName}</h1>
          <p className="text-sm">{comp.user.streetAddress+ ", "+comp.user.cityName+ ","}</p>
          <p className="text-sm">{comp.user.countryName}</p>
          <p className="text-sm">{comp.user.emailAddress}</p>
          <p className="text-sm">{comp.user.contactNum}</p>
          </div>

        </Link>
        
      ))}
      
      <div></div>
    </div>
  )
}

export default SearchCompCard