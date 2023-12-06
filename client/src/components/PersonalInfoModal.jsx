import React, { useState, useEffect } from "react";
import "../index.css";
import { FaEdit } from "react-icons/fa";
import PersonalInfoEditModal from "./PersonalInfoEditModal.jsx";

function PersonalInfoModal({ propPatientId }) {
  const [personalInfo, setPersonalInfo] = useState({});
  const [modalPIEditVisible, setModalPIEditVisible] = useState(false);
  const handleClickEditPI = () => {
    // Set the modal visibility to true and store the clicked image path
    setModalPIEditVisible(true);
  };
  const fetchPersonalInfo = () => {
    fetch(`http://localhost:3000/patientInfo/${propPatientId}`)
      .then((response) => response.json())
      .then((item) => {
        const itemPersonalInfo = {
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
    console.log(propPatientId);
    console.log(personalInfo);
  }, []);

  return (
    <>
      <div className="flex w-full flex-col rounded-lg border-2 sm:col-span-1 md:col-span-1 lg:col-span-3">
        <div className="flex flex-wrap items-center justify-between border-b px-8 pb-2 pt-4">
          <h1 className="font-Montserrat text-xl font-bold uppercase">
            Personal Information
          </h1>
          <button
            className="flex items-center gap-1 font-Karla text-xl text-green-500 hover:text-green-800 hover:underline"
            onClick={handleClickEditPI}
          >
            <FaEdit />
            Edit
          </button>
        </div>

        <div className="grid gap-x-4 gap-y-5 px-8 py-4 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11">
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-3">
            <div className="mb-1 font-Karla text-base font-bold text-black ">
              First Name
            </div>
            <div className="font-Karla text-lg uppercase">
              {personalInfo.firstName}
            </div>
          </div>
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              Last Name
            </div>
            <div className="font-Karla text-lg uppercase">
              {personalInfo.lastName}
            </div>
          </div>
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              Middle Name
            </div>
            <div className="font-Karla text-lg uppercase">
              {personalInfo.middleName}
            </div>
          </div>
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              Birthdate
            </div>
            <div className="font-Karla text-lg uppercase">
              {personalInfo.birthdate}
            </div>
          </div>
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-1">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              Age
            </div>
            <div className="font-Karla text-lg uppercase">
              {personalInfo.age}
            </div>
          </div>
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-1">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              Sex
            </div>
            <div className="font-Karla text-lg uppercase">
              {personalInfo.sex}
            </div>
          </div>
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-5">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              Address
            </div>
            <div className="font-Karla text-lg uppercase">
              {personalInfo.address}
            </div>
          </div>
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              City
            </div>
            <div className="font-Karla text-lg uppercase">
              {personalInfo.city}
            </div>
          </div>
          <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              CONTACT NUMBER
            </div>
            <div className="font-Karla] text-lg uppercase">
              {personalInfo.contactNumber}
            </div>
          </div>
          <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
            <div className="mb-1 font-Karla text-base font-bold text-black ">
              EMAIL
            </div>
            <div className="font-Karla text-lg">{personalInfo.email}</div>
          </div>
        </div>
      </div>

      {modalPIEditVisible && (
        <PersonalInfoEditModal propSetModalVisible={setModalPIEditVisible} />
      )}
    </>
  );
}

export default PersonalInfoModal;
