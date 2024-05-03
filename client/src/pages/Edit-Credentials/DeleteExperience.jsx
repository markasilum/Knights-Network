import React from "react";
import DateToWords from "../../components/DateFormatter";

const DeleteExperience = ({experience, handleDelete}) => {
  return (
    <dialog id={experience.jobTitle} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-3 border-b-2">Delete Experience?</h3>
        <p className=" text-md font-semibold">{experience.jobTitle}</p>
        <p className=" text-md">{experience.companyName}</p>
        <div className="flex flex-row gap-1">
          <span className="font-thin">
            <DateToWords dateString={experience.startDate} />
          </span>
          <span className="font-thin">-</span>
          <span className="font-thin">
            <DateToWords dateString={experience.endDate} />
          </span>
        </div>

        <div className="modal-action ">
          <form method="dialog">
            <button
              className="btn btn-error text-white"
              onClick={() => handleDelete(experience.id)}
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
  );
};

export default DeleteExperience;
