import React from 'react'

const SidebarButton = ({onCick, text}) => {
  return (
    <div className='w-full border-solid	border-2 h-12 flex flex-col justify-center p-5'>{text}</div>
  )
}

export default SidebarButton