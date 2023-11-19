import React, { useState, useEffect } from "react";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";
import { LuUpload } from "react-icons/lu";

function XrayAddModal({ propSetModalVisible }) {
  const closeModal = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
  };

  const handleSubmitConfirm = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
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
              Are you sure you want to DELETE the Record?
            </div>
            <button
              className="rounded-lg border-2 bg-red-400 px-5 py-1 text-lg  text-white hover:bg-red-700"
              onClick={handleSubmitConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default XrayAddModal;
