import React from 'react'

const InputFields = ({labelText,id,placeholder,value,onChange, name}) => {
  return (
    <div>
      <label className="form-control w-full max-w-xs col-span-2">
          <div className="label">
                <span className="label-text font-normal">{labelText}</span>
            </div>
      </label>
      <input type="text" id={id} name={name} placeholder={placeholder} className="input input-bordered w-full " value={value} onChange={onChange} />
    </div>

  )
}

export default InputFields