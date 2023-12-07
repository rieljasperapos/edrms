import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { generateDate, months } from "../utils/calendar";
import dayjs from "dayjs";
import cn from "../utils/cn";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AddAppointment from './addAppointmentsModal';
import AppointmentCard from './appointmentCardModal';
import EditAppointment from './editAppointmentModal';

const calendarMonthView = (props) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);
    console.log(props.appointments);

    const days = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ];
    const hours = Array.from({ length: 24 }, (_, index) => index);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleClick = () => {
        navigate('/calendar/week')
    }

    const handleClose = () => {
        props.setShowModal(false);
    }

    console.log(props.modal);
    console.log(props.appointmentCard);

    // console.log(`Current Date: ${currentDate.format("HH:mm")}`);
    // console.log(hours);
    // console.log(`Today: ${today.hour()} : ${today.minute()}`);
    // console.log(selectDate);
    // console.log(`Today.month: ${today.month()}`)
    // console.log(currentDate.month());
    // console.log(today);

    return (
        <>
            {/* <Navbar /> */}
            <div className="flex justify-between items-center p-6 border-b">
                <h1 className="text-black font-bold text-3xl uppercase">Calendar</h1>
                <button
                    className="bg-custom-green text-white font-medium rounded-lg p-3"
                    onClick={() => {
                        props.setShowModal(true);
                    }}
                >
                    Add appointment
                </
                button>
                <AddAppointment
                    isVisible={props.modal}
                    handleClose={handleClose}
                />
                <EditAppointment 
                    isVisible={props.editMode}
                    handleClose={() => props.setShowEdit(false)}/>
            </div>

            <div className="p-8">
                <div className="flex justify-between items-center bg-custom-gray border p-6">
                    <div className="flex items-center gap-4 p-2">
                        <GrFormPrevious
                            size={25}
                            className=" hover:bg-gray-300 rounded-full"
                            onClick={() => {
                                setToday(today.month(today.month() - 1));
                            }}
                        />
                        <GrFormNext
                            size={25}
                            className=" hover:bg-gray-300 rounded-full"
                            onClick={() => {
                                setToday(today.month(today.month() + 1));
                            }}
                        />
                        <button
                            className='border py-2 px-4 bg-white rounded-lg hover:bg-gray-100 cursor-pointer'
                            onClick={() => {
                                setToday(currentDate);
                            }}>
                            Today
                        </button>
                        <h1 className="font-medium text-xl">{months[today.month()]} {today.year()}</h1>
                    </div>
                    <div className="relative inline-block text-left ml-4">
                        <button
                            type="button"
                            className="text-black bg-white hover:bg-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                            onClick={toggleDropdown}
                        >
                            Month
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
                            <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                                <div className="py-1">
                                    <a
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={handleClick}
                                    >
                                        Week
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-7">
                        {days.map((day, idx) => {
                            return (
                                <div>
                                    <h1 key={idx} className="text-sm grid place-content-center border p-2">{day}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-7">
                    {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, indx) => {
                        // console.log(today);
                        // console.log(date);
                        return (
                            <div key={indx} className="flex flex-col border pr-8 pb-20 pl-4">
                                <h1 className={cn(
                                    currentMonth ? "" : "text-gray-400",
                                    today ? "bg-red-500 text-white" : "",
                                    selectDate.toDate().toDateString() === date.toDate().toDateString() ? "bg-custom-green text-white" : "",
                                    "h-10 w-10 mt-2 grid place-content-center rounded-full hover:bg-custom-green cursor-pointer hover:text-white transition-all"
                                )}
                                    onClick={() => {
                                        setSelectDate(date);
                                    }}
                                >{date.date()}
                                </h1>
                                <div className="p-2">
                                    {props.appointments
                                        .filter(event => date.isSame(event.date_schedule), 'day')
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
                                                    className="flex flex-col gap-2 text-sm mt-2 bg-custom-blue rounded-lg text-white cursor-pointer hover:scale-105 transition-transform ease-in p-2" 
                                                    onClick={() => {
                                                        props.setShowCard(true)
                                                        console.log(event)
                                                        props.setAppointmentDetails(event);

                                                    }}>
                                                        <p className="font-semibold">{formattedTime} {amPm}</p>
                                                        <p>{event.purpose}</p>

                                                    {/* <AppointmentCard isVisible={props.appointmentCard} /> */}
                                                </div>
                                            )
                                        })
                                    }
                                    {/* <p className={`text-sm mt-2 bg-custom-blue rounded-lg text-white cursor-pointer hover:scale-105 transition-transform ease-in ${today ? 'p-2' : ''}`}>{cn(today ? `Static Appointment, ${currentDate.format("HH:mm")}` : "")}</p> */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default calendarMonthView;