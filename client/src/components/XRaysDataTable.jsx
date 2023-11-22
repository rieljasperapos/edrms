import React, { useState, useEffect } from "react";
import "../index.css";
import XraysData from "../assets/XRaysData.js";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { MdViewList } from "react-icons/md";

function XRaysDataTable({
  propModalImageVisible,
  propXrayData,
  propSetEditMode,
  propSetModalVisible,
}) {
  const [data, setData] = useState(XraysData);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageSize: 3,
    pageIndex: 0,
  });

  const handleImageClick = (indexData) => {
    // Set the modal visibility to true and store the clicked image path
    propXrayData(indexData);
    propModalImageVisible(true);
    console.log(indexData);
  };

  const handleEditMode = () => {
    // Close the modal by setting its visibility to false
    propSetEditMode(true);
    propSetModalVisible(true);
  };

  const columns = [
    {
      accessorKey: "type",
      header: "Type",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "dateTaken",
      header: "Date Taken",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "path",
      header: "Image",
      cell: (props) => (
        <div className="flex w-full items-center justify-center">
          <button
            className="flex items-center gap-1 text-blue-500 hover:text-blue-900 hover:underline"
            onClick={() => handleImageClick(props.row.original)}
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
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
  });

  return (
    <>
      <div className="flex flex-col overflow-auto rounded-lg border-2">
        <table className="divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="px-3 py-3 text-center font-Montserrat text-sm font-bold uppercase tracking-wider text-gray-500"
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
                <th className="px-3 py-3 text-center text-sm font-bold uppercase tracking-wider text-gray-500"></th>
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="px-2 py-4 text-center font-Karla"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="text-center">
                  {/* Edit Button */}
                  <div className="flex w-full items-center justify-center">
                    <button
                      className="mx-4 flex items-center justify-center gap-1 font-Karla text-green-500 hover:text-green-800 hover:underline"
                      onClick={handleEditMode}
                    >
                      <FaEdit />
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-between gap-3">
        {/* Pagination */}
        <div className="pl-2">
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </div>

        {/* Pagination button */}
        <div className="flex pr-2">
          <button
            className="border border-r-black px-2 hover:bg-gray-300"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            {/* Previous Page */}
            <RxChevronLeft size={22} />
          </button>
          <button
            className="border border-r-black px-2 hover:bg-gray-300"
            disabled={!table.getCanNextPage()}
            onClick={() => {
              console.log("Next page clicked");
              console.log(table.getState().pagination);
              table.nextPage();
            }}
          >
            {/* Next Page */}
            <RxChevronRight size={22} />
          </button>
        </div>
      </div>
    </>
  );
}

export default XRaysDataTable;
