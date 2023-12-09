import React, { useState, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import VitalSignModal from "./VitalSignModal";
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

function ViewModal({ isVisible, onClose, rowData }) {
  if (!isVisible) return null;

  const [showModal3, setShowModal3] = useState(false);

  const [visits, setVisits] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);

  const [selectedRowData, setSelectedRowData] = useState(null);

  // Fetch data from the database
  const fetchVitalSignList = () => {
    fetch(`http://localhost:3000/vital_signs/${rowData.visit_id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVisits(data);
      });
  };

  useEffect(() => {
    fetchVitalSignList();
  }, []);

  const data = visits;

  // JSDoc for autocompletion
  /**@type import('@tanstack/react-table').ColumnDef<any>*/
  const columns = [
    {
      header: "Temperature",
      accessorKey: "temperature",
    },
    {
      header: "Pulse Rate",
      accessorKey: "pulse_rate",
    },
    {
      header: "Systolic BP",
      accessorKey: "systolic_bp",
    },
    {
      header: "Diastolic BP",
      accessorKey: "diastolic_bp",
    },
    {
      header: "Time Taken",
      accessorKey: "time_taken",
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
      // pagination: {
      //   pageSize: 3,
      //   pageIndex: 0,
      // },
    },
    onGlobalFilterChange: setFiltering,
    onSortingChange: setSorting,
  });

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
        <div className="flex w-[600px] flex-col">
          {/* Close Button */}
          <button
            className=" place-self-end text-xs text-white"
            onClick={() => onClose()}
          >
            <IoMdCloseCircleOutline />
          </button>
          {/* Modal content */}
          <div className="rounded-md bg-white p-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Display data */}
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Date:</strong> {rowData.date_visit}
                </p>
              </div>
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Visit Purpose:</strong> {rowData.visit_purpose}
                </p>
              </div>
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Treatment:</strong> {rowData.treatment}
                </p>
              </div>
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Prescription:</strong> {rowData.prescription}
                </p>
              </div>
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Notes:</strong> {rowData.notes}
                </p>
              </div>
            </div>

            <hr className="my-2 my-6 border-gray-300" />

            <div className="grid grid-cols-2 gap-4">
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Additional Fee:</strong> {rowData.additional_fees}
                </p>
              </div>
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Discount:</strong> {rowData.discount}
                </p>
              </div>
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Amount Paid:</strong> {rowData.amount_paid}
                </p>
              </div>
              <div className=" rounded-lg border border-gray-300 p-2">
                <p>
                  <strong>Balance:</strong> {rowData.balance}
                </p>
              </div>
            </div>

            <hr className="my-2 my-6 border-gray-300" />

            <div className="mb-4 ml-2 flex flex-row justify-between">
              <p className=" text-xl">Vital Signs</p>
              <button
                className="inline-flex h-10 w-40 items-center rounded-lg border-2 bg-green-400 px-2 text-white hover:bg-green-600"
                onClick={() => setShowModal3(true)}
              >
                <AiOutlinePlus className="mr-2" />
                Add Vital Signs
              </button>
            </div>
            {/* <div className="grid grid-cols-2 gap-4">
              <div className=" border border-gray-300 p-2 rounded-lg">
                <p>
                  <strong>Temperature:</strong> {rowData.temperature}
                </p>
              </div>
              <div className=" border border-gray-300 p-2 rounded-lg">
                <p>
                  <strong>Pulse Rate:</strong> {rowData.pulse_rate}
                </p>
              </div>
              <div className=" border border-gray-300 p-2 rounded-lg">
                <p>
                  <strong>Systolic BP:</strong> {rowData.systolic_bp}
                </p>
              </div>
              <div className=" border border-gray-300 p-2 rounded-lg">
                <p>
                  <strong>Diastolic BP:</strong> {rowData.diastolic_bp}
                </p>
              </div>
              <div className=" border border-gray-300 p-2 rounded-lg">
                <p>
                  <strong>Time:</strong> {rowData.time_taken}
                </p>
              </div>
            </div> */}

            {/* Table */}
            <div className="flex flex-col rounded-lg border-2">
              <table className="divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wider text-gray-500"
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
            {/* End of Table */}
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
                  {[1, 3].map((pageSize) => (
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
                  <RxDoubleArrowLeft size={18} />
                </button>
                <button
                  className="border border-r-black bg-gray-50 px-2 hover:bg-gray-300"
                  disabled={!table.getCanPreviousPage()}
                  onClick={() => table.previousPage()}
                >
                  {/* Previous Page */}
                  <RxChevronLeft size={18} />
                </button>
                <button
                  className="border border-r-black bg-gray-50 px-2 hover:bg-gray-300"
                  disabled={!table.getCanNextPage()}
                  onClick={() => table.nextPage()}
                >
                  {/* Next Page */}
                  <RxChevronRight size={18} />
                </button>
                <button
                  className="rounded-r-lg bg-gray-50 px-2 hover:bg-gray-300"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                >
                  {/* Last Page */}
                  <RxDoubleArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VitalSignModal
        isVisible={showModal3}
        propFetchVitalSign={fetchVitalSignList}
        onClose={() => setShowModal3(false)}
        propVisitId={rowData.visit_id}
      />
    </>
  );
}

export default ViewModal;
