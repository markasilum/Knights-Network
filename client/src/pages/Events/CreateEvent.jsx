import React, { useState } from "react";
import TopBar from "../../components/topbar";
import InputFields from "../../components/InputFields";
import TextAreaInput from "../../components/TextAreaInput";
import DateTime from "react-datetime";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [streetAddress, setStreetAdd] = useState("");
  const [cityName, setCityName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState(new Date().toISOString());
  const [eventDetails, setEventDetails] = useState("");
  const [image, setImage] = useState(null);



  const handleSubmit = async (event) => {
    // setIsSubmitting(true);
    event.preventDefault();

    const formData = new FormData();
    if (image) {
      formData.append('eventPhoto', image);
    }
    formData.append("eventName", eventName);
    formData.append(
      "eventLocation",
      streetAddress + ", " + cityName + ", " + zipCode + ", " + countryName
    );
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
                  id="streetAddress"
                  placeholder="House #, Street Name"
                  className="input input-bordered w-full col-span-2"
                  value={streetAddress}
                  onChange={(e) => setStreetAdd(e.target.value)}
                />
                <input
                  type="text"
                  id="cityName"
                  placeholder="City Name"
                  className="input input-bordered w-full "
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                />
                <input
                  type="text"
                  id="zipCode"
                  placeholder="Zip Code"
                  className="input input-bordered w-full"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
                <input
                  type="text"
                  id="countryName"
                  placeholder="Country Name"
                  className="input input-bordered w-full col-span-2"
                  value={countryName}
                  onChange={(e) => setCountryName(e.target.value)}
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
              className="textarea textarea-bordered textarea-md w-full h-40"
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
