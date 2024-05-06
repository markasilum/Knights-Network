import React, { useState } from 'react'
import InputFields from '../../components/InputFields'
const EditContactPerson = ({personData, fetchContactData}) => {
    const [id,setId] = useState(personData.id)
    const [fName,setFname] = useState(personData.person.firstName)
    const [midName,setMidName] = useState(personData.person.middleName)
    const [lastName,setLastName] = useState(personData.person.lastName)
    const [suffix,setSuffix] = useState(personData.person.suffix)
    const [personEmail,setPersonEmail] = useState(personData.email)
    const [personPhone,setPersonPhone] = useState(personData.phone)
    const [position,setPosition] = useState(personData.positionName)
    const handleSubmit = async (event) => {
        const formData = new FormData();
    
        formData.append("id", id);
        formData.append("firstName", fName);
        formData.append("middleName", midName);
        formData.append("lastName", lastName);
        formData.append("suffix", suffix);
        formData.append("personEmail", personEmail);
        formData.append("personPhone", personPhone);
        formData.append("positionName", position);
    
        try {
            const response = await fetch("http://localhost:3000/company/contact/update", {
                method: "PUT",
                body: formData,
                credentials: "include",
              });
      
              const responseData = await response.json();
      
              if (!response.ok) {
                throw new Error(responseData.error);
              }
              fetchContactData()
            
        } catch (error) {
            console.log(error)
        }
    
      }
      const handleButtonClick = (event) => {
        handleSubmit()
      };
  return (
    <dialog id={personData.id} className="modal">
        
        <div className="modal-box max-w-2xl bg-base-200">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
          <form onSubmit={handleSubmit}>

            <div className="w-full flex flex-col items-center">
            <span className="text-lg font-normal">Contact Person</span>
            <div className="flex flex-col w-full ">
              <div className="flex flex-row w-full gap-2">
                <InputFields
                  divWid={"w-full"}
                  req={true}
                  id={"contactFname"}
                  labelText={"First Name"}
                  name={"contactFname"}
                  placeholder={"First Name"}
                  onChange={(e) => setFname(e.target.value)}
                  value={fName}
                />
                <InputFields
                  divWid={"w-full"}
                  id={"midName"}
                  labelText={"Middle Name"}
                  name={"midName"}
                  placeholder={"Middle Name"}
                  onChange={(e) => setMidName(e.target.value)}
                  value={midName}
                />
              </div>
              <div className="flex flex-row gap-2">
                <InputFields
                  divWid={"w-full"}
                  req={true}
                  id={"lastName"}
                  labelText={"Last Name"}
                  name={"lastName"}
                  placeholder={"Last Name"}
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
                <InputFields
                  divWid={"w-full"}
                  id={"suffix"}
                  labelText={"Suffix"}
                  name={"suffix"}
                  placeholder={"Suffix"}
                  onChange={(e) => setSuffix(e.target.value)}
                  value={suffix}
                />
              </div>
              <div className="flex flex-row gap-2 w-full">
                <div className="w-1/2">
                  <label
                    className="form-control w-full max-w-xs col-span-2"
                    htmlFor="personEmail"
                  >
                    <div className="label">
                      <span className="label-text font-normal">Email</span>
                    </div>
                  </label>
                  <input
                    type="email"
                    id="personEmail"
                    name="personEmail"
                    placeholder="Email Address"
                    className="input input-bordered w-full "
                    value={personEmail}
                    onChange={(e) => setPersonEmail(e.target.value)}
                    required
                  />
                </div>
                <div className='w-1/2'>
                <InputFields
                  divWid={"w-full"}
                  id={"personPhone"}
                  labelText={"Contact Number"}
                  name={"personPhone"}
                  placeholder={"Contact Number"}
                  onChange={(e) => setPersonPhone(e.target.value)}
                  value={personPhone}
                  req={true}
                />
                </div>
              </div>
              <InputFields
                divWid={"w-full"}
                id={"position"}
                labelText={"Position"}
                name={"position"}
                placeholder={"Position Name"}
                onChange={(e) => setPosition(e.target.value)}
                value={position}
                req={true}
              />
            </div>
          </div>
  
            
           
          </form>
          <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button type="submit" className={`btn btn-primary w-40 mt-5`} onClick={handleButtonClick}>
              Update
            </button>
          </form>
        </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
  )
}

export default EditContactPerson