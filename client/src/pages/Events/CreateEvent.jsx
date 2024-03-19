import React, { useState } from "react";
import TopBar from "../../components/topbar";
import InputFields from "../../components/InputFields";
import TextAreaInput from "../../components/TextAreaInput";
import DateTime from "react-datetime";
import {Routes, Route, useNavigate} from 'react-router-dom';



const CreateEvent = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date().toISOString());
  const [eventDetails, setEventDetails] = useState("");
  const [image, setImage] = useState(null);



  const navigateHome = () => {
    // 👇️ navigate to /
    navigate('/eventslist');
  };
  const handleSubmit = async (event) => {
    // setIsSubmitting(true);
    event.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append('eventPhoto', image);
    }
    formData.append("eventName", eventName);
    formData.append("eventLocation",location);
    formData.append("eventDesc", eventDetails);
    formData.append("eventDateTime", date);

    for (const value of formData.values()) {
      console.log(value);
    }
    try {
      const response = await fetch("http://localhost:3000/events/create", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error);
      }else{
        navigateHome()
      }

      const newArticleId = responseData.id;
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

  const handleDate = (endDate) => {
    const end = endDate.toISOString();
    setDate(end);
  };

  return (
    <div className="w-9/12 bg-neutral  h-screen flex flex-col items-center overflow-auto">
      <TopBar />

      <form className="w-2/3" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 bg-base-200 shadow-xl p-10 mt-5 mb-5 rounded-xl gap-2">
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

            <DateTime
              id="date"
              selected={date}
              timeFormat={true}
              onChange={handleDate}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
              inputProps={{
                placeholder: "Date of Event",
                className:
                  "flex flex-col w-full justify-center items-center input input-bordered bg-white text-center mt-5",
              }}
            />

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
                <span className="label-text font-semibold">Event Details</span>
              </div>
            </label>
            <textarea
              id="eventdetails"
              placeholder="Details of the event"
              className="textarea textarea-bordered textarea-md w-full h-60"
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
  );
};

export default CreateEvent;
