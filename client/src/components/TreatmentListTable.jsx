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
import { FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import TreatmentAddModal from "./TreatmentAddModal.jsx";
import { AiOutlinePlus } from "react-icons/ai";
import TreatmentConfirmDelete from "./TreatmentConfirmDelete.jsx";

function AccountsDataTable() {
  const [data, setData] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([]);
  const [isVisibleTreatmentAddModal, setVisibleTreatmentAddModal] =
    useState(false);
  const [editModeTreatmentModal, setEditModeTreatmentModal] = useState(false);
  const [treatmentDataEdit, setTreatmentDataEdit] = useState({});
  const [addSuccess, setAddSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isVisibleConfirmDeleteModal, setVisibleConfirmDeleteModal] =
    useState(false);
  const [toDeleteTreatment, setToDeleteTreatment] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const fetchTreatmentList = () => {
    fetch("http://localhost:3000/treatmentList")
      .then((response) => response.json())
      .then((item) => {
        setData(item.data);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  };

  useEffect(() => {
    fetchTreatmentList();
  }, []);

  useEffect(() => {
    // Timer for addSuccess
    let addSuccessTimer;
    if (addSuccess) {
      addSuccessTimer = setTimeout(() => {
        setAddSuccess(false);
      }, 1000);
    }

    // Timer for updateSuccess
    let updateSuccessTimer;
    if (updateSuccess) {
      updateSuccessTimer = setTimeout(() => {
        setUpdateSuccess(false);
      }, 1000);
    }

    // Timer for deleteSuccess
    let deleteSuccessTimer;
    if (deleteSuccess) {
      deleteSuccessTimer = setTimeout(() => {
        setDeleteSuccess(false);
      }, 1000);
    }

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(addSuccessTimer);
      clearTimeout(updateSuccessTimer);
      clearTimeout(deleteSuccessTimer);
    };
  }, [addSuccess, updateSuccess, deleteSuccess]);

  const columns = [
    {
      header: "ID",
      accessorKey: "treatment_id",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "Treatment",
      accessorKey: "treatment_name",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "Treatment Fee",
      accessorKey: "treatment_fee",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "",
      accessorKey: "edit_id",
      cell: (props) => (
        <div className="flex w-full items-center justify-center">
          <button
            className="flex items-center gap-1 text-green-500 hover:text-green-900 hover:underline"
            onClick={() => {
              console.log(props.getValue());
              setVisibleTreatmentAddModal(true);
              setEditModeTreatmentModal(true);
              setTreatmentDataEdit(props.row.original);
            }}
          >
            <FaRegEdit />
            <p>Edit</p>
          </button>
        </div>
      ),
    },
    {
      header: "",
      accessorKey: "delete_id",
      cell: (props) => (
        <div className="flex w-full items-center justify-center">
          <button
            className="flex items-center gap-1 text-red-500 hover:text-red-900 hover:underline"
            onClick={() => {
              console.log(props.getValue());
              setToDeleteTreatment(props.row.original);
              setVisibleConfirmDeleteModal(true);
            }}
          >
            <MdDeleteForever />
            <p>Delete</p>
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
        <div className="mb-2 font-Karla text-2xl font-bold">
          Treatment List Management
        </div>
        <div className="mb-6 flex flex-row flex-wrap items-center justify-between">
          <button
            className="hover:bg-green-`600 flex h-10 w-44 flex-row items-center rounded-lg border-2 bg-green-400 px-5 text-white"
            onClick={() => {
              setVisibleTreatmentAddModal(true);
              setEditModeTreatmentModal(false);
            }}
          >
            <AiOutlinePlus className="mr-2" />
            Add Treatment
          </button>
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
      {isVisibleTreatmentAddModal && (
        <TreatmentAddModal
          propTreatmentData={treatmentDataEdit}
          propSetModalVisible={setVisibleTreatmentAddModal}
          propEditMode={editModeTreatmentModal}
          propSetEditMode={setEditModeTreatmentModal}
          propSetTreatmentData={setTreatmentDataEdit}
          propFetchTreatmentList={fetchTreatmentList}
          propSetAddSuccess={setAddSuccess}
          propSetUpdateSucess={setUpdateSuccess}
        />
      )}
      {isVisibleConfirmDeleteModal && (
        <TreatmentConfirmDelete
          propDeleteData={toDeleteTreatment}
          propSetModalVisible={setVisibleConfirmDeleteModal}
          propFetchTreatmentList={fetchTreatmentList}
          propSetDeleteData={setToDeleteTreatment}
          propSetDeleteSucess={setDeleteSuccess}
        />
      )}
      {/* Display success message as a modal at the top */}
      {addSuccess && (
        <div className="fixed left-1/2 top-0 -translate-x-1/2 transform rounded-md bg-gray-500 bg-opacity-80 p-4 shadow-md">
          <div className="flex items-center gap-1 text-green-500">
            <FaCheckCircle />
            Treatment Added successfully
          </div>
        </div>
      )}
      {updateSuccess && (
        <div className="fixed left-1/2 top-0 -translate-x-1/2 transform rounded-md bg-gray-500 bg-opacity-80 p-4 shadow-md">
          <div className="flex items-center gap-1 text-green-500">
            <FaCheckCircle />
            Treatment Updated successfully
          </div>
        </div>
      )}
      {deleteSuccess && (
        <div className="fixed left-1/2 top-0 -translate-x-1/2 transform rounded-md bg-gray-500 bg-opacity-80 p-4 shadow-md">
          <div className="flex items-center gap-1 text-red-500">
            <FaCheckCircle />
            Treatment Deleted Successfully
          </div>
        </div>
      )}
    </>
  );
}

export default AccountsDataTable;
