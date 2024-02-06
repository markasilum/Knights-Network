import React from 'react'

const InputFields = ({labelText,id,placeholder,value,onChange}) => {
  return (
    <input type="text" id={id} placeholder={placeholder} className="input input-bordered w-full " value={value} onChange={onChange} />
  )
}

export default InputFields