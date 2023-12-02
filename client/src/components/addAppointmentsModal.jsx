import { useState } from "react";

const addAppointmentsModal = ({ handleClose, isVisible }) => {
    const [date, setDate] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [timeSchedule, setTimeSchedule] = useState('');
    const [purpose, setPurpose] = useState('');
    const [name, setName] = useState('');

    console.log(contactNumber)
    console.log(timeSchedule)
    console.log(date)
    console.log(purpose);
    console.log(name);
    return (
        <>
            {isVisible && (<div id="default-modal" className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full backdrop-blur-sm md:inset-0 h-[calc(100%-1rem)] max-h-full">
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
                            <div>
                                <p>Date</p>
                                <input value={date} type="date" className="p-4 w-96 rounded-lg border" onChange={(e) => setDate(e.target.value)}></input>
                            </div>
                            <div>
                                <p>Contact Number</p>
                                <input value={contactNumber} type="text" className="p-4 w-96 rounded-lg border" placeholder="09XXXXXXXXX" onChange={(e) => setContactNumber(e.target.value)}></input>
                            </div>
                            <div>
                                <p>Time</p>
                                <input value={timeSchedule} type="time" className="p-4 w-96 rounded-lg border" onChange={(e) => setTimeSchedule(e.target.value)}></input>
                            </div>
                            <div>
                                <p>Name</p>
                                <input value={name} type="text" className="p-4 w-96 rounded-lg border" placeholder="e.g John Doe" onChange={(e) => setName(e.target.value)}></input>
                            </div>
                            <div>
                                <p>Purpose</p>
                                <textarea value={purpose} rows="4" type="text" className="p-4 w-96 rounded-lg border" placeholder="e.g Monthly teeth cleaning" onChange={(e) => setPurpose(e.target.value)}></textarea>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>)}
        
        </>
    )
}

export default addAppointmentsModal;