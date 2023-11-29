import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

function VitalSignModal({ isVisible, onClose, visitId }) {
  if (!isVisible) return null;

  const [formData, setFormData] = useState({
    temperature: "",
    pulse_rate: "",
    systolic_bp: "",
    diastolic_bp: "",
    time_taken: "",
    visit_id: visitId,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.vale });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/addVitalSigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Vital signs added successfully");
    } catch (error) {
      console.error("Error adding vital signs:", error.message);
    }
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
                className="w-full  pl-3 rounded-lg border border-gray-300 h-10"
                type="number"
                min={0}
                placeholder="Temperature"
              />
            </div>
            {/* Pulse rate input box */}
            <div className="mb-4">
              <input
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
                  className="w-full  pl-3 rounded-lg border border-gray-300 h-10"
                  type="text"
                  min={0}
                  placeholder="Systolic BP"
                />
              </div>
              {/* Blood pressure input box */}
              <div className="mb-4">
                <input
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
