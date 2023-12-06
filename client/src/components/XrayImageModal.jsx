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

function XrayImageModal({ propSetModalVisible, propXrayId }) {
  const [xrayData, setXrayData] = useState({});

  const fetchXrayData = () => {
    fetch(`http://localhost:3000/patientXrayData/${propXrayId}`)
      .then((response) => response.json())
      .then((item) => {
        const itemData = {
          type: item.type,
          dateTaken: item.date_taken,
          notes: item.notes,
          image: item.image_path,
        };
        console.log(itemData);
        setXrayData(itemData);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  };

  useEffect(() => {
    console.log(propXrayId);
    fetchXrayData();
  }, []);
  const closeImageModal = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
  };
  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
        <div className="flex flex-col gap-2 rounded-lg bg-white p-6">
          <div
            className="self-end text-2xl text-gray-500 hover:text-black"
            onClick={closeImageModal}
          >
            <IoMdCloseCircle />
          </div>
          <img
            src={`http://localhost:3000/xrayImages/${xrayData.image}`}
            alt="Xray image"
            className="max-w-screen mb-4 max-h-screen" // Adjusted image size
          />
          <div className="grid grid-cols-2 gap-16 font-Karla">
            <p className="font-bold">Type</p>
            <p>{xrayData.type}</p>
          </div>
          <div className="grid grid-cols-2 gap-16 font-Karla">
            <p className="font-bold">Date Taken</p>
            <p>{xrayData.dateTaken}</p>
          </div>
          <div className="grid grid-cols-2 gap-16 font-Karla">
            <p className="font-bold">Notes</p>
            <p>{xrayData.notes}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default XrayImageModal;
