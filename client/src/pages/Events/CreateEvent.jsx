import React, { useState } from "react";
import TopBar from "../../components/topbar";
import InputFields from "../../components/InputFields";
import TextAreaInput from "../../components/TextAreaInput";
import DateTime from "react-datetime";
import { Routes, Route, useNavigate } from "react-router-dom";
import { formatDateToString } from "../../components/DateConverterFunction";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [endDate, setEndDate] = useState(new Date().toISOString());

  const [eventDetails, setEventDetails] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    // setIsSubmitting(true);
    // event.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append("eventPhoto", image);
    }
    formData.append("eventName", eventName);
    formData.append("eventLocation", location);
    formData.append("eventDesc", eventDetails);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    for (const value of formData.values()) {
      console.log(value);
    }
    try {
      const response = await fetch("http://localhost:3000/events/create", {
        method: "POST",
        body: formData,
        credentials:'include'
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }

      navigate(0)
    } catch (error) {
      // setIsSubmitting(false);
      console.error("Error creating person:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Function to reset file input
    const resetFileInput = () => {
      event.target.value = null; // This clears the selected file
      setImage(null);
      // setImagePreviewUrl(null); // Clear the image preview URL
    };

    // Check if file is selected
    if (!file) {
      resetFileInput();
      return;
    }

    // Check the file type
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setToastMessage("Please upload an image in JPG or PNG format.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      resetFileInput();
      return;
    }

    // Check the file size (3 MB in bytes)
    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      setToastMessage("File size should be less than 3 MB.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      resetFileInput();
      return;
    }

    // If file is valid, update the image state and set image preview URL
    setImage(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    // Resetting the file input if needed
    document.getElementById("fileInput").value = "";
  };

  const handleEndDate = (endDate) => {
    const end = endDate.toISOString();
    setEndDate(end);
  };

  const handleStartDate = (startDate) => {
    const start = startDate.toISOString();
    setStartDate(start);
  };

  return (
    <dialog id="new_event_form" className="modal">
      <div className="modal-box w-11/12 max-w-5xl mt-10 bg-neutral overflow-scroll">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="col-span-2">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-semibold">Event Name</span>
                </div>
              </label>

              <input
                type="text"
                id="eventName"
                placeholder="Name of Event"
                className="input input-bordered w-full col-span-2"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>

            <div className="col-span-2">
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text font-semibold">Location</span>
                  </div>
                </label>

                <div className="grid grid-cols-2 gap-2 w-full">
                  <input
                    type="text"
                    id="location"
                    placeholder="ex. Arrupe Hall"
                    className="input input-bordered w-full col-span-2"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-row w-full gap-5">
                <div className="flex flex-col">
                <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-semibold">
                    Start Date
                  </span>
                </div>
              </label>

              <DateTime
                id="date"
                dateFormat="MM-DD-YYYY"
                selected={startDate}
                timeFormat={true}
                onChange={handleStartDate}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                inputProps={{
                  placeholder: formatDateToString(startDate),
                  className:
                    "flex flex-col w-full justify-center items-center input input-bordered bg-white text-center placeholder-black",
                }}
              />
                </div>

                <div className="flex flex-col">
                <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-semibold">
                    End Date
                  </span>
                </div>
              </label>

              <DateTime
                id="date"
                dateFormat="MM-DD-YYYY"
                selected={endDate}
                timeFormat={true}
                onChange={handleEndDate}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                inputProps={{
                  placeholder: formatDateToString(endDate),
                  className:
                    "flex flex-col w-full justify-center items-center input input-bordered bg-white text-center placeholder-black",
                }}
              />
                </div>

              </div>

              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text font-bold">Image</span>
                  </div>
                </label>
                <input
                  type="file"
                  id="eventPhoto"
                  className="file-input file-input-bordered w-full max-w-xs"
                  onChange={handleFileChange}
                />
                {image && (
                  <button
                    onClick={handleRemoveImage}
                    className="btn btn-error text-white ml-3"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              <label className="form-control w-full max-w-xs col-span-2">
                <div className="label">
                  <span className="label-text font-semibold">
                    Event Details
                  </span>
                </div>
              </label>
              <textarea
                id="eventdetails"
                placeholder="Details of the event"
                className="textarea textarea-bordered textarea-md w-full h-72"
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-40 mt-10 col-span-2`}
            >
              Create Event
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default CreateEvent;
