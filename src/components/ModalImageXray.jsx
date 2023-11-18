import React, { useState, useEffect } from "react";
import "../index.css";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import InsuranceInfoDataTable from "./InsuranceInfoDataTable.jsx";
import XRaysDataTable from "./XRaysDataTable.jsx";

function ModalImageXray({
  propModalXrayData,
  propSetModalVisible,
  propSetModalXrayData,
}) {
  const closeImageModal = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
    propSetModalXrayData({});
  };
  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
        <div className="flex flex-col gap-2 rounded-lg bg-white p-6">
          <div
            className="self-end text-2xl text-black hover:text-green-500"
            onClick={closeImageModal}
          >
            <IoMdCloseCircle />
          </div>
          <img
            src={propModalXrayData.path}
            alt="Xray image"
            className="max-w-screen mb-4 max-h-screen" // Adjusted image size
          />
          <div className="grid grid-cols-2 font-Karla">
            <p className="font-bold">Type</p>
            <p>{propModalXrayData.type}</p>
          </div>
          <div className="grid grid-cols-2 font-Karla">
            <p className="font-bold">Date Taken</p>
            <p>{propModalXrayData.dateTaken}</p>
          </div>
          <div className="grid grid-cols-2 font-Karla">
            <p className="font-bold">Notes</p>
            <p>{propModalXrayData.notes}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalImageXray;
