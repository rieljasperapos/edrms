import React, { useState, useEffect } from "react";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { PiKeyReturnBold } from "react-icons/pi";

function AccountViewModal({
  propAccountData,
  propFetchAccountsList,
  propSetVisibleAccountView,
}) {
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState(propAccountData.account_id);
  const [username, setUsername] = useState(propAccountData.username);
  const [firstName, setFirstName] = useState(propAccountData.first_name);
  const [lastName, setLastName] = useState(propAccountData.last_name);
  const [middleName, setMiddleName] = useState(propAccountData.middle_name);
  const [birthdate, setBirthdate] = useState("00-00-0000");

  const [key, setKey] = useState(0);

  const closeAccountViewModal = () => {
    // Close the modal by setting its visibility to false
    propSetVisibleAccountView(false);
    setEditMode(false);
  };

  useEffect(() => {
    setId(propAccountData.account_id);
    setUsername(propAccountData.username);
    setFirstName(propAccountData.first_name);
    setLastName(propAccountData.last_name);
    setMiddleName(propAccountData.middle_name);
    setBirthdate(convertDateFormat(propAccountData.birthdate));
  }, [propAccountData, editMode]);

  const convertDateFormat = (inputDate) => {
    // Check if inputDate is defined and is a non-empty string
    if (inputDate && typeof inputDate === "string" && inputDate.trim() !== "") {
      // Split the input date string into an array
      const dateArray = inputDate.split("-");

      // Rearrange the array elements to form the desired format "yyyy-mm-dd"
      const formattedDate = `${dateArray[2]}-${dateArray[0].padStart(
        2,
        "0",
      )}-${dateArray[1].padStart(2, "0")}`;

      return formattedDate;
    } else {
      // Handle the case where inputDate is not a valid string
      console.error("Invalid inputDate:", inputDate);
      return inputDate; // or return some default value or handle accordingly
    }
  };

  const handleEditSubmit = () => {
    // thes are the states make them to a single object
    const accountInfo = {
      username,
      firstName,
      lastName,
      middleName,
      birthdate,
    };

    fetch(`http://localhost:3000/updateProfile/${propAccountData.account_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountInfo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Account Data:", data.message);
        setEditMode(false);
        propFetchAccountsList();
      })
      .catch((error) => {
        console.error("Error updating Account Info:", error.message);
        // Handle error, show a notification, etc.
      })
      .finally(() => {
        // This block will be executed regardless of success or error
        setKey((prevKey) => prevKey + 1);
      });
  };

  return (
    <>
      <div
        key={key}
        className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-70 "
      >
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

          <form
            className="grid grid-cols-3 gap-x-4 gap-y-5 px-8 py-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="col-span-1">
              <label className="mb-1 font-Karla text-base font-bold text-black ">
                ID
              </label>
              <div className="font-Karla text-lg uppercase">{id}</div>
            </div>
            <div className="col-span-1">
              <label className="mbx`z`-1 font-Karla text-base font-bold text-black ">
                Username
              </label>
              {editMode ? (
                <input
                  className="w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              ) : (
                <div className="mb-1 font-Karla text-base text-black">
                  {propAccountData.username}
                </div>
              )}
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1">
              <label className="mb-1 font-Karla text-base font-bold text-black ">
                First Name
              </label>
              {editMode ? (
                <input
                  type="text"
                  className="w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              ) : (
                <div className="font-Karla text-lg uppercase">
                  {propAccountData.first_name}
                </div>
              )}
            </div>
            <div className="col-span-1">
              <label className="mb-1 font-Karla text-base font-bold text-black">
                Last Name
              </label>
              {editMode ? (
                <input
                  type="text"
                  className="w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              ) : (
                <div className="font-Karla text-lg uppercase">
                  {propAccountData.last_name}
                </div>
              )}
            </div>
            <div className="col-span-1">
              <label className="mb-1 font-Karla text-base font-bold text-black">
                Middle Name
              </label>
              {editMode ? (
                <input
                  type="text"
                  className="w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  required
                />
              ) : (
                <div className="font-Karla text-lg uppercase">
                  {propAccountData.middle_name}
                </div>
              )}
            </div>
            <div className="col-span-1">
              <label className="mb-1 font-Karla text-base font-bold text-black">
                Birthdate
              </label>
              {editMode ? (
                <input
                  type="date"
                  className="w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  required
                />
              ) : (
                <div className="font-Karla text-lg uppercase">
                  {propAccountData.birthdate}
                </div>
              )}
            </div>
            <div className="col-span-1">
              <label className="mb-1 font-Karla text-base font-bold text-black">
                Admin
              </label>
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
              <label className="mb-1 font-Karla text-base font-bold text-black">
                Deactivation Status
              </label>
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
          </form>

          {editMode && (
            <div className="mb-5 mt-3 flex w-full justify-center">
              <button
                className="w-2/12 rounded-lg border-2 bg-custom-green px-5 py-1 text-lg  text-white hover:bg-green-600"
                onClick={handleEditSubmit}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AccountViewModal;
