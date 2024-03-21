import React, { useState } from 'react'
import TopBar from './topbar';

const SkillsForm = () => {
  const [skillName, setSkillName] = useState("");
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();

    formData.append("skillName", skillName);
    try {
      const response = await fetch(
        "http://localhost:3000/skills/create",
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }
    } catch (error) {
      console.error("Error creating education:", error);
    }
  };




  return (
      <form onSubmit={handleSubmit} className="w-1/2">
        <div className="flex flex-col bg-base-200 shadow-xl p-10 mt-5 rounded-xl">
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
          <button type="submit" className={`btn btn-primary w-40 mt-5`}>Add Skill</button>

        </div>

      </form>
  )
}

export default SkillsForm