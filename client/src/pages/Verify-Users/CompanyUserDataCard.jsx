import React from 'react'
import { useNavigate } from "react-router-dom";
import ViewDocumentModal from './ViewDocumentModel';

const CompanyUserDataCard = ({userData}) => {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
          const response = await fetch(`http://localhost:3000/user/verify?id=${userData.id}`, {
            method: "GET",
          });
    
          const responseData = await response.json();
    
          if (!response.ok) {
            throw new Error(responseData.error);
          }
        } catch (error) {
          console.error("Error verifying user:", error);
        }
    
        navigate(0)
      }
  return (
    <div className="w-2/3 border-2 rounded-lg h-fit max-h-[90%] p-3 overflow-scroll">
      {userData &&(
        console.log(userData)
      )}
      {userData &&
        
            <span className="font-semibold">
              Company Name:{" "}
              <span className="font-normal">
                {userData.company.companyName}
              </span>
            </span>
         
      }

      {userData && (
        <div key={userData.id} className="flex flex-col">
          <span className="font-semibold">
            Address:{" "}
            <span className="font-normal">
              {userData.streetAddress}, {userData.cityName},{" "}
              {userData.countryName}, {userData.zipCode}
            </span>
          </span>
          <span className="font-semibold">
            Contact Number:{" "}
            <span className="font-normal">{userData.contactNum}</span>
          </span>

          <span className="font-semibold">
            Email Address:{" "}
            <span className="font-normal">{userData.emailAddress}</span>
          </span>

          <span className='font-semibold mt-5'>Verification Requirements</span>

          {userData.company.verifiReq &&(
          <div className="flex flex-col gap-3 w-full">
            <div className='flex flex-col'>
              <span>SEC Registration</span>
              <button><img className="w-72 h-auto" onClick={()=>document.getElementById(userData.company.verifiReq.secRegistration).showModal()} src={`http://localhost:3000/uploads/secRegistration/${userData.company.verifiReq.secRegistration}`} /></button>
              <ViewDocumentModal docId={userData.company.verifiReq.secRegistration} documentPath={`http://localhost:3000/uploads/secRegistration/${userData.company.verifiReq.secRegistration}`}/>
            </div>
            <div className='flex flex-col'>
              <span>DTI Registration</span>
              <button><img className="w-72 h-auto" onClick={()=>document.getElementById(userData.company.verifiReq.dtiRegistration).showModal()} src={`http://localhost:3000/uploads/dtiRegistration/${userData.company.verifiReq.dtiRegistration}`} /></button>
              <ViewDocumentModal docId={userData.company.verifiReq.dtiRegistration} documentPath={`http://localhost:3000/uploads/dtiRegistration/${userData.company.verifiReq.dtiRegistration}`}/>
            </div>
            <div className='flex flex-col'>
              <span>Business Permit</span>
              <button><img className="w-72 h-auto" onClick={()=>document.getElementById(userData.company.verifiReq.businessPermit).showModal()} src={`http://localhost:3000/uploads/businessPermit/${userData.company.verifiReq.businessPermit}`} /></button>
              <ViewDocumentModal docId={userData.company.verifiReq.businessPermit} documentPath={`http://localhost:3000/uploads/businessPermit/${userData.company.verifiReq.businessPermit}`}/>
            </div>
           
            
          </div>
        )}

          <div className="flex flex-row justify-end w-full">
            {userData.verified === true && (
              <div className="bg-success h-fit justify-center flex p-3 rounded-lg w-32 text-white cursor-not-allowed">Verified</div>
            )}
            {userData.verified === false && (
              <button className="btn btn-primary w-32" onClick={handleSubmit}>Verify User</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CompanyUserDataCard