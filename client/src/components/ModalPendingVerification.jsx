import React from "react";

const ModalPendingVerification = ({setErrorMessage}) => {
  return (
    <dialog id="pendingVerification" className="modal">
      <div className="modal-box max-w-lg bg-base-200">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setErrorMessage({ verification: "" })}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="pt-4">
          We're still in the process of verifying your account.
        </p>
        <p className="pb-4">Thanks for your understanding.</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setErrorMessage({ verification: "" })}>
          close
        </button>
      </form>
    </dialog>
  );
};

export default ModalPendingVerification;
