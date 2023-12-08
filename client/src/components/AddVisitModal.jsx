import React, { useState, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

function AddVisitModal({ isVisible, onClose }) {
  if (!isVisible) return null;

  const [treatmentOptions, setTreatmentOptions] = useState([]);

  useEffect(() => {
    // Fetch treatment options when the component mounts
    fetch("http://localhost:3000/treatmentDropdownOptions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTreatmentOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching treatment options: ", error);
      });
  }, []);

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
      patient_id: 1, // Assuming there is a way to get the patient ID
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
        console.log(data);
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error:", error);
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
              {/* Treatment drop down */}
              <div>
                <select
                  id="treatment"
                  className="w-full pl-3 rounded-lg border border-gray-300 h-10"
                  defaultValue="" // Set the default value here
                >
                  <option value="" disabled>
                    Select Treatment
                  </option>
                  {treatmentOptions.map((option) => (
                    <option
                      key={option.treatment_id}
                      value={option.treatment_name}
                    >
                      {option.treatment_name} - ₱ {option.treatment_fee}
                    </option>
                  ))}
                </select>
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
