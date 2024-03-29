import React from 'react'

const ButtonPrimary = ({text, onClick}) => {
  return (
    <button type="submit" className={`btn btn-primary w-40 mt-5 mb-3`} onClick={onClick}>{text}</button>
  )
}

export default ButtonPrimary