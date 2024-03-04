import React from 'react'

const TextAreaInput = ({id,placeholder,value,onChange,labelText}) => {
  return (
    <div>
      <label className="form-control w-full max-w-xs col-span-2">
          <div className="label">
                <span className="label-text font-normal">{labelText}</span>
            </div>
      </label>
    <textarea id={id} placeholder={placeholder}className="textarea textarea-bordered textarea-md w-full h-28" value={value} onChange={onChange}></textarea>
    
    </div>
    )
}

export default TextAreaInput