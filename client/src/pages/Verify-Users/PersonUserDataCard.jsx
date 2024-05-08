import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewDocumentModal from "./ViewDocumentModel";

const PersonUserDataCard = ({ userData, fetchUsers }) => {

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

      fetchUsers()
    } catch (error) {
      console.error("Error verifying user:", error);
    }

  }

  const banAccount = async (event) => {
    try {
      const response = await fetch(`http://localhost:3000/user/admin/archive?id=${userData.id}`, {
        method: "GET",
        credentials:'include'
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      fetchUsers()
    } catch (error) {
      console.error("Error verifying user:", error);
    }

  }

  const unBanAccount = async (event) => {
    try {
      const response = await fetch(`http://localhost:3000/user/admin/unarchive?id=${userData.id}`, {
        method: "GET",
        credentials:'include'
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      fetchUsers()
    } catch (error) {
      console.error("Error verifying user:", error);
    }

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


          <div className="flex flex-col gap-2 w-full mt-2">
            <div className="flex flex-row gap-2 items-center">
            <p className="font-semibold">Account Status: </p>
            {userData.isArchived === false && (
              <div className="badge badge-success badge-outline">Active</div>
            )} 
             {userData.isArchived === true && (
              <div className="badge badge-info badge-outline">Deactivated</div>
            )} 

            {userData.verified === false && (
              <div className="badge badge-outline">Unverified</div>
            )}
             {userData.verified === true && (
              <div className="badge badge-success badge-outline">Verified</div>
            )}

            {userData.isBanned === false && (
              <div className="badge badge-success badge-outline">Not Banned</div>
            )}
           
            {userData.isBanned === true && (
              <div className="badge badge-error badge-outline">Banned</div>
            )}
            
            </div>

            <div className="w-full flex flex-row justify-between">
            {userData.isBanned === false && (
            <button className="btn btn-primary btn-error text-white btn-sm w-32" onClick={banAccount}>Ban User</button>
          )}
           {userData.isBanned === true && (
            <button className="btn btn-primary btn-success text-white btn-sm w-32" onClick={unBanAccount}>Restore</button>
          )}
            {userData.verified === false && (
              <button className="btn btn-primary btn-sm w-32" onClick={handleSubmit}>Verify User</button>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonUserDataCard;
