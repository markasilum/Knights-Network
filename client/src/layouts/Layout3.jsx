import React from 'react'

const Layout3 =  (Component) =>
({ ...props }) => {
  return (
    <div className="className=w-full h-screen flex justify-center align-middle bg-white overflow-hidden	">
          <Component {...props} />
      </div>
  )
}

export default Layout3