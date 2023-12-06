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

  const handleSubmit = () => {
    // Gather values from input fields
    const dateVisit = document.getElementById("dateVisit").value;
    const visitPurpose = document.getElementById("visitPurpose").value;
    const treatment = document.getElementById("treatment").value;
    const prescription = document.getElementById("prescription").value;
    const notes = document.getElementById("notes").value;
    const additionalFees = document.getElementById("additionalFees").value;
    const discount = document.getElementById("discount").value;
    const amountPaid = document.getElementById("amountPaid").value;

    // Prepare data for POST request
    const formData = {
      date_visit: dateVisit,
      visit_purpose: visitPurpose,
      treatment: treatment,
      prescription: prescription,
      notes: notes,
      additional_fees: additionalFees,
      discount: discount,
      amount_paid: amountPaid,
      patient_id: 1, // Assuming you have a way to get the patient ID
    };

    // Send POST request to server
    fetch("http://localhost:3000/addVisit", {
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
                  id="dateVisit"
                  className="w-full pl-3 rounded-lg border border-gray-300 h-10"
                  type="date"
                />
              </div>
              {/* Visit purpose input box */}
              <div>
                <input
                  id="visitPurpose"
                  className="w-full pl-3 rounded-lg border border-gray-300 h-10"
                  type="text"
                  placeholder="Visit Purpose"
                />
              </div>
              {/* Treatment input box */}
              <div>
                <input
                  id="treatment"
                  className="w-full pl-3 rounded-lg border border-gray-300 h-10"
                  type="text"
                  placeholder="Treatment"
                />
              </div>
              {/* Prescription input box */}
              <div>
                <input
                  id="prescription"
                  className="w-full  pl-3 rounded-lg border border-gray-300 h-10"
                  type="text"
                  placeholder="Prescription"
                />
              </div>
              {/* Notes input box */}
              <div>
                <input
                  id="notes"
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
                  id="additionalFees"
                  className="w-full  pl-3 rounded-lg border border-gray-300 h-10"
                  type="number"
                  min={0}
                  placeholder="Additional Fee"
                />
              </div>
              {/* Discount input box */}
              <div>
                <input
                  id="discount"
                  className="w-full  pl-3 rounded-lg border border-gray-300 h-10"
                  type="number"
                  min={0}
                  placeholder="Discount"
                />
              </div>
              {/* Amount paid input box */}
              <div>
                <input
                  id="amountPaid"
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

export default AddVisitModal;
