import React, { useState, useEffect } from "react";
import "../index.css";
import { AiOutlinePlus } from "react-icons/ai";
import InsuranceInfoDataTable from "./InsuranceInfoDataTable.jsx";
import InsuranceInfoAddModal from "./InsuranceInfoAddModal.jsx";

function InsuranceInfoModal({ propPatientId }) {
  const [modalInsuranceInfoAddVisible, setModalInsuranceInfoAddVisible] =
    useState(false);
  const [editModeInsuranceInfoModal, setEditModeInsuranceInfoModal] =
    useState(false);

  const [insuranceList, setInsuranceList] = useState([]);

  const handleClickAddInsurance = () => {
    // Set the modal visibility to true and store the clicked image path
    setModalInsuranceInfoAddVisible(true);
  };

  const fetchInsuranceList = () => {
    fetch(`http://localhost:3000/patientInsuranceList/${propPatientId}`)
      .then((response) => response.json())
      .then((item) => {
        setInsuranceList(item);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  };

  useEffect(() => {
    // console.log(propPatientId);
    fetchInsuranceList();
  }, []);

  return (
    <>
      <div className="flex h-auto w-full flex-col rounded-lg border-2">
        <div className="flex flex-wrap items-center justify-between border-b px-8 pb-2 pt-4">
          <h1 className="font-Montserrat text-xl font-bold uppercase">
            Insurance Information
          </h1>
          <button
            className="inline-flex items-center rounded-lg border-2 bg-custom-green px-5 py-1 text-lg  text-white hover:bg-green-600"
            onClick={handleClickAddInsurance}
          >
            <AiOutlinePlus className="mr-2" />
            Add Info
          </button>
        </div>
        <div className="flex flex-col gap-x-4 gap-y-5 px-8 py-4">
          <InsuranceInfoDataTable
            propSetEditMode={setEditModeInsuranceInfoModal}
            propSetModalVisible={setModalInsuranceInfoAddVisible}
            propPatientId={propPatientId}
            propInsuranceList={insuranceList}
          />
        </div>
      </div>

      {modalInsuranceInfoAddVisible && (
        <InsuranceInfoAddModal
          propSetModalVisible={setModalInsuranceInfoAddVisible}
          propEditMode={editModeInsuranceInfoModal}
          propSetEditMode={setEditModeInsuranceInfoModal}
          propPatientId={propPatientId}
          propFetchInsuranceList={fetchInsuranceList}
        />
      )}
    </>
  );
}

export default InsuranceInfoModal;
