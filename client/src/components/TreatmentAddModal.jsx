import React, { useState, useEffect } from "react";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";
import patientRecord from "../pages/PatientRecord.jsx";

function TreatmentAddModal({
  propTreatmentData,
  propEditMode,
  propSetEditMode,
  propSetModalVisible,
  propSetTreatmentData,
  propFetchTreatmentList,
  propSetAddSuccess,
  propSetUpdateSucess,
}) {
  const [treatmentName, setTreatmentName] = useState(
    propSetTreatmentData.treatment_name,
  );
  const [treatmentFee, setTreatmentFee] = useState(
    propSetTreatmentData.treatment_fee,
  );

  useEffect(() => {
    setTreatmentName(propTreatmentData.treatment_name);
    setTreatmentFee(propTreatmentData.treatment_fee);
  }, [propTreatmentData]);
  const handleSubmit = () => {
    // Check if treatmentName and treatmentFee are not empty
    if (!treatmentName || !treatmentFee) {
      console.error("Treatment name and fee are required");
      return;
    }

    // Create the request payload
    const requestBody = {
      treatment_name: treatmentName,
      treatment_fee: treatmentFee,
    };

    // Send a POST request to the backend endpoint
    fetch("http://localhost:3000/addTreatment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        propSetModalVisible(false);
        propFetchTreatmentList();
        propSetAddSuccess(true);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error adding treatment:", error.message);
      });
  };

  const handleEdit = () => {
    // Check if treatmentId, treatmentName, and treatmentFee are not empty
    if (!treatmentName || !treatmentFee) {
      console.error("Treatment name, and fee are required");
      return;
    }

    // Create the request payload
    const requestBody = {
      treatment_name: treatmentName,
      treatment_fee: treatmentFee,
    };

    // Send a PUT request to the backend endpoint for updating treatment
    fetch(
      `http://localhost:3000/updateTreatment/${propTreatmentData.treatment_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        propSetModalVisible(false);
        propSetEditMode(false);
        propFetchTreatmentList();
        propSetUpdateSucess(true);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error updating treatment:", error.message);
      });
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70 ">
        <div className="flex w-4/12 flex-col gap-2 rounded-lg border-2 bg-white">
          <div className="flex items-center justify-between border-b pl-8 pt-4">
            <h1 className="font-Montserrat text-xl font-bold uppercase">
              Treatment
            </h1>
            <button
              className="inline-flex items-center rounded-lg px-5 py-1 text-2xl text-gray-500 hover:text-black"
              onClick={() => {
                propSetModalVisible(false);
                propSetEditMode(false);
                propSetTreatmentData({});
              }}
            >
              <IoMdCloseCircle />
            </button>
          </div>
          <form
            className="flex w-5/6 flex-col gap-x-4 gap-y-5 self-center px-8 pb-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-3">
              <label className="mb-1 font-Karla text-base font-bold text-black">
                Treatment Name
              </label>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value={treatmentName}
                onChange={(e) => setTreatmentName(e.target.value)}
                required
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
              <label className="mb-1 font-Karla text-base font-bold text-black">
                Treatment Fee
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value={treatmentFee}
                onChange={(e) => setTreatmentFee(e.target.value)}
                required
                pattern="^\d+$"
                title="Please enter a valid number (digits only)"
              />
            </div>
            <button
              className="rounded-lg border-2 bg-custom-green px-5 py-1 text-lg  text-white hover:bg-green-600"
              onClick={propEditMode ? handleEdit : handleSubmit}
            >
              {propEditMode ? "Edit" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default TreatmentAddModal;
