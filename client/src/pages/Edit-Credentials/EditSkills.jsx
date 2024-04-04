import React, { useState } from 'react'

const EditSkills = ({skillsData}) => {
    const [skillName, setSkillName] = useState(skillsData.skillName);
    const [personSkillId, setPersonSkillId] = useState(skillsData.id);

    const handleSubmit = async (event) => {
  
      const formData = new FormData();
  
      formData.append("skillName", skillName);
      formData.append("personSkillId", personSkillId);
      try {
        const response = await fetch("http://localhost:3000/skills/update", {
          method: "PUT",
          body: formData,
        });
  
        const responseData = await response.json();
  
        if (!response.ok) {
          throw new Error(responseData.error);
        }
      } catch (error) {
        console.error("Error updating skill:", error);
      }
    };
  
    return (
      <dialog id={skillsData.id} className="modal">
        
        <div className="modal-box max-w-2xl bg-base-200">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
          <form onSubmit={handleSubmit}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-bold">Skill</span>
              </div>
            </label>
  
            <input
              type="text"
              id="skillname"
              placeholder="ex. Project Management"
              className="input input-bordered w-full text-center"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
            />
            <button type="submit" className={`btn btn-primary w-40 mt-5`}>
              Update
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
}

export default EditSkills