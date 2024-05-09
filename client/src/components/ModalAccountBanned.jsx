import React from 'react'

const ModalAccountBanned = ({setErrorMessage}) => {
  return (
    <dialog id="banned" className="modal">
    <div className="modal-box max-w-lg bg-base-200">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => setErrorMessage({ banned: "" })}
        >
          ✕
        </button>
      </form>
      <h3 className="font-bold text-lg">Account is BANNED</h3>
      <p className="pb-4">Contact administrator</p>
    </div>
    <form method="dialog" className="modal-backdrop">
      <button onClick={() => setErrorMessage({ banned: "" })}>
        close
      </button>
    </form>
  </dialog>
  )
}

export default ModalAccountBanned