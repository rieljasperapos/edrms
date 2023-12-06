import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import VitalSignModal from "./VitalSignModal";

function ViewVisitModal({ isVisible, onClose, rowData }) {
  if (!isVisible) return null;

  const [showModal3, setShowModal3] = useState(false);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
        <div className="flex w-[600px] flex-col">
          {/* Close Button */}
          <button
            className=" place-self-end text-xl text-white"
            onClick={() => onClose()}
          >
            <IoMdCloseCircleOutline />
          </button>
          {/* Modal content */}
          <div className="rounded-md bg-white p-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Display data */}
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Date:</strong> {rowData.date}
                </p>
              </div>
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Visit Purpose:</strong> {rowData.visit_purpose}
                </p>
              </div>
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Treatment:</strong> {rowData.treatment}
                </p>
              </div>
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Prescription:</strong> {rowData.prescription}
                </p>
              </div>
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Notes:</strong> {rowData.notes}
                </p>
              </div>
            </div>

            <hr className="my-2 my-6 border-gray-300" />

            <div className="grid grid-cols-2 gap-4">
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Total Fee:</strong> {rowData.total_fee}
                </p>
              </div>
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Discount:</strong> {rowData.discount}
                </p>
              </div>
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Amount Paid:</strong> {rowData.amount_paid}
                </p>
              </div>
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Balance:</strong> {rowData.balance}
                </p>
              </div>
            </div>

            <hr className="my-2 my-6 border-gray-300" />

            <div className="mb-4 ml-2 flex flex-row justify-between">
              <p className=" text-xl">Vital Signs</p>
              <button
                className="inline-flex h-10 w-40 items-center rounded-lg border-2 bg-green-400 px-2 text-white hover:bg-green-600"
                onClick={() => setShowModal3(true)}
              >
                <AiOutlinePlus className="mr-2" />
                Add Vital Signs
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Temperature:</strong>
                </p>
              </div>
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Pulse Rate:</strong>
                </p>
              </div>
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Blood Pressure:</strong>
                </p>
              </div>
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Time:</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VitalSignModal
        isVisible={showModal3}
        onClose={() => setShowModal3(false)}
      />
    </>
  );
}

export default ViewVisitModal;
