import React, { useState, useEffect } from "react";
import AddVisitModal from "./AddVisitModal";
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

function VisitTable() {
  const [visits, setVisits] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
      <div className="mt-10 mx-12 mb-10">
        <div className="flex flex-row justify-between mb-6">
          {/* Add Visit */}
          <div>
            <button
              className="rounded-lg border-2 h-10 w-40 bg-green-400 hover:bg-green-600 text-white inline-flex items-center px-8"
              onClick={() => setShowModal(true)}
            >
              <AiOutlinePlus className="mr-2" />
              Add Visit
            </button>
          </div>

          {/* Add Visit Modal */}
          <div>
            <AddVisitModal
              isVisible={showModal}
              onClose={() => setShowModal(false)}
            />
          </div>

          {/* Filtering */}
          <div>
            <input
              className="rounded-lg border-2 h-10 w-40 border-gray-300 pl-2"
              type="text"
              placeholder="Search"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            />
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
                      className="py-3 px-3 text-center text-sm font-bold text-gray-500 uppercase tracking-wider"
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {/* Sorting */}
                      {
                        { asc: "🔽", desc: "🔼" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </th>
                  ))}
                  <th className="py-3 px-3 text-center text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td className="px-2 py-4 text-center" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  <td className="text-center">
                    {/* View Button */}
                    <button className="border-2 rounded-lg px-2 bg-cyan-600 hover:bg-cyan-800 text-white">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-row justify-between items-center mt-4">
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
              className="bg-gray-50 hover:bg-gray-300 rounded-lg px-2"
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
              className="bg-gray-50 hover:bg-gray-300 rounded-l-lg border border-r-black px-2"
              onClick={() => table.setPageIndex(0)}
            >
              {/* First Page */}
              <RxDoubleArrowLeft size={22} />
            </button>
            <button
              className="bg-gray-50 hover:bg-gray-300 border border-r-black px-2"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              {/* Previous Page */}
              <RxChevronLeft size={22} />
            </button>
            <button
              className="bg-gray-50 hover:bg-gray-300 border border-r-black px-2"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              {/* Next Page */}
              <RxChevronRight size={22} />
            </button>
            <button
              className="bg-gray-50 hover:bg-gray-300 rounded-r-lg px-2"
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
