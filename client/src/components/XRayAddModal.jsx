import React, { useState, useEffect, useRef } from "react";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";
import { LuUpload } from "react-icons/lu";

function XrayAddModal({
  propSetModalVisible,
  propEditMode,
  propSetEditMode,
  propPatientId,
}) {
  const [editMode, setEditMode] = useState(propEditMode);

  const [type, setType] = useState("");
  const [dateTaken, setDateTaken] = useState("");
  const [notes, setNotes] = useState("");
  const fileInputRef = useRef(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleInputChange = (event, setterFunction) => {
    setterFunction(event.target.value);
  };

  const closeXrayModal = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
    propSetEditMode(false);
  };

  const handleFileChange = () => {
    const selectedFile = fileInputRef.current.files[0];
    if (selectedFile) {
      setUploadedFileName(selectedFile.name);
    } else {
      setUploadedFileName("");
    }
  };

  const handleSubmitXray = () => {
    const xrayInfoPartial = {
      type: type,
      dateTaken: dateTaken,
      notes: notes,
    };

    const selectedFile = fileInputRef.current.files[0];
    const xrayImage = new FormData();

    // Append the image first
    xrayImage.append("image", selectedFile);

    // Append xrayInfoPartial properties to the FormData
    Object.entries(xrayInfoPartial).forEach(([key, value]) => {
      xrayImage.append(key, value);
    });

    fetch(`http://localhost:3000/patientRecordXray/${propPatientId}`, {
      method: "POST",
      body: xrayImage,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        return response.json;
      })
      .then((data) => {
        console.log("Successfully Uploaded");
        console.log(data);
      })
      .catch((error) => {
        console.error(`Error uploading Xray: ${error.message}`);
      })
      .finally(() => {
        // Close the modal by setting its visibility to false
        propSetModalVisible(false);
      });
  };

  const handleEditXray = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
    propSetEditMode(false);
  };
  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
        <div className="flex w-4/12 flex-col gap-2 rounded-lg border-2 bg-white">
          <div className="flex flex-wrap items-center justify-between border-b pl-8 pt-4">
            <h1 className="font-Montserrat text-xl font-bold uppercase">
              X-ray
            </h1>
            <button
              className="inline-flex items-center rounded-lg px-5 py-1 text-2xl text-gray-500 hover:text-black"
              onClick={closeXrayModal}
            >
              <IoMdCloseCircle />
            </button>
          </div>
          <div className="flex w-5/6 flex-col gap-x-4 gap-y-5 self-center px-8 pb-4">
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-3">
              <div className="mb-1 font-Karla text-base font-bold text-black ">
                Type
              </div>
              <select
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value={type}
                onChange={(event) => handleInputChange(event, setType)}
              >
                <option value="">Select</option>
                <option value="panoramic">Panoramic</option>
                <option value="periapical">Periapical</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Date Taken
              </div>
              <input
                type="date"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value={dateTaken}
                onChange={(event) => handleInputChange(event, setDateTaken)}
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Notes
              </div>
              <textarea
                className="w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                rows="5"
                cols="50"
                value={notes}
                onChange={(event) => handleInputChange(event, setNotes)}
              />
            </div>
            <div className="flex sm:col-span-1 md:col-span-2 lg:col-span-2">
              <label
                htmlFor="fileInput"
                className="flex w-full cursor-pointer items-center gap-2 font-Karla"
              >
                <span className="ml-2 text-2xl text-custom-blue">
                  <LuUpload />
                </span>
                <span
                  className={`text-base font-bold ${
                    uploadedFileName ? "text-blue-800 underline" : "text-black"
                  }`}
                >
                  {uploadedFileName ? uploadedFileName : "Upload X-ray Image"}
                </span>
              </label>
              <input
                type="file"
                className="hidden"
                id="fileInput"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="mb-5 mt-3 flex w-full justify-center">
            <button
              className="rounded-lg border-2 bg-custom-green px-5 py-1 text-lg  text-white hover:bg-green-600"
              onClick={editMode ? handleEditXray : handleSubmitXray}
            >
              {editMode ? "Edit" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default XrayAddModal;
