import React, { createContext, useContext, useState } from 'react'

export const RoleContext = createContext();

const RoleProvider = ({ children }) => {
    const [role, setUserRole] = useState(null);

  return (
    <RoleContext.Provider value={{ role,setUser}}>
        {children}
    </RoleContext.Provider>
  )
}



export const useRoleContext = () => useContext(RoleContext);