import React, { useState, useEffect, createContext } from 'react'
const UserContext = createContext();


const UserProvider = ({children}) => {
  return (
    <div>UserContext</div>
  )
}

export default {UserContext, UserProvider}