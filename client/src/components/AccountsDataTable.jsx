import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
  RxChevronLeft,
  RxChevronRight,
} from "react-icons/rx";
import { MdViewList } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { GrUserAdmin } from "react-icons/gr";
import { IoPersonRemove } from "react-icons/io5";
import { MdLockReset } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

import AcccountViewModal from "./AcccountViewModal.jsx";
import AccountResetPassModal from "./AccountResetPassModal.jsx";

function AccountsDataTable({}) {
  const [data, setData] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);

  const [isVisibleAccountView, setVisibleAccountView] = useState(false);
  const [isVisiblePasswordReset, setVisiblePasswordReset] = useState(false);
  const [viewAccountData, setViewAccountData] = useState({});
  const [viewId, setViewId] = useState();
  const [resetPasswordId, setResetPasswordId] = useState();
  const [isPasswordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [passwordResetSuccessPopup, setpasswordResetSuccessPopup] =
    useState(false);

  const fetchAccountsList = () => {
    fetch("http://localhost:3000/manageAccountList")
      .then((response) => response.json())
      .then((item) => {
        setData(item);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  };

  useEffect(() => {
    fetchAccountsList();
  }, []);

  useEffect(() => {
    if (isPasswordResetSuccess) {
      setpasswordResetSuccessPopup(true);

      // Set a timeout to hide the popup after 1 second
      const timeoutId = setTimeout(() => {
        setpasswordResetSuccessPopup(false);
        // Set isPasswordResetSuccess to false after hiding the popup
        setPasswordResetSuccess(false);
      }, 1000);

      // Clear the timeout when the component unmounts or when a new password reset success occurs
      return () => clearTimeout(timeoutId);
    }
  }, [isPasswordResetSuccess]);

  const handleUpdate = (id) => {
    // Check if data is not empty
    if (data && data.length > 0) {
      const accountObject = data.find((account) => account.account_id === id);

      // Check if the accountObject is found
      if (accountObject) {
        // Set the account_id state
        setViewAccountData(accountObject);
      } else {
        // Handle the case where the account with the specified id is not found
        console.log(`Account with id ${id} not found.`);
      }
    } else {
      // Handle the case where data is empty
      console.log("Data is empty.");
    }
  };

  const handleMakeAdmin = (accountId, adminStatus) => {
    fetch(`http://localhost:3000/handleAdminStatus/${accountId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminStatus: !adminStatus, // Toggle the admin status
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Make admin successful:", data.message);
        // Handle success, update state, or trigger a re-fetch if needed
        fetchAccountsList();
      })
      .catch((error) => {
        console.error("Error making admin:", error.message);
        // Handle error, show a notification, etc.
      });
  };

  const handleDeactivate = (accountId, deactivationStatus) => {
    const action = deactivationStatus ? "Reactivate" : "Deactivate";

    fetch(`http://localhost:3000/handleDeactivationStatus/${accountId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deactivationStatus: !deactivationStatus,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(`${action} successful:`, data.message);
        // Handle success, update state, or trigger a re-fetch if needed
        fetchAccountsList();
      })
      .catch((error) => {
        console.error(`Error ${action.toLowerCase()}ing:`, error.message);
        // Handle error, show a notification, etc.
      });
  };

  useEffect(() => {
    handleUpdate(viewId);
  }, [data]);

  const columns = [
    {
      header: "ID",
      accessorKey: "account_id",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "Username",
      accessorKey: "username",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "Admin",
      accessorKey: "is_admin",
      cell: (props) => (
        <p
          className={
            props.getValue()
              ? "font-bold text-green-500"
              : "font-bold text-red-500"
          }
        >
          {props.getValue() ? "YES" : "NO"}
        </p>
      ),
    },
    {
      header: "Status",
      accessorKey: "is_deactivated",
      cell: (props) => (
        <p
          className={
            props.getValue()
              ? "font-bold text-red-500"
              : "font-bold text-green-500"
          }
        >
          {props.getValue() ? "Inactive" : "Active"}
        </p>
      ),
    },
    {
      header: "",
      accessorKey: "view_id",
      cell: (props) => (
        <div className="flex w-full items-center justify-center">
          <button
            className="flex items-center gap-1 text-blue-500 hover:text-blue-900 hover:underline"
            onClick={() => {
              setVisibleAccountView(true);
              handleUpdate(props.getValue());
              setViewId(props.getValue());
            }}
          >
            <MdViewList />
            <p>View</p>
          </button>
        </div>
      ),
    },
    {
      header: "",
      accessorKey: "resetPasswordId",
      cell: (props) => (
        <div className="flex w-full items-center justify-center">
          <button
            className="flex items-center gap-1 text-blue-500 hover:text-blue-900 hover:underline"
            onClick={() => {
              setVisiblePasswordReset(true);
              setResetPasswordId(props.getValue());
            }}
          >
            <MdLockReset />
            <p>Reset Password</p>
          </button>
        </div>
      ),
    },
    {
      header: "",
      accessorKey: "admin_status",
      cell: (props) => (
        <div className="flex w-full items-center justify-center">
          <button
            className={`flex items-center gap-1 ${
              props.getValue() === 0
                ? "text-green-500 hover:text-green-900"
                : "text-red-500 hover:text-red-900"
            } hover:underline`}
            onClick={() =>
              handleMakeAdmin(props.row.original.account_id, props.getValue())
            }
          >
            {props.getValue() === 0 ? <GrUserAdmin /> : <IoPersonRemove />}
            <p>{props.getValue() === 0 ? "Make admin" : "Remove admin"}</p>
          </button>
        </div>
      ),
    },
    {
      header: "",
      accessorKey: "deactivation_status",
      cell: (props) => (
        <div className="flex w-full items-center justify-center">
          <button
            className={`flex items-center gap-1 ${
              !props.getValue()
                ? "text-red-500 hover:text-red-900"
                : "text-green-500 hover:text-green-900"
            } hover:underline`}
            onClick={() =>
              handleDeactivate(props.row.original.account_id, props.getValue())
            }
          >
            <IoIosWarning />
            <p>{props.getValue() ? "Reactivate" : "Deactivate"}</p>
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter: filtering,
      sorting: sorting,
    },
    onGlobalFilterChange: setFiltering,
    onSortingChange: setSorting,
  });

  return (
    <>
      <div className="mx-12 mb-10 mt-6 flex flex-col">
        <div className="mb-6 flex flex-row flex-wrap items-center justify-between">
          <div className="font-Karla text-2xl font-bold">
            Accounts Management
          </div>
          {/* Filtering */}
          <div>
            <input
              className="h-10 w-40 rounded-lg border-2 border-gray-300 pl-2"
              type="text"
              placeholder="Search"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex flex-col overflow-auto rounded-lg border-2">
          <table className="divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className="px-3 py-3 text-center text-sm font-bold uppercase tracking-wider text-gray-500"
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {/* Sorting */}
                      {
                        { asc: "🔽", desc: "🔼" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td className="px-2 py-4 text-center" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-row items-center justify-between">
          {/* Pagination */}
          <div className="pl-2">
            Page{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </div>

          {/* Page Results */}
          <div className="ml-4">
            <select
              className="rounded-lg bg-gray-50 px-2 hover:bg-gray-300"
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20, 30].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>

          {/* Pagination button */}
          <div className="pr-2">
            <button
              className="rounded-l-lg border border-r-black bg-gray-50 px-2 hover:bg-gray-300"
              onClick={() => table.setPageIndex(0)}
            >
              {/* First Page */}
              <RxDoubleArrowLeft size={22} />
            </button>
            <button
              className="border border-r-black bg-gray-50 px-2 hover:bg-gray-300"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              {/* Previous Page */}
              <RxChevronLeft size={22} />
            </button>
            <button
              className="border border-r-black bg-gray-50 px-2 hover:bg-gray-300"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              {/* Next Page */}
              <RxChevronRight size={22} />
            </button>
            <button
              className="rounded-r-lg bg-gray-50 px-2 hover:bg-gray-300"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              {/* Last Page */}
              <RxDoubleArrowRight size={22} />
            </button>
          </div>
        </div>
      </div>

      {isVisibleAccountView && (
        <AcccountViewModal
          propAccountData={viewAccountData}
          propFetchAccountsList={fetchAccountsList}
          propSetVisibleAccountView={setVisibleAccountView}
        />
      )}

      {isVisiblePasswordReset && (
        <AccountResetPassModal
          propResetId={resetPasswordId}
          propSetVisiblePasswordReset={setVisiblePasswordReset}
          propSetPasswordResetSuccess={setPasswordResetSuccess}
        />
      )}
      {passwordResetSuccessPopup && (
        <div className="fixed left-1/2 top-0 -translate-x-1/2 transform rounded-md bg-gray-500 bg-opacity-80 p-4 shadow-md">
          <div className="flex items-center gap-1 text-green-500">
            <FaCheckCircle />
            Password Reset success
          </div>
        </div>
      )}
    </>
  );
}

export default AccountsDataTable;
