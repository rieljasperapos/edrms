import React, { useState, useEffect } from "react";
import AddVisitModal from "./AddVisitModal";
import ViewModal from "./ViewVisitModal";
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
import { PiKeyReturnBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function VisitTable({ propPatientId }) {
  const [visits, setVisits] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  const [showModal, setShowModal] = useState(false); // AddVisitModal
  const [showModal2, setShowModal2] = useState(false); // ViewModal
  const [selectedRowData, setSelectedRowData] = useState(null);

  const navigate = useNavigate();
  // Fetch API Mock Data
  const fetchVisitData = () => {
    const jsonFileUrl =
      "https://raw.githubusercontent.com/hello-isa/react-dental-record-management-system/main/visit-page-mock-data.json";

    fetch(jsonFileUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVisits(data);
      });
  };

  useEffect(() => {
    fetchVisitData();
  }, []);

  const data = visits;

  // JSDoc for autocompletion
  /**@type import('@tanstack/react-table').ColumnDef<any>*/
  const columns = [
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Visit Purpose",
      accessorKey: "visit_purpose",
    },
    {
      header: "Treatment",
      accessorKey: "treatment",
    },
    {
      header: "Balance",
      accessorKey: "balance",
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
      <div className="mx-12 mb-10 mt-6">
        <div className="flex flex-col gap-2">
          <button
            className="hover:text-blue-900-900 inline-flex items-center gap-2 self-end text-xl text-blue-900 hover:underline"
            onClick={() => {
              navigate(`/patientRecord/${propPatientId}`);
            }}
          >
            Return to Record
            <PiKeyReturnBold className="text-2xl" />
          </button>
          <div className="mb-6 flex flex-row justify-between">
            {/* Add Visit */}
            <button
              className="inline-flex h-10 w-40 items-center rounded-lg border-2 bg-green-400 px-8 text-white hover:bg-green-600"
              onClick={() => setShowModal(true)}
            >
              <AiOutlinePlus className="mr-2" />
              Add Visit
            </button>

            {/* Add Visit Modal */}
            <div>
              <AddVisitModal
                isVisible={showModal}
                onClose={() => setShowModal(false)}
              />
            </div>

            {/* Filtering */}
            <div className="flex flex-col gap-3">
              <input
                className="h-10 w-80 rounded-lg border-2 border-gray-300 pl-2"
                type="text"
                placeholder="Search"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex flex-col rounded-lg border-2">
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
                  <th className="px-3 py-3 text-center text-sm font-bold uppercase tracking-wider text-gray-500">
                    Action
                  </th>
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
                  <td className="text-center">
                    {/* View Button */}
                    <button
                      className="rounded-lg border-2 bg-cyan-600 px-2 text-white hover:bg-cyan-800"
                      onClick={() => {
                        setSelectedRowData(row.original);
                        setShowModal2(true);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View modal */}
        <div>
          <ViewModal
            isVisible={showModal2}
            onClose={() => setShowModal2(false)}
            rowData={selectedRowData}
          />
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
    </>
  );
}

export default VisitTable;
