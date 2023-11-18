import React, { useState, useEffect } from "react";
import "../index.css";

function AddRecord() {
  return (
    <>
      <div className="flex items-center justify-between border-b bg-custom-blue px-12 pb-6 pt-8">
        <h1 className="font-Montserrat text-3xl font-bold uppercase text-white">
          Add Record
        </h1>
      </div>

      <div className="mb-8 grid grid-cols-6 flex-col justify-between gap-x-6 gap-y-10 px-12 py-8">
        <div className="col-span-2 flex flex-col font-Karla text-lg">
          <label className="mb-3">Last Name</label>
          <input
            className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
            type="text"
          />
        </div>
        <div className="col-span-2 flex flex-col font-Karla text-lg">
          <label className="mb-3"> First Name</label>
          <input
            className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
            type="text"
          />
        </div>
        <div className="col-span-2 flex flex-col font-Karla text-lg">
          <label className="mb-3">Middle Name</label>
          <input
            className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
            type="text"
          />
        </div>
        <div className="col-span-2 flex flex-col font-Karla text-lg">
          <label className="mb-3">Birthdate</label>
          <input
            className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
            type="date"
          />
        </div>
        <div className="col-span-2 flex flex-col font-Karla text-lg">
          <label className="mb-3">Age</label>
          <input
            className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
            type="number"
            min="0"
          />
        </div>
        <div className="col-span-2 flex flex-col font-Karla text-lg">
          <label className="mb-3">Sex</label>
          <select className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla">
            <option selected>Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="col-span-4 flex flex-col font-Karla text-lg">
          <label className="mb-3">Address</label>
          <input
            className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
            type="text"
          />
        </div>
        <div className="col-span-2 flex flex-col font-Karla text-lg">
          <label className="mb-3">City</label>
          <input
            className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
            type="text"
          />
        </div>
        <div className="col-span-2 flex flex-col font-Karla text-lg">
          <label className="mb-3">Contact Number</label>
          <input
            className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
            type="text"
          />
        </div>
        <div className="col-span-2 flex flex-col font-Karla text-lg">
          <label className="mb-3">Email</label>
          <input
            className="h-12 rounded-lg border-2 border-custom-blue px-3 font-Karla"
            type="text"
          />
        </div>
        <button className="col-span-2 h-12 w-40 place-self-end rounded-lg border-2 bg-custom-green font-Karla text-2xl font-bold text-white hover:bg-green-600">
          Submit
        </button>
      </div>
    </>
  );
}

export default AddRecord;
