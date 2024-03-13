import React from 'react'

const ButtonSuccess = ({text, onClick}) => {
  return (
    <button type="submit" className={`btn btn-success w-40 mt-5 text-neutral`} onClick={onClick}>{text}</button>
  )
}

export default ButtonSuccess