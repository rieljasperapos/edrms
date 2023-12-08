import MonthView from '../components/calendarMonthView';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import WeekView from '../components/calendarWeekView';
import Navbar from '../components/navbar';
import AddAppointment from '../components/addAppointmentsModal';
import AppointmentCard from '../components/appointmentCardModal';
import EditAppointment from '../components/editAppointmentModal';
import Contents from '../components/contents';
import { useEffect, useState } from 'react';

const Calendar = () => {
    const [appointments, setAppointments] = useState([]);
    const [showAddAppointmentsModal, setShowAddAppointmentsModal] = useState(false);
    const [showAppointmentCard, setShowAppointmentCard] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState({});
    const navigate = useNavigate();

    const fetchAppointments = () => {
        fetch('http://localhost:3000/appointments', {
            method: 'GET',
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
                    setAppointments(data);
                } else {
                    console.log("No data found");
                }
            })
            .catch(err => {
                console.error(err.message);
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
            if (!data.valid) {
                navigate('/signin');
                console.log(data);
            }
        })
        .catch((err) => {
            console.error(err.message);
        })

        fetchAppointments();
    }, [showAddAppointmentsModal])
    
    const handleClose = () => {
        setShowAppointmentCard(false);
    }

    console.log(appointments);
    console.log(`Appointment Card:${showAppointmentCard}`);
    console.log(`Appointment Details: ${appointmentDetails.purpose}`)

    return (
        <>
            <Navbar />
            <AppointmentCard appointmentVisible={showAppointmentCard} setShowCard={handleClose} appointmentDetails={appointmentDetails} fetchAppointments={fetchAppointments}/>
            <Contents>
                <Routes>
                    <Route 
                        path='/month' 
                        element={<MonthView 
                                    appointments={appointments} 
                                    modal={showAddAppointmentsModal} 
                                    setShowModal={setShowAddAppointmentsModal}
                                    setShowCard={setShowAppointmentCard}
                                    appointmentCard={showAppointmentCard}
                                    setAppointmentDetails={setAppointmentDetails} />} />
                    <Route 
                        path="/" 
                        element={<MonthView 
                                    appointments={appointments} 
                                    modal={showAddAppointmentsModal} 
                                    setShowModal={setShowAddAppointmentsModal}
                                    setShowCard={setShowAppointmentCard}
                                    appointmentCard={showAppointmentCard}
                                    setAppointmentDetails={setAppointmentDetails} />} />
                    <Route 
                        path="week" 
                        element={<WeekView 
                                    appointments={appointments} 
                                    modal={showAddAppointmentsModal} 
                                    setShowModal={setShowAddAppointmentsModal}
                                    setShowCard={setShowAppointmentCard}
                                    appointmentCard={showAppointmentCard}
                                    setAppointmentDetails={setAppointmentDetails} />} />
                </Routes>
                <Outlet />
            </Contents>
        </>
    )
}

export default Calendar;