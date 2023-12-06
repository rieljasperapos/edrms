import React, { useState, useEffect } from "react";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";
import patientRecord from "../pages/PatientRecord.jsx";

function InsuranceInfoAddModal({
  propSetModalVisible,
  propEditMode,
  propSetEditMode,
  propPatientId,
  propFetchInsuranceList,
}) {
  const [insuranceCompany, setInsuranceCompany] = useState("");
  const [insuranceId, setInsuranceId] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [companyEmployed, setCompanyEmployed] = useState("");
  const [editMode, setEditMode] = useState(propEditMode);

  const isInsuranceFormValid = () => {
    // Check if insuranceCompany, insuranceId, and expirationDate have non-empty values
    const areRequiredFieldsValid =
      insuranceCompany.trim() !== "" && expirationDate.trim() !== "";

    // Check if insuranceId contains only numeric characters
    const isInsuranceIdValid = /^\d+$/.test(insuranceId);

    return areRequiredFieldsValid && isInsuranceIdValid;
  };

  const handleInputChange = (event, setterFunction) => {
    setterFunction(event.target.value);
  };

  const closeInsuranceModal = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
    propSetEditMode(false);
  };

  const handleSubmitInsurance = () => {
    if (!isInsuranceFormValid()) {
      console.log("Please fill up the form");
      return;
    }
    const formData = {
      insuranceCompany: insuranceCompany.trim(),
      insuranceIdNum: insuranceId.trim(),
      expirationDate: expirationDate.trim(),
      companyEmployed: companyEmployed.trim(),
    };

    fetch(`http://localhost:3000/patientRecordInsuranceInfo/${propPatientId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response from the server
        // Redirect to the '/patientRecordList' route
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // Handle or display an error message to the user
      })
      .finally(() => {
        propFetchInsuranceList();
        // Close the modal by setting its visibility to false
        propSetModalVisible(false);
      });
  };

  const handleEditInsurance = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
    propSetEditMode(false);
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70 ">
        <div className="flex w-4/12 flex-col gap-2 rounded-lg border-2 bg-white">
          <div className="flex items-center justify-between border-b pl-8 pt-4">
            <h1 className="font-Montserrat text-xl font-bold uppercase">
              Insurance Information
            </h1>
            <button
              className="inline-flex items-center rounded-lg px-5 py-1 text-2xl text-gray-500 hover:text-black"
              onClick={closeInsuranceModal}
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
                Insurance Company
              </label>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value={insuranceCompany}
                onChange={(event) =>
                  handleInputChange(event, setInsuranceCompany)
                }
                required
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
              <label className="mb-1 font-Karla text-base font-bold text-black">
                Insurance ID number
              </label>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value={insuranceId}
                onChange={(event) => handleInputChange(event, setInsuranceId)}
                required
                pattern="^\d+$"
                title="Please enter a valid number (digits only)"
                placeholder="1234567890"
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
              <label className="mb-1 font-Karla text-base font-bold text-black">
                Expiration Date
              </label>
              <input
                type="date"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value={expirationDate}
                onChange={(event) =>
                  handleInputChange(event, setExpirationDate)
                }
                required
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
              <label className="mb-1 font-Karla text-base font-bold text-black">
                Company
              </label>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value={companyEmployed}
                onChange={(event) =>
                  handleInputChange(event, setCompanyEmployed)
                }
              />
            </div>
            <button
              className="rounded-lg border-2 bg-custom-green px-5 py-1 text-lg  text-white hover:bg-green-600"
              onClick={editMode ? handleEditInsurance : handleSubmitInsurance}
            >
              {editMode ? "Edit" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default InsuranceInfoAddModal;
