import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import VitalSignModal from "./VitalSignModal";

function ViewModal({ isVisible, onClose, rowData }) {
  if (!isVisible) return null;

  const [showModal3, setShowModal3] = useState(false);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center">
        <div className="w-[600px] flex flex-col">
          {/* Close Button */}
          <button
            className=" text-white text-xl place-self-end"
            onClick={() => onClose()}
          >
            <IoMdCloseCircleOutline />
          </button>
          {/* Modal content */}
          <div className="bg-white p-4 rounded-md">
            <div className="grid grid-cols-2 gap-4">
              {/* Display data */}
              <div className=" border border-gray-300 p-2 rounded-lg">
                <p>
                  <strong>Date:</strong> {rowData.date_visit}
                </p>
              </div>
              <div className=" border border-gray-300 p-2 rounded-lg">
                <p>
                  <strong>Visit Purpose:</strong> {rowData.visit_purpose}
                </p>
              </div>
              <div className=" border border-gray-300 p-2 rounded-lg">
                <p>
                  <strong>Treatment:</strong> {rowData.treatment_name}
                </p>
              </div>
              <div className=" border border-gray-300 p-2 rounded-lg">
                <p>
                  <strong>Prescription:</strong> {rowData.prescription}
                </p>
              </div>
              <div className=" border border-gray-300 p-2 rounded-lg">
                <p>
                  <strong>Notes:</strong> {rowData.notes}
                </p>
              </div>
            </div>

            <hr className="my-2 border-gray-300 my-6" />

            <div className="grid grid-cols-2 gap-4">
              <div className=" border border-gray-300 p-2 rounded-lg">
                <p>
                  <strong>Total Fee:</strong> {rowData.total_fee}
                </p>
              </div>
              <div className=" border border-gray-300 p-2 rounded-lg">
                <p>
                  <strong>Discount:</strong> {rowData.discount}
                </p>
              </div>
              <div className=" border border-gray-300 p-2 rounded-lg">
                <p>
                  <strong>Amount Paid:</strong> {rowData.amount_paid}
                </p>
              </div>
              <div className=" border border-gray-300 p-2 rounded-lg">
                <p>
                  <strong>Balance:</strong> {rowData.balance}
                </p>
              </div>
            </div>

            <hr className="my-2 border-gray-300 my-6" />

            <div className="mb-4 ml-2 flex flex-row justify-between">
              <p className=" text-xl">Vital Signs</p>
              <button
                className="rounded-lg border-2 h-10 w-40 bg-green-400 hover:bg-green-600 text-white inline-flex items-center px-2"
                onClick={() => setShowModal3(true)}
              >
                <AiOutlinePlus className="mr-2" />
                Add Vital Signs
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className=" border border-gray-300 p-2 rounded-lg">
                <p>
                  <strong>Temperature:</strong>
                </p>
              </div>
              <div className=" border border-gray-300 p-2 rounded-lg">
                <p>
                  <strong>Pulse Rate:</strong>
                </p>
              </div>
              <div className=" border border-gray-300 p-2 rounded-lg">
                <p>
                  <strong>Blood Pressure:</strong>
                </p>
              </div>
              <div className=" border border-gray-300 p-2 rounded-lg">
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

export default ViewModal;
