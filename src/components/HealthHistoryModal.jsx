import React, { useState, useEffect } from "react";
import "../index.css";
import Contents from "../components/contents.jsx";

function HealthHistory() {
  return (
    <>
      <div className="col-span-1 flex w-full flex-col rounded-lg border-2">
        <div className="flex flex-wrap items-center justify-between border-b px-8 pb-2 pt-4">
          <h1 className="font-Montserrat text-xl font-bold uppercase">
            HEALTH HISTORY
          </h1>
          <button className=" font-Karla text-xl text-green-500 underline">
            Edit
          </button>
        </div>

        <div className="flex flex-col gap-x-4 gap-y-5 px-8 py-4">
          <div className="grid sm:grid-cols-1 lg:grid-cols-2">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              Diabetic Status
            </div>
            <div className="font-Karla text-lg font-bold text-green-500">
              No
            </div>
          </div>
          <div className="grid sm:grid-cols-1 lg:grid-cols-2">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              High blood Status
            </div>
            <div className="font-Karla text-lg font-bold text-green-500">
              No
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              Other Health Conditions
            </div>
            <div className="font-Karla text-lg">None</div>
          </div>
          <div className="flex flex-col">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              Maintenance Medicines
            </div>
            <div className="font-Karla text-lg">None</div>
          </div>
          <div className="grid sm:grid-cols-1 lg:grid-cols-2">
            <div className="mb-1 font-Karla text-base font-bold text-black">
              Notes
            </div>
            <div className="font-Karla text-lg">None</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HealthHistory;
