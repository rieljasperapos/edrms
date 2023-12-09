import React, { useState, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

function AddVisitModal({
  isVisible,
  onClose,
  propFetchVisitTable,
  propPatientId,
}) {
  if (!isVisible) return null;

  const [treatmentOptions, setTreatmentOptions] = useState([]);
  const [selectedTreatments, setSelectedTreatments] = useState([]);

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
        // Handle the error gracefully, e.g., set an empty array for treatmentOptions
        setTreatmentOptions([]);
      });
  }, []); // Empty dependency array ensures the effect runs once on mount

  const handleTreatmentChange = (event) => {
    const value = event.target.value;

    if (event.target.checked) {
      setSelectedTreatments((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedTreatments((prevSelected) =>
        prevSelected.filter((treatment) => treatment !== value),
      );
    }
  };

  const mapIdsToNames = (ids) => {
    return ids.map((id) => {
      const treatment = treatmentOptions.find(
        (option) => option.treatment_id === parseInt(id, 10),
      );
      return treatment ? treatment.treatment_name : ""; // Use empty string if treatment is not found
    });
  };

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
      prescription: prescription,
      notes: notes,
      additional_fees: additionalFees,
      discount: discount,
      amount_paid: amountPaid,
      treatments: selectedTreatments,
    };

    // Send POST request to server
    fetch(`http://localhost:3000/addVisit/${propPatientId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        propFetchVisitTable();
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
              <div>
                <input
                  id="dateVisit"
                  className="h-10 w-full rounded-lg border border-gray-300 pl-3"
                  type="date"
                />
              </div>
              {/* Visit purpose input box */}
              <div>
                <input
                  id="visitPurpose"
                  className="h-10 w-full rounded-lg border border-gray-300 pl-3"
                  type="text"
                  placeholder="Visit Purpose"
                />
              </div>
              {/* Prescription input box */}
              <div>
                <input
                  id="prescription"
                  className="h-10  w-full rounded-lg border border-gray-300 pl-3"
                  type="text"
                  placeholder="Prescription"
                />
              </div>
              {/* Notes input box */}
              <div>
                <input
                  id="notes"
                  className="h-10  w-full rounded-lg border border-gray-300 pl-3"
                  type="text"
                  placeholder="Notes"
                />
              </div>
              {/* Treatment checkboxes */}
              <div className="h30 w-full rounded-lg border border-gray-300 pl-3">
                <label htmlFor="treatment" className="text-l text-neutral-400">
                  Select Treatment
                </label>
                {treatmentOptions.map((option) => (
                  <div
                    key={option.treatment_id}
                    className="flex flex-row gap-3"
                  >
                    <input
                      className=""
                      type="checkbox"
                      id="treatment"
                      value={option.treatment_id}
                      onChange={handleTreatmentChange}
                      checked={selectedTreatments.includes(
                        option.treatment_name,
                      )}
                    />
                    <label htmlFor={option.treatment_id}>
                      {option.treatment_name}
                    </label>
                  </div>
                ))}
              </div>
              {/* Display selected treatments in a textarea */}
              <div>
                <textarea
                  placeholder="Selected Treatment"
                  value={mapIdsToNames(selectedTreatments).join(", ")} // Display selected treatment names as a comma-separated string
                  readOnly
                  className="h-20 w-full rounded-lg border border-gray-300 pl-3"
                />
              </div>
            </div>

            <hr className="my-2 my-6 border-gray-300" />

            <div className="grid grid-cols-2 gap-4">
              {/* Additional fee input box */}
              <div>
                <input
                  id="additionalFees"
                  className="h-10  w-full rounded-lg border border-gray-300 pl-3"
                  type="number"
                  min={0}
                  placeholder="Additional Fee"
                />
              </div>
              {/* Discount input box */}
              <div>
                <input
                  id="discount"
                  className="h-10  w-full rounded-lg border border-gray-300 pl-3"
                  type="number"
                  min={0}
                  placeholder="Discount"
                />
              </div>
              {/* Amount paid input box */}
              <div>
                <input
                  id="amountPaid"
                  className="h-10  w-full rounded-lg border border-gray-300 pl-3"
                  type="number"
                  min={0}
                  placeholder="Amount Paid"
                />
              </div>
            </div>
            {/* Submit button */}
            <div className="my-5 flex justify-center">
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

export default AddVisitModal;
