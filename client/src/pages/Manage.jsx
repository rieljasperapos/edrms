import React, { useState, useEffect } from "react";
import Contents from "../components/contents.jsx";
import Navbar from "../components/navbar.jsx";
import AccountsDataTable from "../components/AccountsDataTable.jsx";
import { FaAddressBook } from "react-icons/fa6";
import { FaTooth } from "react-icons/fa";
import useAuth from "../hooks/useAuth.js";
import TreatmentListTable from "../components/TreatmentListTable.jsx";

function Manage() {
  const { authenticated } = useAuth();
  const [accountsMgtView, setAccountsMgtView] = useState(true);
  const [treatmentListView, setTreatmentListView] = useState(false);

  return (
    <>
      <Navbar />
      <Contents>
        <h1 className="flex justify-between border-b bg-custom-blue px-12 pb-6 pt-8 font-Montserrat text-4xl font-bold text-white">
          <div>Management</div>
          <div className="flex gap-8 text-2xl font-medium text-cyan-200">
            <button
              className={
                "flex items-center gap-2" +
                (accountsMgtView ? " hovered text-white underline" : "")
              }
              onClick={() => {
                setAccountsMgtView(true);
                setTreatmentListView(false);
              }}
            >
              <FaAddressBook />
              Accounts
            </button>
            <button
              className={
                "flex items-center gap-2" +
                (treatmentListView ? " hovered text-white underline" : "")
              }
              onClick={() => {
                setAccountsMgtView(false); // Reset Accounts view
                setTreatmentListView(true);
              }}
            >
              <FaTooth />
              Treatment List
            </button>
          </div>
        </h1>
        {accountsMgtView && <AccountsDataTable />}
        {treatmentListView && <TreatmentListTable />}
      </Contents>
    </>
  );
}

export default Manage;
