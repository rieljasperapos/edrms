import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { AiOutlinePlus } from "react-icons/ai";
import {
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
  RxChevronLeft,
  RxChevronRight,
} from "react-icons/rx";
import { MdViewList } from "react-icons/md";
import Contents from "../components/Contents.jsx";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { FaCheckCircle } from "react-icons/fa";

function PatientRecordList() {
  const { authenticated } = useAuth();
  const [data, setData] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  const [addRecordSuccess, setAddRecordSuccess] = useState(false);

  const navigate = useNavigate();

  const fetchList = () => {
    fetch("http://localhost:3000/patientInfoList")
      .then((response) => response.json())
      .then((item) => {
        setData(item);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleViewClick = (patientId) => {
    console.log("View clicked for patientId:", patientId);
    navigate(`/patientRecord/${patientId}`);
  };

  useEffect(() => {
    setAddRecordSuccess(false);
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("addRecordSuccess") === "true") {
      setAddRecordSuccess(true);

      // Hide the success message after 2 seconds
      const timeoutId = setTimeout(() => {
        setAddRecordSuccess(false);
      }, 1000);

      // Clear the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, []);

  const columns = [
    {
      header: "Last Name",
      accessorKey: "last_name",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "First Name",
      accessorKey: "first_name",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "Middle Name",
      accessorKey: "middle_name",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "Contact Number",
      accessorKey: "contact_number",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "Recent Visit",
      accessorKey: "recent_visit_date",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "",
      accessorKey: "patient_id",
      cell: (props) => (
        <div className="flex w-full items-center justify-center">
          <button
            className="flex items-center gap-1 text-blue-500 hover:text-blue-900 hover:underline"
            onClick={() => handleViewClick(props.getValue())}
          >
            <MdViewList />
            <p>View</p>
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
      <Navbar />
      <Contents>
        <h1 className="border-b bg-custom-blue px-12 pb-6 pt-8 font-Montserrat text-4xl font-bold text-white">
          Patient Record
        </h1>
        <div className="mx-12 mb-10 mt-6 flex flex-col">
          <div className="mb-6 flex flex-row flex-wrap justify-between">
            {/* Add Visit */}
            <div>
              <button
                className="hover:bg-green-`600 flex h-10 w-40 flex-row items-center rounded-lg border-2 bg-green-400 px-6 text-white"
                onClick={() => {
                  navigate("/addRecord");
                }}
              >
                <AiOutlinePlus className="mr-2" />
                Add Patient
              </button>
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
      </Contents>
      {/* Display success message as a modal at the top */}
      {addRecordSuccess && (
        <div className="fixed left-1/2 top-0 -translate-x-1/2 transform rounded-md bg-gray-500 bg-opacity-80 p-4 shadow-md">
          <div className="flex items-center gap-1 text-green-500">
            <FaCheckCircle />
            Record added successfully!
          </div>
        </div>
      )}
    </>
  );
}

export default PatientRecordList;
