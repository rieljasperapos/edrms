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

function AccountsDataTable({
  propAccountsList,
  propSetVisibleAccountView,
  propSetAccountId,
}) {
  const [data, setData] = useState(propAccountsList);
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    setData(propAccountsList);
  }, [propAccountsList]);

  const handleViewClick = (id) => {
    propSetVisibleAccountView(true);
    propSetAccountId(id);
  };

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
      header: "Last Name",
      accessorKey: "last_name",
      cell: (props) => <p>{props.getValue().toUpperCase()}</p>,
    },
    {
      header: "First Name",
      accessorKey: "first_name",
      cell: (props) => <p>{props.getValue().toUpperCase()}</p>,
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
      header: "Deactivation Status",
      accessorKey: "is_deactivated",
      cell: (props) => (
        <p
          className={
            props.getValue()
              ? "font-bold text-red-500"
              : "font-bold text-green-500"
          }
        >
          {props.getValue() ? "YES" : "NO"}
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
      <div className="mx-12 mb-10 mt-6 flex flex-col">
        <div className="mb-6 flex flex-row flex-wrap self-end">
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
    </>
  );
}

export default AccountsDataTable;
