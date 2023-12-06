import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

function VitalSignModal({ isVisible, onClose, visitId }) {
  if (!isVisible) return null;

  const handleSubmit = () => {
    // Gather values from input fields
    const temperature = document.getElementById("temperature").value;
    const pulseRate = document.getElementById("pulseRate").value;
    const systolicBP = document.getElementById("systolicBP").value;
    const diastolicBP = document.getElementById("diastolicBP").value;
    const timeTaken = document.getElementById("timeTaken").value;

    // Prepare data for POST request
    const formData = {
      temperature: temperature,
      pulse_rate: pulseRate,
      systolic_bp: systolicBP,
      diastolic_bp: diastolicBP,
      time_taken: timeTaken,
      visit_id: 1, // Assuming there is a way to get the visit ID
    };

    // Send POST request to server
    fetch("http://localhost:3000/addVitalSigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, you can close the modal or show a success message
        console.log(data);
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error, show an error message, etc.
      });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center">
        <div className="w-[400px] flex flex-col">
          {/* Close Button */}
          <button
            className=" text-white text-xl place-self-end"
            onClick={() => onClose()}
          >
            <IoMdCloseCircleOutline />
          </button>
          <div className="bg-white p-4 rounded-md">
            {/* Temperature input box */}
            <div className="mb-4">
              <input
                id="temperature"
                className="w-full  pl-3 rounded-lg border border-gray-300 h-10"
                type="number"
                min={0}
                placeholder="Temperature"
              />
            </div>
            {/* Pulse rate input box */}
            <div className="mb-4">
              <input
                id="pulseRate"
                className="w-full  pl-3 rounded-lg border border-gray-300 h-10"
                type="number"
                min={0}
                placeholder="Pulse Rate"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Blood pressure input box */}
              <div className="mb-4">
                <input
                  id="systolicBP"
                  className="w-full  pl-3 rounded-lg border border-gray-300 h-10"
                  type="text"
                  min={0}
                  placeholder="Systolic BP"
                />
              </div>
              {/* Blood pressure input box */}
              <div className="mb-4">
                <input
                  id="diastolicBP"
                  className="w-full  pl-3 rounded-lg border border-gray-300 h-10"
                  type="text"
                  min={0}
                  placeholder="Diastolic BP"
                />
              </div>
            </div>
            {/* Time input box */}
            <div className="mb-4">
              <input
                id="timeTaken"
                className="w-full  pl-3 rounded-lg border border-gray-300 h-10"
                type="time"
                placeholder="Time"
              />
            </div>

            {/* Submit button */}
            <div className="mt-5 flex justify-center">
              <button
                className="rounded-lg border-2 h-10 w-52  bg-green-400 hover:bg-green-600 text-white"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VitalSignModal;
