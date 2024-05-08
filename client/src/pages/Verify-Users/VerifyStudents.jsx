import React, { useEffect, useState } from 'react'
import TopBar from '../../components/topbar'
import SidebarAdmin from '../../components/SidebarAdmin'
import { Link } from 'react-router-dom';
import PersonUserDataCard from './PersonUserDataCard';
import SideBar from '../../components/SideBar';
const VerifyStudents = () => {
    const [users, setUsers] = useState([]);
    const[userData, setUserData] = useState(null)

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/index/students",{
          credentials:'include'
        });
        const getUsersResult = await response.json();
        setUserData(getUsersResult[0].user)
        setUsers(getUsersResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
  useEffect(() => {

    

      fetchUsers()
  }, []);

  const handleClick = (data) =>{
    setUserData(data)
    console.log(userData)
  }

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col shadow-xl">
      {/* {console.log(userData)} */}
      <TopBar />
      <div className="flex flex-row gap-2">
        <SideBar/>
        <div className="flex flex-col w-9/12  h-screen  bg-neutral">
          <div className="pt-3 pr-3 pl-1 h-full">
            <div className="w-full bg-white h-[95%] min-h-80 mb-20 flex flex-col pl-3 pr-3  justify-between">
              <div className=' h-full'>
              <div className="h-fit p-2 flex gap-5">
                <Link className="font-semibold" to={"/verify-users/alumni"}>{"Alumni"}</Link>
                <Link className="font-semibold text-accent" to={"/verify-users/students"}>{"Students"}</Link>
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
                        {alumni.user.person.firstName} {alumni.user.person.middleName} {alumni.user.person.lastName}
                        
                        </button>
                    ))}
                </div>
                <div className="divider divider-horizontal h-[90%]"></div>

                <PersonUserDataCard userData={userData} fetchUsers={fetchUsers}/>
          


              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyStudents