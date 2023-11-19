import React, { useState, useEffect } from "react";
import "../index.css";
import { MdViewList } from "react-icons/md";
function RecentVisitModal({ propSetModalVisible }) {
  return (
    <>
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
    </>
  );
}

export default RecentVisitModal;
