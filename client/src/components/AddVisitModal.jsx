import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Datepicker from "tailwind-datepicker-react";

function AddVisitModal({ isVisible, onClose }) {
  if (!isVisible) return null;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleChange = (selectedDate) => {
    console.log(selectedDate);
  };
  const handleCloseDatePicker = (state) => {
    setShowDatePicker(state);
  };
  const options = {};

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
        <div className="flex w-[600px] flex-col">
          {/* Close Button */}
          <button
            className=" place-self-end text-xl text-white"
            onClick={() => onClose()}
          >
            <IoMdCloseCircleOutline />
          </button>
          {/* Modal content */}
          <div className="rounded-md bg-white p-4 ">
            <div className="grid grid-cols-2 gap-4">
              {/* Date picker */}
              <div className=" mr-3 w-72 pr-4">
                <Datepicker
                  options={{}}
                  onChange={handleChange}
                  show={showDatePicker}
                  setShow={handleCloseDatePicker}
                />
              </div>
              {/* Visit purpose input box */}
              <div>
                <input
                  className="h-10 w-full rounded-lg border border-gray-300 pl-3"
                  type="text"
                  placeholder="Visit Purpose"
                />
              </div>
              {/* Treatment input box */}
              <div>
                <input
                  className="h-10 w-full rounded-lg border border-gray-300 pl-3"
                  type="text"
                  placeholder="Treatment"
                />
              </div>
              {/* Prescription input box */}
              <div>
                <input
                  className="h-10  w-full rounded-lg border border-gray-300 pl-3"
                  type="text"
                  placeholder="Prescription"
                />
              </div>
              {/* Notes input box */}
              <div>
                <input
                  className="h-10  w-full rounded-lg border border-gray-300 pl-3"
                  type="text"
                  placeholder="Notes"
                />
              </div>
            </div>

            <hr className="my-2 my-6 border-gray-300" />

            <div className="grid grid-cols-2 gap-4">
              {/* Total fee input box */}
              <div>
                <input
                  className="h-10  w-full rounded-lg border border-gray-300 pl-3"
                  type="number"
                  min={0}
                  placeholder="Total Fee"
                />
              </div>
              {/* Discount input box */}
              <div>
                <input
                  className="h-10  w-full rounded-lg border border-gray-300 pl-3"
                  type="number"
                  min={0}
                  placeholder="Discount"
                />
              </div>
              {/* Amount paid input box */}
              <div>
                <input
                  className="h-10  w-full rounded-lg border border-gray-300 pl-3"
                  type="number"
                  min={0}
                  placeholder="Amount Paid"
                />
              </div>
              {/* Balance input box */}
              <div>
                <input
                  className="h-10  w-full rounded-lg border border-gray-300 pl-3"
                  type="number"
                  min={0}
                  placeholder="Balance"
                />
              </div>
            </div>
            {/* Submit button */}
            <div className="my-5 flex justify-center">
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

export default AddVisitModal;
