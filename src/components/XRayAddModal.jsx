import React, { useState, useEffect } from "react";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";
import { LuUpload } from "react-icons/lu";

function XrayAddModal({ propSetModalVisible, propEditMode, propSetEditMode }) {
  const [editMode, setEditMode] = useState(propEditMode);

  const closeInsuranceModal = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
    propSetEditMode(false);
  };

  const handleSubmitInsurance = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
  };

  const handleEditInsurance = () => {
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
              onClick={closeInsuranceModal}
            >
              <IoMdCloseCircle />
            </button>
          </div>
          <div className="flex w-5/6 flex-col gap-x-4 gap-y-5 self-center px-8 pb-4">
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-3">
              <div className="mb-1 font-Karla text-base font-bold text-black ">
                Type
              </div>
              <select className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla">
                <option defaultValue="select">Select</option>
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
              />
            </div>
            <div className="flex sm:col-span-1 md:col-span-2 lg:col-span-2">
              <label
                htmlFor="fileInput"
                className="flex w-full cursor-pointer items-center gap-2 font-Karla"
              >
                <span className="text-custom-blue ml-2 text-2xl">
                  <LuUpload />
                </span>
                <span className="text-base font-bold text-black">
                  Upload X-ray Image
                </span>
              </label>
              <input type="file" className="hidden" id="fileInput" />
            </div>
          </div>
          <div className="mb-5 mt-3 flex w-full justify-center">
            <button
              className="rounded-lg border-2 bg-custom-green px-5 py-1 text-lg  text-white hover:bg-green-600"
              onClick={editMode ? handleEditInsurance : handleSubmitInsurance}
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
