import React, { useState, useEffect } from "react";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { PiKeyReturnBold } from "react-icons/pi";

function HealthHistoryModal({ propSetModalVisible, propPatientId }) {
  const [editMode, setEditMode] = useState(false);
  const [healthHistoryInfo, setHealthHistoryInfo] = useState({});

  const [isDiabetic, setIsDiabetic] = useState(false);
  const [isHypertensive, setIsHypertensive] = useState(false);
  const [healthConditions, setHealthConditions] = useState("");
  const [allergies, setAllergies] = useState("");
  const [maintenanceMeds, setMaintenanceMeds] = useState("");
  const [notes, setNotes] = useState("");

  const fetchHealthHistoryInfo = () => {
    fetch(`http://localhost:3000/patientHealthHistory/${propPatientId}`)
      .then((response) => response.json())
      .then((item) => {
        const info = {
          historyId: item.health_history_id,
          diabetic: item.diabetic,
          hypertensive: item.hypertensive,
          healthConditions: item.other_health_conditions,
          allergies: item.allergies,
          maintenanceMeds: item.maintenance_medicines,
          notes: item.notes,
        };
        setHealthHistoryInfo(info);
        console.log(info);
        console.log(info.historyId);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  };

  useEffect(() => {
    fetchHealthHistoryInfo();
  }, []);

  useEffect(() => {
    setIsDiabetic(healthHistoryInfo.diabetic);
    setIsHypertensive(healthHistoryInfo.hypertensive);
    setHealthConditions(healthHistoryInfo.healthConditions);
    setAllergies(healthHistoryInfo.allergies);
    setMaintenanceMeds(healthHistoryInfo.maintenanceMeds);
    setNotes(healthHistoryInfo.notes);
  }, [healthHistoryInfo]);

  const closeHealthHistoryModal = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
    setEditMode(false);
  };

  const handleEditSubmit = () => {
    // Assuming you have a state variable for the edited health history data
    const editedHealthHistoryData = {
      diabetic: isDiabetic,
      hypertensive: isHypertensive,
      other_health_conditions: healthConditions,
      allergies: allergies,
      maintenance_medicines: maintenanceMeds,
      notes: notes,
    };

    fetch(
      `http://localhost:3000/patientHealthHistory/${healthHistoryInfo.historyId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedHealthHistoryData),
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Health history updated:", data.message);
        // Additional logic if needed
      })
      .catch((error) => {
        console.error("Error updating health history:", error.message);
        // Handle error, show a notification, etc.
      })
      .finally(() => {
        // This block will be executed regardless of success or error
        setEditMode(false);
        fetchHealthHistoryInfo();
      });
  };

  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black bg-opacity-70 ">
        <div className="flex w-4/12 flex-col gap-2 rounded-lg border-2 bg-white">
          <div className="flex flex-wrap items-center justify-between border-b pl-8 pt-4">
            <h1 className="font-Montserrat text-xl font-bold uppercase">
              Health History
            </h1>
            <button
              className="inline-flex items-center rounded-lg px-5 py-1 text-2xl text-gray-500 hover:text-black"
              onClick={closeHealthHistoryModal}
            >
              <IoMdCloseCircle />
            </button>
          </div>
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
          <form
            className="flex w-5/6 flex-col gap-x-4 gap-y-5 self-center px-8 pb-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3">
              <div className="mb-1 font-Karla text-base font-bold text-black sm:col-span-1 lg:col-span-2">
                Diabetic
              </div>
              {editMode ? (
                <input
                  type="checkbox"
                  className="rounded-lg border-2 border-custom-blue"
                  checked={isDiabetic}
                  onChange={() => setIsDiabetic(!isDiabetic)}
                />
              ) : (
                <div
                  className={`mb-1 flex justify-center font-Karla text-base font-bold text-black ${
                    healthHistoryInfo.diabetic
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {healthHistoryInfo.diabetic ? "YES" : "NO"}
                </div>
              )}
            </div>
            <div className="grid sm:col-span-2 lg:grid-cols-3">
              <div className="mb-1 font-Karla text-base font-bold text-black sm:col-span-1 lg:col-span-2">
                Hypertensive
              </div>
              {editMode ? (
                <input
                  type="checkbox"
                  className="rounded-lg border-2 border-custom-blue"
                  checked={isHypertensive}
                  onChange={() => setIsHypertensive(!isHypertensive)}
                />
              ) : (
                <div
                  className={`mb-1 flex justify-center font-Karla text-base font-bold text-black ${
                    healthHistoryInfo.hypertensive
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {healthHistoryInfo.hypertensive ? "YES" : "NO"}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Other Health Conditions
              </div>
              {editMode ? (
                <textarea
                  className="w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                  rows="3"
                  cols="50"
                  value={healthConditions}
                  onChange={(e) => setHealthConditions(e.target.value)}
                />
              ) : (
                <div className="mb-1 font-Karla text-base text-black">
                  {healthHistoryInfo.healthConditions}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Allergies
              </div>
              {editMode ? (
                <textarea
                  className="w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                  rows="3"
                  cols="50"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                />
              ) : (
                <div className="mb-1 font-Karla text-base text-black">
                  {healthHistoryInfo.allergies}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Maintenance Medicine
              </div>
              {editMode ? (
                <textarea
                  className="w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                  rows="3"
                  cols="50"
                  value={maintenanceMeds}
                  onChange={(e) => setMaintenanceMeds(e.target.value)}
                />
              ) : (
                <div className="mb-1 font-Karla text-base text-black">
                  {healthHistoryInfo.maintenanceMeds}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Notes
              </div>
              {editMode ? (
                <textarea
                  className="w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                  rows="3"
                  cols="50"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              ) : (
                <div className="mb-1 font-Karla text-base text-black">
                  {healthHistoryInfo.notes}
                </div>
              )}
            </div>
          </form>

          {editMode && (
            <div className="mb-5 mt-3 flex w-full justify-center">
              <button
                className="rounded-lg border-2 bg-custom-green px-5 py-1 text-lg  text-white hover:bg-green-600"
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

export default HealthHistoryModal;
