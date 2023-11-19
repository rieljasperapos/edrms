import React, { useState, useEffect } from "react";
import "../index.css";
import { AiOutlinePlus } from "react-icons/ai";
import XRaysDataTable from "./XRaysDataTable.jsx";

function XrayModal({
  propSetModalImageVisible,
  propSetModalXrayData,
  propSetModalXrayAddVisible,
  propSetEditModeXrayModal,
}) {
  const handleClickAddXray = () => {
    // Set the modal visibility to true and store the clicked image path
    propSetModalXrayAddVisible(true);
  };
  return (
    <>
      <div className="flex h-auto w-full flex-col rounded-lg border-2">
        <div className="flex flex-wrap items-center justify-between border-b px-8 pb-2 pt-4">
          <h1 className="font-Montserrat text-xl font-bold uppercase">
            X-RAYS
          </h1>
          <button
            className="inline-flex items-center rounded-lg border-2 bg-custom-green px-5 py-1 text-lg  text-white hover:bg-green-600"
            onClick={handleClickAddXray}
          >
            <AiOutlinePlus className="mr-2" />
            Add X-RAY
          </button>
        </div>
        <div className="flex flex-col gap-x-4 gap-y-5 px-8 py-4">
          <XRaysDataTable
            propModalImageVisible={propSetModalImageVisible}
            propXrayData={propSetModalXrayData}
            propSetModalVisible={handleClickAddXray}
            propSetEditMode={propSetEditModeXrayModal}
          />
        </div>
      </div>
    </>
  );
}

export default XrayModal;
