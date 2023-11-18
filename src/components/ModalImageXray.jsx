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
  propModalImagePath,
  propSetModalVisible,
  propSetModalImagePath,
}) {
  const closeImageModal = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
    propSetModalImagePath("");
  };
  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
        <div className="relative rounded-lg bg-white p-6">
          <span
            className="absolute right-4 top-4 cursor-pointer text-2xl text-black"
            onClick={closeImageModal}
          >
            <IoMdCloseCircle />
          </span>
          <img
            src={propModalImagePath}
            alt="Modal"
            className="max-w-screen max-h-screen" // Adjusted image size
          />
        </div>
      </div>
    </>
  );
}

export default ModalImageXray;
