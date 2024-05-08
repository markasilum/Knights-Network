import React from 'react'

const DeleteContact = ({personData, handleDelete}) => {
  return (
    <dialog id={"delete"+personData.id} className="modal">
    <div className="modal-box">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 className="font-bold text-lg mb-3 border-b-2">Delete Contact Person?</h3>
      <p className=" text-md font-normal">{personData.positionName}</p>
      <p className=" text-md font-normal">{personData.person.firstName} {personData.person.middleName} {personData.person.lastName}</p>

      <div className="modal-action ">
        <form method="dialog">
          <button
            className="btn btn-error text-white"
            onClick={() => handleDelete(personData.id)}
          >
            Delete
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

export default DeleteContact