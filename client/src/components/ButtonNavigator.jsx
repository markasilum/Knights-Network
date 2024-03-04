import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const ButtonNavigator = ({text,path}) => {
  return (
    <Link className={`btn btn-primary w-40`} to={path}>{text}</Link>
  )
}

export default ButtonNavigator