import { useEffect, useState } from "react";

const ConfirmCancelAppointment = ({ onClose, appointmentDetails, fetchAppointments }) => {
    const formatDate = (dateString) => {
        const originalDate = new Date(dateString);
    
        // Format the date to "yyyy-MM-dd"
        const year = originalDate.getFullYear();
        const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
        const day = originalDate.getDate().toString().padStart(2, '0');
    
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };

    const [date, setDate] = useState(formatDate(appointmentDetails.date_schedule));
    const [timeSchedule, setTimeSchedule] = useState(appointmentDetails.time_schedule);
    const [name, setName] = useState(appointmentDetails.name);
    const [contactNumber, setContactNumber] = useState(appointmentDetails.contact_number);
    const [purpose, setPurpose] = useState(appointmentDetails.purpose);

    let status;
    console.log(appointmentDetails);


    const handleClick = () => {
        status = 'cancelled';

        fetch(`http://localhost:3000/appointments/edit/${appointmentDetails?.appointment_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({date, timeSchedule, name, contactNumber, purpose, status })
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
                    onClose();
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

    return (
        <>
            <div className="fixed inset-0 flex justify-center items-center">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="flex justify-end mb-4">
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            Close
                        </button>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <h1>Are you sure you want to cancel this appointment?</h1>
                        <div className="mt-4">
                            <button className="mr-4 bg-red-500 text-white px-4 py-2 rounded" onClick={handleClick}>
                                Yes
                            </button>
                            <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmCancelAppointment;