import React from 'react'
import { Link } from 'react-router-dom'

const SearchPeopleCard = ({personData}) => {
  return (
    <div className="overflow-auto-y w-full  bg-white h-fit grid grid-cols-2 rounded-xl mb-20 gap-3 ">
      {personData.map((person) => (
        <Link
          to={`/profile/person/view/${person.id}`}
          key={person.id}
          className="bg-neutral h-fit w-full rounded-lg flex flex-row items-start p-3 gap-3 hover:bg-info active:bg-neutral"
        >
          <div className="avatar">
            <div className="rounded w-28">
              <img
                src={`http://localhost:3000/uploads/profPic/${person.user.profPic}`}
                alt="profile picture"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl">
              {person.firstName} {person.middleName} {person.lastName}
            </h1>
            <p className="text-sm">{person.user.streetAddress + ", " + person.user.cityName + ","}</p>
            <p className="text-sm">{person.user.countryName}</p>
            <p className="text-sm">{person.user.emailAddress}</p>
            <p className="text-sm">{person.user.contactNum}</p>
          </div>
        </Link>
      ))}
      
    </div>
  );
}

export default SearchPeopleCard