import Logo from '../assets/cardbg.png';
import { FaRegClock } from "react-icons/fa6";
import { FaRegCalendar, FaEdit } from "react-icons/fa";
import { GoPersonFill } from "react-icons/go";
import EditAppointment from './editAppointmentModal';
import { useState } from 'react';
import { FaRegCircleCheck } from "react-icons/fa6";
import ConfirmCancelAppointment from './confirmCancelAppointment';

const AppointmentCard = ({ appointmentVisible, setShowCard, appointmentDetails, fetchAppointments }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showCancel, setShowCancel] = useState(false);
    const formatDate = (dateString) => {
        const options = {
            weekday: "long",
            month: "long",
            day: "numeric",
        };

        const date = new Date(dateString);
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
        return formattedDate;
    };

    const formatTime12Hour = (timeString) => {
        if (!timeString) return 'No Time Available';

        const [hours, minutes] = timeString.split(':');
        if (isNaN(hours) || isNaN(minutes)) return 'Invalid Time Format';

        const parsedHours = parseInt(hours, 10);
        const amPm = parsedHours >= 12 ? 'PM' : 'AM';
        const formattedHours = parsedHours % 12 === 0 ? 12 : parsedHours % 12;

        return `${formattedHours}:${minutes} ${amPm}`;
    };

    const formattedTime = formatTime12Hour(appointmentDetails?.time_schedule);

    const handleClick = () => {
        setShowEdit(true);
        setShowCard(false);
    }

    console.log(showEdit);
    console.log(`SHOW CANCEL: ${showCancel}`);

    return (
        <>
            {appointmentVisible && (
                <div className="fixed inset-0 flex justify-center items-center">
                    <div className="w-2/5 bg-white rounded-lg overflow-hidden shadow-2xl relative">
                        <div className="absolute top-0 right-0 m-4 flex gap-4">
                            <FaEdit
                                size={22}
                                className="text-white hover:text-gray-800 focus:outline-none"
                                onClick={handleClick}>
                                Edit
                            </FaEdit>
                            <button
                                className="text-white hover:text-gray-800 focus:outline-none"
                                onClick={setShowCard}>
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <img className='w-full h-48 object-cover' src={Logo} alt="Cover Photo"></img>
                        <div className="px-6 py-6 flex flex-col gap-2">
                            <div className="font-bold text-2xl mb-2">{appointmentDetails?.purpose}</div>
                            <div className='mt-2'>
                                <div className='flex items-center gap-4'>
                                    <FaRegCalendar />
                                    <p>
                                        {formatDate(appointmentDetails?.date_schedule)}
                                    </p>
                                </div>
                                <div className='flex items-center gap-4 mt-2'>
                                    <FaRegClock />
                                    <p>{formattedTime}</p>
                                </div>
                                <div className='flex items-center gap-4 mt-8'>
                                    <GoPersonFill />
                                    <p>Patient: {appointmentDetails.name}</p>
                                </div>
                                <div className='flex items-center gap-4 mt-4'>
                                    <FaRegCircleCheck />
                                    <p>
                                        Status: <span className={`font-semibold uppercase ${appointmentDetails.status === 'confirmed' ? 'text-green-500' : 'text-red-500'}`}>{appointmentDetails.status}</span>
                                    </p>
                                    {appointmentDetails.status !== 'cancelled' && (
                                        <h1
                                            className='text-sm text-red-600 cursor-pointer hover:text-red-400'
                                            onClick={() => {
                                                setShowCancel(true);
                                                setShowCard(false);
                                            }}
                                        >
                                            Would like to cancel the appointment?
                                        </h1>
                                    )}
                                </div>
                            </div>
                            <div className='mt-4'>
                                {/* <div className='flex items-center gap-4'>
                                    <CiTextAlignLeft size={20} />
                                    <p className='text-lg'>
                                        {appointmentDetails.purpose}
                                    </p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showEdit && (
                <EditAppointment EditVisible={showEdit} handleClose={() => setShowEdit(false)} appointmentDetails={appointmentDetails} fetchAppointments={fetchAppointments} />
            )}
            {showCancel && (
                <ConfirmCancelAppointment confirmCancelVisible={showCancel} onClose={() => setShowCancel(false)} appointmentDetails={appointmentDetails} fetchAppointments={fetchAppointments} />
            )}
        </>
    );
};

export default AppointmentCard;
