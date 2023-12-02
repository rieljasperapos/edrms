import React, { useState, useEffect } from "react";
import "../index.css";

import PersonalInfoEditModal from "../components/PersonalInfoEditModal.jsx";
import PersonalInfoModal from "../components/PersonalInfoModal.jsx";
import RecentVisitModal from "../components/RecentVisitModal.jsx";
import InsuranceInfoModal from "../components/InsuranceInfoModal.jsx";
import ModalImageXray from "../components/ModalImageXray.jsx";
import InsuranceInfoAddModal from "../components/InsuranceInfoAddModal.jsx";

import { MdOutlineDeleteForever } from "react-icons/md";
import { MdViewList } from "react-icons/md";
import { FaTooth } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";
import XrayAddModal from "../components/XRayAddModal.jsx";
import XrayModal from "../components/XrayModal.jsx";
import HealthHistoryModal from "../components/HealthHistoryModal.jsx";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";
import Contents from "../components/contents.jsx";
import Navbar from "../components/navbar.jsx";
import AccountSession from "../components/accountSession.jsx";
import { useNavigate, useParams } from "react-router-dom";

function PatientRecord() {
  const [modalPIEditVisible, setModalPIEditVisible] = useState(false);
  const [modalHealthHistoryVisible, setModalHealthHistoryVisible] =
    useState(false);
  const [modalInsuranceAddVisible, setModalInsuranceAddVisible] =
    useState(false);
  const [editModeInsuranceModal, setEditModeInsuranceModal] = useState(false);
  const [modalXrayAddVisible, setModalXrayAddVisible] = useState(false);
  const [editModeXrayModal, setEditModeXrayModal] = useState(false);
  const [modalXrayId, setModalXrayId] = useState(0);
  const [modalImageVisible, setModalImageVisible] = useState(false);
  const [DeleteModalVisible, setDeleteModalVisible] = useState(false);

  const navigate = useNavigate();

  const [patientId, setPatientId] = useState(parseInt(useParams().patientId));
  const [patientName, setPatientName] = useState({});

  const fetchPatientName = () => {
    fetch(`http://localhost:3000/patientName/${patientId}`)
      .then((response) => response.json())
      .then((item) => {
        const itemName = {
          lastName: item.last_name,
          firstName: item.first_name,
        };
        setPatientName(itemName);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  };

  useEffect(() => {
    fetchPatientName();
    console.log(patientId);
    console.log(patientName);
  }, []);

  return (
    <>
      <Navbar />
      <AccountSession />
      <Contents>
        <div className="flex flex-wrap items-center justify-between gap-6 bg-custom-blue pb-6 pl-12 pr-16 pt-8">
          <h1 className=" font-Montserrat text-3xl font-bold uppercase text-white">
            {patientName.lastName}, {patientName.firstName}
          </h1>
          <button
            className="inline-flex items-center font-Karla text-xl font-bold text-red-500 hover:text-red-800 hover:underline"
            onClick={() => {
              setDeleteModalVisible(true);
            }}
          >
            <MdOutlineDeleteForever className="mr-1" />
            Delete
          </button>
        </div>

        <div className="grid w-full justify-center gap-4 border-2  px-12 py-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
          <PersonalInfoModal
            propSetModalPIEditVisible={setModalPIEditVisible}
            propPatientId={patientId}
          />
          <RecentVisitModal propPatientId={patientId} />
          <div className="flex flex-col flex-wrap gap-4 sm:col-span-1 md:col-span-1 lg:col-span-2">
            <div className="flex flex-wrap justify-evenly gap-8">
              <button
                className="flex items-center gap-1 font-Karla text-3xl font-bold text-green-500 hover:text-green-800 hover:underline"
                onClick={() => {
                  navigate("/visit");
                }}
              >
                <MdViewList />
                VISITS
              </button>
              <button className="flex items-center gap-1 font-Karla text-3xl font-bold text-green-500 hover:text-green-800 hover:underline">
                <FaTooth />
                TEETH CHART
              </button>
              <button
                className="flex items-center gap-1 font-Karla text-3xl font-bold text-green-500 hover:text-green-800 hover:underline"
                onClick={() => {
                  setModalHealthHistoryVisible(true);
                }}
              >
                <FaHeartbeat />
                HEALTH HISTORY
              </button>
            </div>

            <InsuranceInfoModal
              propSetModalInsuranceAddVisible={setModalInsuranceAddVisible}
              propSetEditModeInsuranceModal={setEditModeInsuranceModal}
              propPatientId={patientId}
            />

            <XrayModal
              propSetEditModeXrayModal={setEditModeXrayModal}
              propSetModalImageVisible={setModalImageVisible}
              propSetModalXrayAddVisible={setModalXrayAddVisible}
              propPatientId={patientId}
              propSetModalXrayId={setModalXrayId}
            />
          </div>
        </div>

        {modalPIEditVisible && (
          <PersonalInfoEditModal propSetModalVisible={setModalPIEditVisible} />
        )}

        {modalHealthHistoryVisible && (
          <HealthHistoryModal
            propSetModalVisible={setModalHealthHistoryVisible}
          />
        )}

        {modalInsuranceAddVisible && (
          <InsuranceInfoAddModal
            propSetModalVisible={setModalInsuranceAddVisible}
            propEditMode={editModeInsuranceModal}
            propSetEditMode={setEditModeInsuranceModal}
          />
        )}

        {modalXrayAddVisible && (
          <XrayAddModal
            propSetModalVisible={setModalXrayAddVisible}
            propEditMode={editModeXrayModal}
            propSetEditMode={setEditModeXrayModal}
            propPatientId={patientId}
          />
        )}

        {modalImageVisible && (
          <ModalImageXray
            propSetModalVisible={setModalImageVisible}
            propSetModalXrayId={setModalXrayId}
            propXrayId={modalXrayId}
          />
        )}

        {DeleteModalVisible && (
          <ConfirmDeleteModal propSetModalVisible={setDeleteModalVisible} />
        )}
      </Contents>
    </>
  );
}

export default PatientRecord;
