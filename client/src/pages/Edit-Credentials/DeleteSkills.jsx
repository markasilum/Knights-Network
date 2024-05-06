import React from 'react'

const DeleteSkills = ({skill, handleDelete}) => {
  return (
    <dialog id={"delete"+skill.id} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-3 border-b-2">Delete Skill?</h3>
        <p className=" text-md font-normal">{skill.skillName}</p>
        <div className="modal-action ">
          <form method="dialog">
            <button
              className="btn btn-error text-white"
              onClick={() => handleDelete(skill.id)}
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

export default DeleteSkills