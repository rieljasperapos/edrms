import React, { useState, useEffect } from 'react';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import AddAppointment from './addAppointmentsModal';

const CalendarWeekView = (props) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [currentWeek, setCurrentWeek] = useState(dayjs().startOf('week'));
    const navigate = useNavigate();
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);

    const nextWeek = () => {
        setCurrentWeek(currentWeek.add(1, 'week'));
    };

    const prevWeek = () => {
        setCurrentWeek(currentWeek.subtract(1, 'week'));
    };

    const daysOfWeek = [];

    for (let i = 0; i < 7; i++) {
        daysOfWeek.push(currentWeek.add(i, 'day'));
    }

    const staticAppointments = [
        { title: 'Meeting 1', date: '2023-11-24' },
        { title: 'Appointment 2', date: '2023-11-23' },
        { title: 'Event 3', date: '2023-11-23' },
        { title: 'Event 3', date: '2023-11-21' },
        { title: 'Event 3', date: '2023-11-22' },
        { title: 'Event 3', date: '2023-11-23' },
        { title: 'Event 3', date: '2023-11-23' },
        { title: 'Event 3', date: '2023-11-21' },
        { title: 'Event 3', date: '2023-11-21' },
    ];

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleClick = () => {
        navigate('/calendar/month')
    }

    console.log(daysOfWeek);
    console.log(today);
    console.log(today.format("HH:mm"))
    console.log(staticAppointments);


    return (
        <>
            <div className="flex justify-between items-center p-6 border-b">
                <h1 className="text-black font-bold text-3xl uppercase">Calendar</h1>
                <button className="bg-custom-green text-white font-medium rounded-lg p-3" onClick={() => props.setShowModal(true)}>Add appointment</button>

                <AddAppointment
                    isVisible={props.modal}
                    handleClose={() => props.setShowModal(false)} />
            </div>

            <div className="p-8">
                <div className="flex justify-between items-center bg-custom-gray border p-6 min-w-full">
                    <div className='flex items-center gap-4 p-2'>
                        <GrFormPrevious
                            size={25}
                            className=" hover:bg-gray-300 rounded-full"
                            onClick={prevWeek}
                        />
                        <GrFormNext
                            size={25}
                            className=" hover:bg-gray-300 rounded-full"
                            onClick={nextWeek}
                        />
                        <button className='border py-2 px-4 bg-white rounded-lg hover:bg-gray-100 cursor-pointer' onClick={() => { setCurrentWeek(today.startOf('week')) }}>
                            Today
                        </button>

                        <h1 className="font-medium text-xl">{currentWeek.format("MMMM YYYY")}</h1>
                    </div>
                    <div className="inline-block text-left ml-4">
                        <button
                            type="button"
                            className="bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                            onClick={toggleDropdown}
                        >
                            Week
                            <svg
                                className={`w-2.5 h-2.5 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l4 4 4-4" />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 mr-16 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                                <div className="py-1">
                                    <a
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={handleClick}
                                    >
                                        Month
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='overflow-x-auto h-screen border'>
                    <table className='divide-y divide-gray-200 min-w-full'>
                        <thead>
                            <tr>
                                {daysOfWeek.map(day => (
                                    <th key={day.format('YYYY-MM-DD')} className={`px-6 py-3 bg-gray-50 text-left leading-4 font-medium text-gray-500 uppercase tracking-wider`}>
                                        <div className='flex gap-2 items-center'>
                                            <p>{day.format('ddd')}</p>
                                            <p className={`${day.isSame(today, 'day') ? 'bg-red-500 text-white' : ''} rounded-full p-4`}>{day.format('D')}</p>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='h-screen divide-gray-200'>
                            <tr>
                                {daysOfWeek.map(day => (
                                    <td key={day.format('YYYY-MM-DD')} className='px-6 py-4 whitespace-no-wrap border w-20 border-gray-200'>
                                        <div className='flex-col h-screen'>
                                            {props.appointments
                                                .filter(event => day.isSame((event.date_schedule), 'day'))
                                                .map((event, index) => {
                                                    const timeParts = event.time_schedule.split(':');
                                                    const hours = parseInt(timeParts[0], 10);
                                                    const minutes = timeParts[1];
                                                    const amPm = hours >= 12 ? 'PM' : 'AM';
                                                    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
                                                    const formattedTime = `${formattedHours}:${minutes}`;
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`justify-between mb-2 rounded-lg text-white p-2 ${event.status === 'cancelled' ? 'bg-red-400' : 'bg-custom-blue'
                                                                }`}
                                                            onClick={() => {
                                                                props.setShowCard(true);
                                                                console.log(event);
                                                                props.setAppointmentDetails(event);
                                                            }}
                                                        >
                                                            <p className='mb-2'>{formattedTime} {amPm}</p>
                                                            <p>{event.purpose}</p>
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default CalendarWeekView;