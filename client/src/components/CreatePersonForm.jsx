import React from 'react'
import TopBar from './topbar'

const CreatePersonForm = () => {
  return (
    <div className='w-9/12 bg-neutral  h-screen flex flex-col items-center'>
      <TopBar/>

      <div className='flex flex-col w-5/12  bg-base-200 shadow-xl p-10 mt-5 rounded-xl'>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Name</span>
          </div>
        </label>
      
      <div className='grid grid-cols-2 gap-2 w-full'>
        <input type="text" placeholder="Firstname" className="input input-bordered w-full " />
        <input type="text" placeholder="Middle Name" className="input input-bordered w-full" />
        <input type="text" placeholder="Last Name" className="input input-bordered w-full " />
        <input type="text" placeholder="Suffix" className="input input-bordered w-full" />
      </div>

      <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Address</span>
          </div>
        </label>
      
      <div className='grid grid-cols-2 gap-2 w-full'>
        <input type="text" placeholder="Firstname" className="input input-bordered w-full " />
        <input type="text" placeholder="Middle Name" className="input input-bordered w-full" />
        <input type="text" placeholder="Last Name" className="input input-bordered w-full " />
        <input type="text" placeholder="Suffix" className="input input-bordered w-full" />
        <input type="text" placeholder="Suffix" className="input input-bordered w-full col-span-2" />
      </div>
      

      <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Contact</span>
          </div>
        </label>
      
      <div className='grid grid-cols-2 gap-2 w-full'>
        <input type="text" placeholder="Firstname" className="input input-bordered w-full " />
        <input type="text" placeholder="Middle Name" className="input input-bordered w-full" />
      </div>


     
      <div className='w-full grid grid-cols-2 gap-2'>
        <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Profile Picture</span>
          </div>
        </label>
          <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
        </div>
        
        <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Student or Alumni</span>
          </div>
        </label>
          
          <div className='flex flex-row justify-center gap-10 items-center'>   
              <div className='flex flex-row items-center'>
              <input type="radio" name="radio-10" className="radio checked:bg-success" checked />
                <label className="label cursor-pointer">
                    <span className="label-text">Student</span> 
                </label>
              </div> 

              <div className='flex flex-row items-center'>
              <input type="radio" name="radio-10" className="radio checked:bg-success" checked />
              <label className="label cursor-pointer">
                    <span className="label-text">Alumni</span> 
                </label>
                </div>  
          </div>
        </div>
      </div>

      <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-bold">Brief Description</span>
          </div>
        </label>
      <textarea placeholder="Bio" className="textarea textarea-bordered textarea-md w-full" ></textarea>

      <div className='flex flex-col mt-8 w-full items-center'>
        <span className='text-lg font-bold'>Verification Requirements</span>
        <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold">Valid ID</span>
            </div>
          </label>
        <input type="file" className="file-input file-input-bordered w-full" />
      </div>

      <button className="btn btn-primary w-40 mt-5">Create Account</button>

    </div>


    </div>
   
  )
}

export default CreatePersonForm