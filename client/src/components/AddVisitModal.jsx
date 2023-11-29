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
      <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center">
        <div className="w-[600px] flex flex-col">
          {/* Close Button */}
          <button
            className=" text-white text-xl place-self-end"
            onClick={() => onClose()}
          >
            <IoMdCloseCircleOutline />
          </button>
          {/* Modal content */}
          <div className="bg-white p-4 rounded-md ">
            <div className="grid grid-cols-2 gap-4">
              {/* Date picker */}
              {/* <div className=" w-72 mr-3 pr-4">
                <Datepicker
                  options={{}}
                  onChange={handleChange}
                  show={showDatePicker}
                  setShow={handleCloseDatePicker}
                />
              </div> */}
              <div>
                <input
                  className="w-full pl-3 rounded-lg border border-gray-300 h-10"
                  type="date"
                />
              </div>
              {/* Visit purpose input box */}
              <div>
                <input
                  className="w-full pl-3 rounded-lg border border-gray-300 h-10"
                  type="text"
                  placeholder="Visit Purpose"
                />
              </div>
              {/* Treatment input box */}
              <div>
                <input
                  className="w-full pl-3 rounded-lg border border-gray-300 h-10"
                  type="text"
                  placeholder="Treatment"
                />
              </div>
              {/* Prescription input box */}
              <div>
                <input
                  className="w-full  pl-3 rounded-lg border border-gray-300 h-10"
                  type="text"
                  placeholder="Prescription"
                />
              </div>
              {/* Notes input box */}
              <div>
                <input
                  className="w-full  pl-3 rounded-lg border border-gray-300 h-10"
                  type="text"
                  placeholder="Notes"
                />
              </div>
            </div>

            <hr className="my-2 border-gray-300 my-6" />

            <div className="grid grid-cols-2 gap-4">
              {/* Additional fee input box */}
              <div>
                <input
                  className="w-full  pl-3 rounded-lg border border-gray-300 h-10"
                  type="number"
                  min={0}
                  placeholder="Additional Fee"
                />
              </div>
              {/* Discount input box */}
              <div>
                <input
                  className="w-full  pl-3 rounded-lg border border-gray-300 h-10"
                  type="number"
                  min={0}
                  placeholder="Discount"
                />
              </div>
              {/* Amount paid input box */}
              <div>
                <input
                  className="w-full  pl-3 rounded-lg border border-gray-300 h-10"
                  type="number"
                  min={0}
                  placeholder="Amount Paid"
                />
              </div>
              {/* Balance input box */}
              {/* <div>
                <input
                  className="w-full  pl-3 rounded-lg border border-gray-300 h-10"
                  type="number"
                  min={0}
                  placeholder="Balance"
                />
              </div> */}
            </div>
            {/* Submit button */}
            <div className="my-5 flex justify-center">
              <button className="rounded-lg border-2 h-10 w-52  bg-green-400 hover:bg-green-600 text-white">
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
