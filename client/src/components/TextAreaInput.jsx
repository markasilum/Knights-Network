import React from 'react'

const TextAreaInput = ({id,placeholder,value,onChange}) => {
  return (
    <textarea id={id} placeholder={placeholder}className="textarea textarea-bordered textarea-md w-full h-28" value={value} onChange={onChange}></textarea>
    )
}

export default TextAreaInput