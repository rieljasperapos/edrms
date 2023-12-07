import React, { useState, useEffect } from "react";
import Contents from "../components/contents.jsx";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import AccountSession from "../components/accountSession.jsx";
import AccountsDataTable from "../components/AccountsDataTable.jsx";
import AcccountViewModal from "../components/AcccountViewModal.jsx";

function Manage() {
  const navigate = useNavigate();

  const [accountsList, setAccountsList] = useState([]);
  const [isVisibleAccountView, setVisibleAccountView] = useState(false);
  const [accountId, setAccountId] = useState();
  const [viewAccountData, setViewAccountData] = useState({});

  const fetchAccountsList = () => {
    fetch("http://localhost:3000/manageAccountList")
      .then((response) => response.json())
      .then((item) => {
        setAccountsList(item);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  };

  useEffect(() => {
    fetchAccountsList();
  }, []);

  useEffect(() => {
    // Find the object with the specified account_id
    const accountObject = accountsList.find(
      (account) => account.account_id === accountId,
    );

    // Set the account_id state
    if (accountObject) {
      setViewAccountData(accountObject);
    }
  }, [isVisibleAccountView]);

  return (
    <>
      <Navbar />
      <AccountSession />
      <Contents>
        <h1 className="border-b bg-custom-blue px-12 pb-6 pt-8 font-Montserrat text-4xl font-bold text-white">
          Management
        </h1>
        <AccountsDataTable
          propAccountsList={accountsList}
          propSetVisibleAccountView={setVisibleAccountView}
          propSetAccountId={setAccountId}
        />
      </Contents>

      {isVisibleAccountView && (
        <AcccountViewModal
          propAccountData={viewAccountData}
          propFetchAccountsList={fetchAccountsList}
          propSetVisibleAccountView={setVisibleAccountView}
        />
      )}
    </>
  );
}

export default Manage;
