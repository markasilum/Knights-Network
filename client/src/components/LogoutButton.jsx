import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
    const navigate = useNavigate()

    const logout = async(event) =>{
      try {
        const response= await fetch("http://localhost:3000/auth/logout",{
          credentials:'include'
        })
  
        navigate('/login')
      } catch (error) {
        
      }
    }
  return (
    <button onClick={logout}><LogoutIcon/>Logout</button>
  )
}

export default LogoutButton