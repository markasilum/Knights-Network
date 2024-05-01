import React, { useState } from 'react'

const InputFields = ({labelText,id,placeholder,value,onChange, name, divWid}) => {
  
  return (
    <div className={divWid} >
      <label className="form-control w-full max-w-xs col-span-2" htmlFor={id}>
          <div className="label">
                <span className="label-text font-normal">{labelText}</span>
            </div>
      </label>
      <input type='text'id={id} name={name} placeholder={placeholder} className="input input-bordered w-full " value={value} onChange={onChange} />
    </div>

  )
}

export default InputFields