import React, { useState, useEffect } from "react";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { PiKeyReturnBold } from "react-icons/pi";
import { AiOutlinePlus } from "react-icons/ai";

function AccountViewModal({
  propAccountData,
  propFetchAccountsList,
  propSetVisibleAccountView,
}) {
  const [editMode, setEditMode] = useState(false);

  const closeAccountViewModal = () => {
    // Close the modal by setting its visibility to false
    propSetVisibleAccountView(false);
    setEditMode(false);
  };

  // const handleEditSubmit = () => {
  //   // Assuming you have a state variable for the edited health history data
  //   const editedHealthHistoryData = {
  //     diabetic: isDiabetic,
  //     hypertensive: isHypertensive,
  //     other_health_conditions: healthConditions,
  //     allergies: allergies,
  //     maintenance_medicines: maintenanceMeds,
  //     notes: notes,
  //   };
  //
  //   fetch(
  //     `http://localhost:3000/patientHealthHistory/${healthHistoryInfo.historyId}`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(editedHealthHistoryData),
  //     },
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Health history updated:", data.message);
  //       // Additional logic if needed
  //     })
  //     .catch((error) => {
  //       console.error("Error updating health history:", error.message);
  //       // Handle error, show a notification, etc.
  //     })
  //     .finally(() => {
  //       // This block will be executed regardless of success or error
  //       setEditMode(false);
  //       propFetchAccountsList();
  //     });
  // };

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-70 ">
        <div className="flex w-5/12 flex-col gap-2 rounded-lg border-2 bg-white">
          <div className="flex flex-col">
            <button
              className="self-end rounded-lg pr-1 pt-1 text-2xl text-gray-500 hover:text-black"
              onClick={closeAccountViewModal}
            >
              <IoMdCloseCircle />
            </button>
            <div className="flex flex-wrap items-center justify-between border-b pb-2 pl-8 pt-2">
              <h1 className="font-Montserrat text-xl font-bold uppercase">
                {propAccountData.last_name}, {propAccountData.first_name}
              </h1>
              <div className="flex">
                {!editMode && (
                  <div className="self-end pr-8">
                    <button
                      className="flex items-center gap-1 font-Karla text-xl text-green-500 hover:text-green-800 hover:underline"
                      onClick={() => {
                        setEditMode(true);
                      }}
                    >
                      <FaEdit />
                      Edit
                    </button>
                  </div>
                )}
                {editMode && (
                  <div className="self-end pr-8">
                    <button
                      className="flex items-center gap-1 font-Karla text-xl text-blue-900 hover:text-green-800 hover:underline"
                      onClick={() => {
                        setEditMode(false);
                      }}
                    >
                      <PiKeyReturnBold className="text-2xl" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-4 gap-y-5 px-8 py-4">
            <div className="col-span-1">
              <div className="mb-1 font-Karla text-base font-bold text-black ">
                ID
              </div>
              <div className="font-Karla text-lg uppercase">
                {propAccountData.account_id}
              </div>
            </div>
            <div className="col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black ">
                Username
              </div>
              <div className="font-Karla text-lg">
                {propAccountData.username}
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-1 font-Karla text-base font-bold text-black ">
                First Name
              </div>
              <div className="font-Karla text-lg uppercase">
                {propAccountData.first_name}
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Last Name
              </div>
              <div className="font-Karla text-lg uppercase">
                {propAccountData.last_name}
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Middle Name
              </div>
              <div className="font-Karla text-lg uppercase">
                {propAccountData.middle_name}
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Birthdate
              </div>
              <div className="font-Karla text-lg uppercase">
                {propAccountData.birthdate}
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Admin
              </div>
              <div
                className={`font-Karla text-lg uppercase ${
                  propAccountData.is_admin
                    ? "font-bold text-green-500"
                    : "font-bold text-red-500"
                }`}
              >
                {propAccountData.is_admin ? "YES" : "NO"}
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Deactivation Status
              </div>
              <div
                className={`font-Karla text-lg uppercase ${
                  propAccountData.is_deactivated
                    ? "font-bold text-red-500"
                    : "font-bold text-green-500"
                }`}
              >
                {propAccountData.is_deactivated ? "YES" : "NO"}
              </div>
            </div>
          </div>

          {/*{editMode && (*/}
          {/*  <div className="mb-5 mt-3 flex w-full justify-center">*/}
          {/*    <button*/}
          {/*      className="rounded-lg border-2 bg-custom-green px-5 py-1 text-lg  text-white hover:bg-green-600"*/}
          {/*      onClick={handleEditSubmit}*/}
          {/*    >*/}
          {/*      Edit*/}
          {/*    </button>*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      </div>
    </>
  );
}

export default AccountViewModal;
