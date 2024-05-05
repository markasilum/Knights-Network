import React from 'react'

const ModalValidationError = ({errorMessage,setErrors}) => {
  return (
    <dialog id="validationerror" className="modal">
      <div className="modal-box max-w-lg bg-base-200">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setErrors({ validation: "" })}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Error 400</h3>
        <p className="pt-4">{errorMessage}</p>
        
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setErrors({ validation: "" })}>
          close
        </button>
      </form>
    </dialog>
  )
}

export default ModalValidationError