import React from "react";
import DateToWords from "../../components/DateFormatter";

const DeleteEducation = ({ education, handleDelete }) => {
  return (
    <dialog id={education.degreeId} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-3 border-b-2">Delete Education?</h3>
        <p>{education.id}</p>
        <p className=" text-md font-semibold">{education.schoolName}</p>
        <p className=" text-md">{education.degree.degreeName}</p>
        <p className=" text-md">QPI: {education.qpi}</p>
        <div className="flex flex-row gap-1">
          <span className="font-thin">
            <DateToWords dateString={education.startDate} />
              </span>
          <span className="font-thin">-</span>
          <span className="font-thin">
            <DateToWords dateString={education.endDate} />
          </span>
        </div>

        <div className="modal-action ">
          <form method="dialog">
            <button
              className="btn btn-error text-white"
              onClick={() => handleDelete(education.id)}
            >
              Archive
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

export default DeleteEducation;
