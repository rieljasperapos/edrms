import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import Navbar from "../components/navbar";
import Contents from "../components/contents";
import Logo from '../assets/cardbg.png'
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

const Dashboard = () => {
    // const [data, setData] = useState([]);
    const [totalCancelled, setTotalCancelled] = useState(0);
    const [totalConfirmed, setTotalConfirmed] = useState(0);
    const [filtering, setFiltering] = useState("");
    const [sorting, setSorting] = useState([]);
    const [name, setName] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const navigate = useNavigate();

    const today = dayjs().format('YYYY-MM-DD');

    const handleLogout = () => {
        fetch('http://localhost:3000/signout', {
            credentials: 'include',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                navigate('/signin');
            })
    }

    useEffect(() => {
        fetch('http://localhost:3000/session', {
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.valid) {
                    setName(data.username);
                } else {
                    navigate('/signin')
                }
            })
            .catch((err) => {
                console.error(err.message);
            })
    }, [])

    useEffect(() => {
        fetch('http://localhost:3000/appointments', {
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                // Filter appointments for today
                const today = dayjs().format('YYYY-MM-DD');
                const appointmentsForToday = data.filter(appointment => {
                    const appointmentDate = dayjs(appointment.date_schedule).format('YYYY-MM-DD');
                    return appointmentDate === today;
                });

                setFilteredAppointments(appointmentsForToday);
            })
            .catch((err) => {
                console.error(err.message);
            })

        fetch('http://localhost:3000/appointments/totalCancelled', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: "cancelled", date: today })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}`)
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    console.log(data);
                    setTotalCancelled(data.totalCancelled);
                } else {
                    // Handle the case where data is falsy
                }
            })
            .catch(err => {
                console.error(err.message);
            })

            fetch('http://localhost:3000/appointments/totalConfirmed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: "confirmed", date: today })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}`)
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    console.log(data);
                    setTotalConfirmed(data.totalConfirmed);
                } else {
                    // Handle the case where data is falsy
                }
            })
            .catch(err => {
                console.error(err.message);
            })
    }, [])

    const formatDate = (dateString) => {
        const originalDate = new Date(dateString);

        // Format the date to "yyyy-MM-dd"
        const year = originalDate.getFullYear();
        const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
        const day = originalDate.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    const formatTime = (time) => {
        const timeParts = time.split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = timeParts[1];
        const amPm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${formattedHours}:${minutes} ${amPm}`;
    };

    const columns = [
        {
            header: "Name",
            accessorKey: 'name',
            cell: (props) => <p>{props.getValue()}</p>,
        },
        {
            header: "Time",
            accessorKey: 'time_schedule',
            cell: (props) => <p>{formatTime(props.getValue())}</p>,
        },
        {
            header: "Contact Number",
            accessorKey: "contact_number",
            cell: (props) => <p>{props.getValue()}</p>,
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (props) => (
                <p className={`uppercase font-semibold ${props.getValue() === 'cancelled' ? 'text-red-500' : 'text-green-500'}`}>
                    {props.getValue()}
                </p>
            ),
        },
        {
            header: "",
            accessorKey: "patient_id",
            cell: (props) => (
                <div className="flex w-full items-center justify-center">
                    {props.getValue() !== null ? (
                        <button
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-900 hover:underline"
                            onClick={() => handleViewClick(props.getValue())}
                        >
                            <MdViewList />
                            <p>View</p>
                        </button>
                    ) : (
                        <span className="text-gray-500">No Patient Record Found</span>
                    )}
                </div>
            ),
        },
    ];

    const data = filteredAppointments;

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

    console.log(data);
    console.log(totalCancelled);
    console.log(today);
    console.log(filteredAppointments);

    return (
        <>
            <Navbar />
            <Contents>
                <h1 className="border-b bg-custom-blue px-12 pb-6 pt-8 font-Montserrat text-4xl font-bold text-white">
                    Dashboard
                </h1>
                <div className="flex justify-evenly mt-8">
                    <div className="p-8 m-8 bg-gray-100 rounded-lg w-auto">
                        <h1 className="text-3xl">Welcome, <span className="uppercase text-green-500 font-bold">{name}</span></h1>
                        <h1 className="mt-4">Whatever you do, do it with determination, You have one life to live; do your work with passion and give your best</h1>
                    </div>
                    <div className="p-8 m-8 bg-gray-100 rounded-lg w-auto">
                        <div>
                            <h1>Total appointments</h1>
                            <h1 className="text-center mt-6 text-2xl text-green-600">{totalConfirmed}</h1>
                        </div>
                    </div>
                    <div className="p-8 m-8 bg-gray-100 rounded-lg w-auto">
                        <div>
                            <h1>Appointments Cancelled</h1>
                            <h1 className="text-center mt-6 text-2xl text-red-600">{totalCancelled}</h1>
                        </div>
                    </div>
                </div>

                <h1 className="mx-20 my-6 font-semibold text-xl">Today's Appointments</h1>
                {/* Table */}
                <div className="flex flex-col overflow-auto rounded-lg border-2 mx-20">
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


                <div className="mx-20 my-6 flex flex-row items-center justify-between">
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
            </Contents>
        </>
    )
}

export default Dashboard;