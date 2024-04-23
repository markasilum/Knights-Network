import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewDocumentModal from "./ViewDocumentModel";

const PersonUserDataCard = ({ userData }) => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      const response = await fetch(`http://localhost:3000/user/verify?id=${userData.id}`, {
        method: "GET",
        credentials:'include'
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }else{
        console.log("sucess")
        
      }
    } catch (error) {
      console.error("Error verifying user:", error);
    }

    navigate(0)
  }
  return (
    <div className="w-2/3 border-2 rounded-lg h-fit max-h-[90%] p-3 bg-neutral">
      {/* {userData &&(
        console.log(userData.id)
      )} */}
      {userData &&
        
            <span className="font-semibold">
              Full Name:{" "}
              <span className="font-normal">
                {userData.person.firstName} {userData.person.middleName} {userData.person.lastName}
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

          

          {userData.person.verifiReq &&(
            <div className='flex flex-col font-semibold mt-5'>
            <span> Valid ID:</span>
            <button><img className="w-72 h-auto" onClick={()=>document.getElementById(userData.person.verifiReq.idPhoto).showModal()} src={`http://localhost:3000/uploads/idPhoto/${userData.person.verifiReq.idPhoto}`} /></button>
            <ViewDocumentModal docId={userData.person.verifiReq.idPhoto} documentPath={`http://localhost:3000/uploads/idPhoto/${userData.person.verifiReq.idPhoto}`}/>
          </div>

          )}

          

          <div className="flex flex-row justify-end w-full">
            {userData.verified === true && (
              <div className="bg-success h-fit justify-center flex p-3 rounded-lg w-32 text-white cursor-not-allowed">Verified</div>
            )}
            {userData.verified === false && (
              <button className="btn btn-primary h-fit p-0 w-32" onClick={handleSubmit}>Verify User</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonUserDataCard;
