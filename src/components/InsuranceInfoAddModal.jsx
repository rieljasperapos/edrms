import React, { useState, useEffect } from "react";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";

function InsuranceInfoAddModal({ propSetModalVisible, propEditMode }) {
  const [editMode, setEditMode] = useState(propEditMode);

  const closeInsuranceModal = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
  };

  const handleSubmitInsurance = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
  };

  const handleEditInsurance = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
  };
  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
        <div className="flex w-4/12 flex-col gap-2 rounded-lg border-2 bg-white">
          <div className="flex flex-wrap items-center justify-between border-b pl-8 pt-4">
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
          <div className="flex w-5/6 flex-col gap-x-4 gap-y-5 self-center px-8 pb-4">
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-3">
              <div className="mb-1 font-Karla text-base font-bold text-black ">
                Insurance Company
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Last Name
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Expiration Date
              </div>
              <input
                type="date"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Company
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
              />
            </div>
          </div>{" "}
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

export default InsuranceInfoAddModal;
