import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const addAppointmentsModal = ({ handleClose, isVisible }) => {
    const [date, setDate] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [timeSchedule, setTimeSchedule] = useState('');
    const [purpose, setPurpose] = useState('');
    const [name, setName] = useState('');
    const [patientExist, setPatientExist] = useState(false);
    const navigate = useNavigate();

    // console.log(contactNumber)
    // console.log(timeSchedule)
    // console.log(date)
    // console.log(purpose);
    // console.log(name);

    // useEffect(() => {
    //         setDate('')
    //         setContactNumber('')
    //         setTimeSchedule('')
    //         setPurpose('')
    //         setName('')
    // }, []);

    const handleClick = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/appointments/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
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
                    setDate('');
                    setContactNumber('');
                    setTimeSchedule('');
                    setPurpose('');
                    setName('');
                    setPatientExist(false);
                } else {
                    
                }
            })
            .catch(err => {
                console.error(err.message);
            })
    }

    const handleChange = (e) => {
        const newName = e.target.value;
        setName(newName);

        fetch(`http://localhost:3000/appointments/patient`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: newName }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setPatientExist(data.exist);
        })
        .catch(error => {
            console.error(`Error cannot find user: ${error.message}`);
        });
    }

    return (
        <>
            {isVisible && (<div id="default-modal" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full backdrop-brightness-50 md:inset-0 h-[calc(100%)] max-h-full">
                <div className="relative p-4 w-full max-w-3xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-custom-blue dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-white dark:text-white">
                                Add appointment
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
                                <input value={name} type="text" className="p-4 w-96 rounded-lg border" placeholder="e.g Morales, Stanleigh Balmes " onChange={handleChange}></input>
                                {patientExist && <p className="text-green-500">A previous patient, this name exist in the records</p>}
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
                                <button className="bg-custom-green hover:bg-green-300 text-white p-4 rounded-lg w-96" onClick={handleClick}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        
        </>
    )
}

export default addAppointmentsModal;