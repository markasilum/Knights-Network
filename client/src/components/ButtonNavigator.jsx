import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const ButtonNavigator = ({text,path,onClick}) => {
  return (
    <Link className={`btn btn-primary w-40`} to={path} onClick={onClick}>{text}</Link>
  )
}

export default ButtonNavigator