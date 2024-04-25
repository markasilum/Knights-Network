import React from 'react'
import ButtonNavigator from '../../components/ButtonNavigator'
import { Link } from 'react-router-dom'

const ChooseUserType = () => {
  return (
    <div className='h-screen w-screen flex flex-row justify-center items-center'>
      <div className='flex flex-col gap-1 pl-16 pr-16 pt-40 pb-40 rounded-lg bg-primary'>
      <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-normal text-white">User type:</span>
          </div>
        </label>
      <Link className="btn btn-success w-56 text-white" to={"/register/person"}>Alumni/Students</Link>
      <Link className="btn btn-success w-56 text-white" to={"/register/company"}>Company</Link>
      </div>
    </div>
  )
}

export default ChooseUserType