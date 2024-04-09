import React, { useEffect, useState } from 'react'
import TopBar from '../../components/topbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import { Link, useNavigate } from 'react-router-dom';
import PersonUserDataCard from './PersonUserDataCard';
const VerifyAlumni = () => {const [users, setUsers] = useState([]);
    const[userData, setUserData] = useState(null)
    
    
    
  useEffect(() => {

    const fetchUsers = async () => {
        try {
          const response = await fetch("http://localhost:3000/user/index/alumni");
          const getUsersResult = await response.json();
          setUserData(getUsersResult[0].user)
          setUsers(getUsersResult);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchUsers()
  }, []);

  const handleClick = (data) =>{
    setUserData(data)
    // console.log(userData)
  }

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      {/* {console.log(userData)} */}
      <TopBar />
      <div className="flex flex-row gap-2">
        <SidebarAdmin />
        <div className="flex flex-col w-9/12  h-screen  bg-neutral">
          <div className="pt-3 pr-3 pl-1 overflow-x-auto">
            <div className="w-full bg-white h-screen min-h-80 mb-20 flex flex-col pl-3 pr-3  justify-between">
              <div className=' h-full'>
              <div className="h-fit p-2 flex gap-5">
                <Link className="font-semibold text-accent" to={"/verify-users/alumni"}>{"Alumni"}</Link>
                <Link className="font-semibold" to={"/verify-users/students"}>{"Students"}</Link>
                <Link className="font-semibold" to={"/verify-users/companies"}>{"Companies"}</Link>
              </div>

              <div className='flex flex-row h-full'>
                <div className="flex flex-col w-1/3">
                    {users &&
                    users.map((alumni) => (
                        <button
                        key={alumni.id}
                        className="border-t border-solid border-info p-2 w-full bg-white text-left hover:bg-neutral "
                        onClick={() => handleClick(alumni.user)}
                        >
                        {alumni.user.person.map(
                            (person) =>
                            `${person.firstName} ${person.middleName} ${person.lastName}`
                        )}
                        </button>
                    ))}
                </div>
                <div className="divider divider-horizontal h-[90%]"></div>

                <PersonUserDataCard userData={userData}/>


              </div>
              </div>
              {/* <div className="h-10 bg-white">

              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyAlumni