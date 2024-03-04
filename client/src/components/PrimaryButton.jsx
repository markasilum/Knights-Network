import React from 'react'

const PrimaryButton = ({text}) => {
  return (
    <button type="submit" className={`btn btn-primary w-40 mt-5`}>{text}</button>
    )
}

export default PrimaryButton