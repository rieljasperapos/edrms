import React, { useState, useEffect } from "react";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";
function PersonalInfoEditModal({ propSetModalVisible }) {
  const closePIEditModal = () => {
    // Close the modal by setting its visibility to false
    propSetModalVisible(false);
  };
  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-70">
        <div className="flex w-3/4 flex-col rounded-lg border-2 bg-white sm:col-span-1 md:col-span-1 lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between border-b pb-2 pl-8 pt-4">
            <h1 className="font-Montserrat text-xl font-bold uppercase">
              Personal Information
            </h1>
            <div className="">
              <button
                className="inline-flex items-center rounded-lg px-5 py-1 text-2xl text-gray-500 hover:text-black"
                onClick={closePIEditModal}
              >
                <IoMdCloseCircle />
              </button>
            </div>
          </div>

          <div className="grid gap-x-4 gap-y-5 px-8 py-4 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-11">
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-3">
              <div className="mb-1 font-Karla text-base font-bold text-black ">
                First Name
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value="JERICHO"
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Last Name
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value="PASCO"
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Middle Name
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value="CLAM"
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Birthdate
              </div>
              <input
                type="date"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                defaultValue="2000-12-31"
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-1">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Age
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value="22"
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-1">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Sex
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value="MALE"
              />
            </div>
            <div className="sm:col-span-2 md:col-span-4 lg:col-span-5">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Address
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value="DUNGGUAN, BARANGAY BASAK"
              />
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                City
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value="CEBU"
              />
            </div>
            <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                CONTACT NUMBER
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value="097612345678"
              />
            </div>
            <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
              <div className="mb-1 font-Karla text-base font-bold text-black ">
                EMAIL
              </div>
              <input
                type="text"
                className="h-12 w-full rounded-lg border-2 border-custom-blue px-3 font-Karla"
                value="jericho@gmail.com"
              />
            </div>
          </div>
          <div className="mb-5 mt-3 flex w-full justify-center">
            <button
              className="rounded-lg border-2 bg-custom-green px-5 py-1 text-lg  text-white hover:bg-green-600"
              onClick={closePIEditModal}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalInfoEditModal;
