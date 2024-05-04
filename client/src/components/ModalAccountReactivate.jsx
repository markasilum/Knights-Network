import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const ModalAccountReactivate = ({ setErrorMessage, password, email }) => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const reactivate = async (passwordParam, emailParam) => {
    event.preventDefault();
    try {
      console.log("reactivate called");

      const response = await fetch("http://localhost:3000/user/reactivate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ passwordParam, emailParam }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }



      const loginResponse = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: emailParam, password: passwordParam }),
      });
      const loginResponseData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginResponseData.error);
      }

      if (response.ok) {
        console.log("ok");
        dispatch({ type: "LOGIN", payload: loginResponseData });

        if (
          loginResponseData.user.role.roleName == "alumni" ||
          loginResponseData.user.role.roleName == "student"
        ) {
          navigate("/profile");
        } else if (loginResponseData.user.role.roleName == "company") {
          navigate("/jobpost/dashboard");
        } else {
          navigate("/eventslist");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <dialog id="deactivated" className="modal">
      <div className="modal-box max-w-lg bg-base-200">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setErrorMessage({ deactivate: "" })}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Account is deactivated</h3>
        <p className="pt-4">Reactivate account?</p>
        <div className="modal-action">
          <form method="dialog">
            <button
              type="button"
              className={`btn btn-success w-40 mt-5 text-white`}
              onClick={() => reactivate(password, email)}
            >
              Reactivate
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setErrorMessage({ deactivate: "" })}>
          close
        </button>
      </form>
    </dialog>
  );
};

export default ModalAccountReactivate;
