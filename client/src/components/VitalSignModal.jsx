import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

function VitalSignModal({
  isVisible,
  onClose,
  visitId,
  propFetchVitalSign,
  propVisitId,
}) {
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
    };

    // Send POST request to server
    fetch(`http://localhost:3000/addVitalSigns/${propVisitId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        propFetchVitalSign();
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
        <div className="flex w-[400px] flex-col">
          {/* Close Button */}
          <button
            className=" place-self-end text-xl text-white"
            onClick={() => onClose()}
          >
            <IoMdCloseCircleOutline />
          </button>
          <div className="rounded-md bg-white p-4">
            {/* Temperature input box */}
            <div className="mb-4">
              <input
                id="temperature"
                className="h-10  w-full rounded-lg border border-gray-300 pl-3"
                type="number"
                min={0}
                placeholder="Temperature"
              />
            </div>
            {/* Pulse rate input box */}
            <div className="mb-4">
              <input
                id="pulseRate"
                className="h-10  w-full rounded-lg border border-gray-300 pl-3"
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
                  className="h-10  w-full rounded-lg border border-gray-300 pl-3"
                  type="text"
                  min={0}
                  placeholder="Systolic BP"
                />
              </div>
              {/* Blood pressure input box */}
              <div className="mb-4">
                <input
                  id="diastolicBP"
                  className="h-10  w-full rounded-lg border border-gray-300 pl-3"
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
                className="h-10  w-full rounded-lg border border-gray-300 pl-3"
                type="time"
                placeholder="Time"
              />
            </div>

            {/* Submit button */}
            <div className="mt-5 flex justify-center">
              <button
                className="h-10 w-52 rounded-lg border-2  bg-green-400 text-white hover:bg-green-600"
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
