import React, { useState, useEffect } from "react";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";

function TreatmentConfirmDelete({
  propSetModalVisible,
  propFetchTreatmentList,
  propDeleteData,
  propSetDeleteData,
  propSetDeleteSucess,
}) {
  const deleteTreatment = () => {
    // Send a DELETE request to the backend endpoint
    fetch(
      `http://localhost:3000/deleteTreatment/${propDeleteData.treatment_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
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
        // Fetch updated treatment list after deletion
        propSetModalVisible(false);
        propFetchTreatmentList();
        propSetDeleteSucess(true);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error deleting treatment:", error.message);
      });
  };
  const closeModal = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
    propSetDeleteData({});
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
        <div className="flex w-4/12 flex-col gap-2 rounded-lg border-2 bg-white">
          <div className="flex flex-wrap items-center justify-between border-b pl-8 pt-4">
            <h1 className="font-Montserrat text-xl font-bold uppercase">
              Delete Confirmation
            </h1>
            <button
              className="item1-center flex gap-2 rounded-lg px-5 py-1 text-2xl text-gray-500 hover:text-black hover:underline"
              onClick={closeModal}
            >
              <p className="text-base">Cancel</p>
              <IoMdCloseCircle />
            </button>
          </div>
          <div className="just flex flex-col px-8 pb-4">
            <div className="mb-1 font-Karla text-base font-bold text-black ">
              <p>Are you sure you want to DELETE the Treatment</p>
              <div className="self-center uppercase underline">
                {propDeleteData.treatment_name}
              </div>
            </div>
            <button
              className="rounded-lg border-2 bg-red-400 px-5 py-1 text-lg  text-white hover:bg-red-700"
              onClick={deleteTreatment}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TreatmentConfirmDelete;
