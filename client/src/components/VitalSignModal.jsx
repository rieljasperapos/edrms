import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

function VitalSignModal({ isVisible, onClose }) {
  if (!isVisible) return null;

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
                className="h-10  w-full rounded-lg border border-gray-300 pl-3"
                type="number"
                min={0}
                placeholder="Temperature"
              />
            </div>
            {/* Pulse rate input box */}
            <div className="mb-4">
              <input
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
                  className="h-10  w-full rounded-lg border border-gray-300 pl-3"
                  type="text"
                  min={0}
                  placeholder="Systolic BP"
                />
              </div>
              {/* Blood pressure input box */}
              <div className="mb-4">
                <input
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
                className="h-10  w-full rounded-lg border border-gray-300 pl-3"
                type="time"
                placeholder="Time"
              />
            </div>

            {/* Submit button */}
            <div className="mt-5 flex justify-center">
              <button className="h-10 w-52 rounded-lg border-2  bg-green-400 text-white hover:bg-green-600">
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
