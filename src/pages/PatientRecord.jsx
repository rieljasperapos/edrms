import React, { useState, useEffect } from "react";
import "../index.css";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import InsuranceInfoDataTable from "../components/InsuranceInfoDataTable.jsx";
import XRaysDataTable from "../components/XRaysDataTable.jsx";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineDeleteForever } from "react-icons/md";
import ModalImageXray from "../components/ModalImageXray.jsx";
import { FaEdit } from "react-icons/fa";
import { MdViewList } from "react-icons/md";
import { FaTooth } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";

function PatientRecord() {
  const [modalXrayData, setModalXrayData] = useState({});
  const [modalImageVisible, setModalImageVisible] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-6 bg-custom-blue pb-6 pl-12 pr-16 pt-8">
        <h1 className=" font-Montserrat text-3xl font-bold uppercase text-white">
          PASCO, JERICHO
        </h1>
        <button className="inline-flex items-center font-Karla text-xl font-bold text-red-500 hover:text-red-800 hover:underline">
          <MdOutlineDeleteForever className="mr-2" />
          Delete
        </button>
      </div>

      <div className="grid w-full justify-center gap-4 border-2  px-12 py-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
        <div className="flex w-full flex-col rounded-lg border-2 sm:col-span-1 md:col-span-1 lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between border-b px-8 pb-2 pt-4">
            <h1 className="font-Montserrat text-xl font-bold uppercase">
              Personal Information
            </h1>
            <button className="flex items-center gap-1 font-Karla text-xl text-green-500 hover:text-green-800 hover:underline">
              <FaEdit />
              Edit
            </button>
          </div>

          <div className="grid gap-x-4 gap-y-5 px-8 py-4 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-12">
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
        <div className="flex w-full flex-col rounded-lg border-2 sm:col-span-1 md:col-span-1 lg:col-span-1">
          <div className="flex flex-wrap items-center justify-between border-b px-8 pb-2 pt-4">
            <h1 className="font-Montserrat text-xl font-bold uppercase">
              RECENT VISIT
            </h1>
            <button className=" flex items-center gap-1 font-Karla text-xl text-blue-500 hover:text-blue-800 hover:underline">
              <MdViewList />
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
              <div className="mb-1 font-Karla text-base font-bold text-black ">
                Balance
              </div>
              <div className="font-Karla text-lg">None</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-wrap gap-4 sm:col-span-1 md:col-span-1 lg:col-span-2">
          <div className="flex flex-wrap justify-evenly gap-8">
            <button className="flex items-center gap-1 font-Karla text-3xl font-bold text-green-500 hover:text-green-800 hover:underline">
              <MdViewList />
              VISITS
            </button>
            <button className="flex items-center gap-1 font-Karla text-3xl font-bold text-green-500 hover:text-green-800 hover:underline">
              <FaTooth />
              TEETH CHART
            </button>
            <button className="flex items-center gap-1 font-Karla text-3xl font-bold text-green-500 hover:text-green-800 hover:underline">
              <FaHeartbeat />
              HEALTH HISTORY
            </button>
          </div>
          <div className="flex h-auto w-full flex-col rounded-lg border-2">
            <div className="flex flex-wrap items-center justify-between border-b px-8 pb-2 pt-4">
              <h1 className="font-Montserrat text-xl font-bold uppercase">
                Insurance Information
              </h1>
              <button className="inline-flex items-center rounded-lg border-2 bg-custom-green px-5 py-1 text-lg  text-white hover:bg-green-600">
                <AiOutlinePlus className="mr-2" />
                Add Info
              </button>
            </div>
            <div className="flex flex-col gap-x-4 gap-y-5 px-8 py-4">
              <InsuranceInfoDataTable />
            </div>
          </div>
          <div className="flex h-auto w-full flex-col rounded-lg border-2">
            <div className="flex flex-wrap items-center justify-between border-b px-8 pb-2 pt-4">
              <h1 className="font-Montserrat text-xl font-bold uppercase">
                X-RAYS
              </h1>
              <button className="inline-flex items-center rounded-lg border-2 bg-custom-green px-5 py-1 text-lg  text-white hover:bg-green-600">
                <AiOutlinePlus className="mr-2" />
                Add X-RAY
              </button>
            </div>
            <div className="flex flex-col gap-x-4 gap-y-5 px-8 py-4">
              <XRaysDataTable
                propModalVisible={setModalImageVisible}
                propXrayData={setModalXrayData}
              />
            </div>
          </div>
        </div>
      </div>
      {modalImageVisible && (
        <ModalImageXray
          propModalXrayData={modalXrayData}
          propSetModalVisible={setModalImageVisible}
          propSetModalXrayData={setModalXrayData}
        />
      )}
    </>
  );
}

export default PatientRecord;
