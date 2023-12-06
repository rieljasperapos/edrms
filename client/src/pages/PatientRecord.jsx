import React, { useState, useEffect } from "react";
import "../index.css";

import PersonalInfoEditModal from "../components/PersonalInfoEditModal.jsx";
import PersonalInfoModal from "../components/PersonalInfoModal.jsx";
import RecentVisitModal from "../components/RecentVisitModal.jsx";
import InsuranceInfoModal from "../components/InsuranceInfoModal.jsx";
import InsuranceInfoAddModal from "../components/InsuranceInfoAddModal.jsx";

import { MdOutlineDeleteForever } from "react-icons/md";
import { MdViewList } from "react-icons/md";
import { FaTooth } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";
import XrayModal from "../components/XrayModal.jsx";
import HealthHistoryModal from "../components/HealthHistoryModal.jsx";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";
import Contents from "../components/contents.jsx";
import Navbar from "../components/navbar.jsx";
import AccountSession from "../components/accountSession.jsx";
import { useNavigate, useParams } from "react-router-dom";

function PatientRecord() {
  const [modalHealthHistoryVisible, setModalHealthHistoryVisible] =
    useState(false);
  const [DeleteModalVisible, setDeleteModalVisible] = useState(false);
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState(parseInt(useParams().patientId));
  const [personalInfo, setPersonalInfo] = useState({});

  const fetchPersonalInfo = () => {
    fetch(`http://localhost:3000/patientInfo/${patientId}`)
      .then((response) => response.json())
      .then((item) => {
        const itemPersonalInfo = {
          patientId: patientId,
          lastName: item.last_name,
          firstName: item.first_name,
          middleName: item.middle_name,
          birthdate: item.birthdate,
          age: item.age,
          sex: item.sex,
          address: item.street_address,
          city: item.city,
          contactNumber: item.contact_number,
          email: item.email,
        };
        setPersonalInfo(itemPersonalInfo);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  };

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  return (
    <>
      <Navbar />
      <AccountSession />
      <Contents>
        <div className="flex flex-wrap items-center justify-between gap-6 bg-custom-blue pb-6 pl-12 pr-16 pt-8">
          <h1 className=" font-Montserrat text-3xl font-bold uppercase text-white">
            {personalInfo.lastName}, {personalInfo.firstName}
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
            propPersonalInfo={personalInfo}
            propFetchPersoanlInfo={fetchPersonalInfo}
          />
          <RecentVisitModal propPatientId={patientId} />
          <div className="flex flex-col flex-wrap gap-4 sm:col-span-1 md:col-span-1 lg:col-span-2">
            <div className="flex flex-wrap justify-evenly gap-8">
              <button
                className="flex items-center gap-1 font-Karla text-3xl font-bold text-green-500 hover:text-green-800 hover:underline"
                onClick={() => {
                  navigate(`/visit/${patientId}`);
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

            <InsuranceInfoModal propPatientId={patientId} />

            <XrayModal propPatientId={patientId} />
          </div>
        </div>

        {modalHealthHistoryVisible && (
          <HealthHistoryModal
            propSetModalVisible={setModalHealthHistoryVisible}
            propPatientId={patientId}
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
