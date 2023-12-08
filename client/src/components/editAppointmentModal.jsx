import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const editAppointmentsModal = ({ handleClose, EditVisible, appointmentDetails, fetchAppointments }) => {
    const [date, setDate] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [timeSchedule, setTimeSchedule] = useState('');
    const [purpose, setPurpose] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    console.log(date);
    console.log(contactNumber);
    console.log(timeSchedule);
    console.log(purpose);
    console.log(name)

    console.log('Appointment ID');
    console.log(appointmentDetails?.appointment_id);

    const handleClick = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/appointments/edit/${appointmentDetails?.appointment_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, timeSchedule, name, contactNumber, purpose })
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
                    handleClose();
                } else {
                    // Handle the case where data is falsy
                }
            })
            .catch(err => {
                console.error(err.message);
            })
            .finally(() => {
                fetchAppointments();
            })
    }

    console.log(appointmentDetails)

    const formatDate = (dateString) => {
        const originalDate = new Date(dateString);
    
        // Format the date to "yyyy-MM-dd"
        const year = originalDate.getFullYear();
        const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
        const day = originalDate.getDate().toString().padStart(2, '0');
    
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };
    useEffect(() => {
        if (appointmentDetails) {
            setDate(formatDate(appointmentDetails.date_schedule))
            setContactNumber(appointmentDetails.contact_number)
            setTimeSchedule(appointmentDetails.time_schedule)
            setPurpose(appointmentDetails.purpose)
            setName(appointmentDetails.name)
        }
    }, [appointmentDetails]);

    return (
        <>
            {EditVisible && (<div id="default-modal" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full">
                <div className="relative p-4 w-full max-w-3xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow-xl">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-custom-blue dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-white dark:text-white">
                                Edit appointment
                            </h3>
                            <button type="button" onClick={handleClose} className="text-gray-100 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal Body */}
                        <div className="flex justify-center items-center flex-wrap gap-5 py-12 px-2">
                            <div className="flex flex-col gap-1">
                                <p>Date</p>
                                <input value={date} type="date" className="p-4 w-96 rounded-lg border" onChange={(e) => setDate(e.target.value)}></input>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p>Time</p>
                                <input value={timeSchedule} type="time" className="p-4 w-96 rounded-lg border" onChange={(e) => setTimeSchedule(e.target.value)}></input>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p>Name</p>
                                <input value={name} type="text" className="p-4 w-96 rounded-lg border" placeholder="e.g John Doe" onChange={(e) => setName(e.target.value)}></input>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p>Contact Number</p>
                                <input value={contactNumber} type="text" className="p-4 w-96 rounded-lg border" placeholder="09XXXXXXXXX" onChange={(e) => setContactNumber(e.target.value)}></input>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p>Purpose</p>
                                <textarea value={purpose} rows="4" type="text" className="p-4 w-96 rounded-lg border" placeholder="e.g Monthly teeth cleaning" onChange={(e) => setPurpose(e.target.value)}></textarea>
                            </div>
                            <div className="mt-10">
                                <button className="bg-custom-green hover:bg-green-300 text-white p-4 rounded-lg w-96" onClick={handleClick}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        
        </>
    )
}

export default editAppointmentsModal;