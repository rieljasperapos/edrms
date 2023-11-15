import React, { useState, useEffect } from "react";
import "../index.css";
import Contents from "../components/contents.jsx";

function PatientRecord() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-6 bg-custom-blue pb-4 pl-12 pr-16 pt-8">
        <h1 className=" font-Monsterrat text-3xl font-bold uppercase text-white">
          PASCO, JERICHO
        </h1>
        <div className="flex flex-wrap gap-8">
          <button className=" font-Karla text-3xl text-green-500 underline">
            VISITS
          </button>
          <button className=" font-Karla text-3xl text-green-500 underline">
            TEETH CHART
          </button>
          <button className=" font-Karla text-3xl text-green-500 underline">
            Health History
          </button>
          <button className=" font-Karla text-3xl text-green-500 underline">
            Health History
          </button>
        </div>
        <button className=" font-Karla text-xl text-rose-500 underline">
          Delete
        </button>
      </div>

      <div className="grid w-full justify-center gap-4 border-2  px-12 py-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
        <div className="flex w-full flex-col rounded-lg border-2 sm:col-span-1 md:col-span-1 lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between border-b px-8 pb-2 pt-4">
            <h1 className="font-Monsterrat text-xl font-bold uppercase">
              Personal Information
            </h1>
            <button className=" font-Karla text-xl text-green-500 underline">
              Edit
            </button>
          </div>

          <div className="grid gap-x-4 gap-y-5 px-8 py-4 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-12">
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-3">
              <div className="mb-1 font-Karla text-base font-bold text-black">
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
        <div className="flex w-full flex-col rounded-lg border-2 sm:col-span-1 md:col-span-1 lg:col-span-1">
          <div className="flex flex-wrap items-center justify-between border-b px-8 pb-2 pt-4">
            <h1 className="font-Monsterrat text-xl font-bold uppercase">
              RECENT VISIT
            </h1>
            <button className=" font-Karla text-xl text-green-500 underline">
              View More
            </button>
          </div>

          <div className="flex flex-col gap-x-4 gap-y-5 px-8 py-4">
            <div className="grid sm:grid-cols-1 lg:grid-cols-2">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Date
              </div>
              <div className="font-Karla text-lg">10/23/2023</div>
            </div>
            <div className="flex flex-col">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Visit Purpose
              </div>
              <div className="font-Karla text-lg">
                Tooth check up due to tooth pain on a molar tooth
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Treatments Rendered
              </div>
              <ul className="font-Karla text-lg">
                <li>Check up</li>
                <li>Cleaning</li>
              </ul>
            </div>
            <div className="flex flex-col">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Notes
              </div>
              <div className="font-Karla text-lg">
                Scheduled for a tooth extraction on November 2, 2023. Prescribed
                with a medicine for tooth infection
              </div>
            </div>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2">
              <div className="mb-1 font-Karla text-base font-bold text-black">
                Balance
              </div>
              <div className="font-Karla text-lg">None</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientRecord;
