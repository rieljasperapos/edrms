import React, { useState, useEffect } from "react";
import "../index.css";
import { AiOutlinePlus } from "react-icons/ai";
import XRaysDataTable from "./XRaysDataTable.jsx";
import XrayAddModal from "./XRayAddModal.jsx";
import XrayImageModal from "./XrayImageModal.jsx";

function XrayModal({ propPatientId }) {
  const [modalXrayAddVisible, setModalXrayAddVisible] = useState(false);
  const [editModeXrayModal, setEditModeXrayModal] = useState(false);

  const [xrayList, setXrayList] = useState([]);
  const [modalXrayId, setModalXrayId] = useState(0);
  const [imageXrayModalVisible, setImageXrayModalVisible] = useState(false);

  const fetchXrayList = () => {
    fetch(`http://localhost:3000/patientXrayList/${propPatientId}`)
      .then((response) => response.json())
      .then((item) => {
        setXrayList(item);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  };

  useEffect(() => {
    fetchXrayList();
  }, []);

  return (
    <>
      <div className="flex h-auto w-full flex-col rounded-lg border-2">
        <div className="flex flex-wrap items-center justify-between border-b px-8 pb-2 pt-4">
          <h1 className="font-Montserrat text-xl font-bold uppercase">
            X-RAYS
          </h1>
          <button
            className="inline-flex items-center rounded-lg border-2 bg-custom-green px-5 py-1 text-lg  text-white hover:bg-green-600"
            onClick={() => {
              setModalXrayAddVisible(true);
            }}
          >
            <AiOutlinePlus className="mr-2" />
            Add X-RAY
          </button>
        </div>
        <div className="flex flex-col gap-x-4 gap-y-5 px-8 py-4">
          <XRaysDataTable
            propModalImageVisible={setImageXrayModalVisible}
            propSetModalVisible={() => {
              setModalXrayAddVisible(true);
            }}
            propSetEditMode={setEditModeXrayModal}
            propSetXrayId={setModalXrayId}
            propXrayList={xrayList}
          />
        </div>
      </div>

      {modalXrayAddVisible && (
        <XrayAddModal
          propSetModalVisible={setModalXrayAddVisible}
          propEditMode={editModeXrayModal}
          propSetEditMode={setEditModeXrayModal}
          propPatientId={propPatientId}
          propFetchXrayList={fetchXrayList}
          propXrayId={modalXrayId}
        />
      )}

      {imageXrayModalVisible && (
        <XrayImageModal
          propSetModalVisible={setImageXrayModalVisible}
          propSetModalXrayId={setModalXrayId}
          propXrayId={modalXrayId}
        />
      )}
    </>
  );
}

export default XrayModal;
