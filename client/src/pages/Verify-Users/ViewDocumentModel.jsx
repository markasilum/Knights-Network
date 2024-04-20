import React from "react";

const ViewDocumentModal = ({ docId, documentPath }) => {
  return (
    <dialog id={docId} className="modal">
      <div className="modal-box w-11/12 max-w-5xl overflow-scroll">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {/* <h3 className="font-bold text-lg">{documentPath}</h3> */}
        <img className="w-auto h-auto" src={documentPath}/>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ViewDocumentModal;
