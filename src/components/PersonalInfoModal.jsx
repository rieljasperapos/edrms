import React, { useState, useEffect } from "react";
import "../index.css";
import { FaEdit } from "react-icons/fa";

function PersonalInfoModal({ propSetModalPIEditVisible }) {
  const handleClickEditPI = () => {
    // Set the modal visibility to true and store the clicked image path
    propSetModalPIEditVisible(true);
  };

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
            <div className="font-Karla text-lg">JERICHO</div>
          </div>
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              Last Name
            </div>
            <div className="font-Karla text-lg">PASCO</div>
          </div>
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              Middle Name
            </div>
            <div className="font-Karla text-lg">CLAM</div>
          </div>
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              Birthdate
            </div>
            <div className="font-Karla text-lg">12/31/2000</div>
          </div>
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-1">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              Age
            </div>
            <div className="font-Karla text-lg">22</div>
          </div>
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-1">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              Sex
            </div>
            <div className="font-Karla text-lg">MALE</div>
          </div>
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-5">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              Address
            </div>
            <div className="font-Karla text-lg">DUNGGUAN, BARANGAY BASAK</div>
          </div>
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              City
            </div>
            <div className="font-Karla text-lg">CEBU</div>
          </div>
          <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              CONTACT NUMBER
            </div>
            <div className="font-Karla] text-lg">097612345678</div>
          </div>
          <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
            <div className="mb-1 font-Karla text-base font-bold text-black ">
              EMAIL
            </div>
            <div className="font-Karla text-lg">jericho@gmail.com</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalInfoModal;
