import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css'

const Notification = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    //const [username, setUsername] = useState("");
    //const [doctorData, setDoctorData] = useState(null);
    const [appointmentsData, setAppointmentsData] = useState([]);
    useEffect(() => {
        //const storedUsername = sessionStorage.getItem('email');
        //const storedDoctorData = JSON.parse(localStorage.getItem('apptsData'));
        
        /*if (storedUsername) {
        setIsLoggedIn(true);
        setUsername(storedUsername);
        }
         if (storedDoctorData) {
        setDoctorData(storedDoctorData);
        } */
        function loadAppts() {
            const storedAppointmentsData = JSON.parse(localStorage.getItem('apptsData'));
            if (storedAppointmentsData) {
                let apptsDataArray = [];
                for (let doctor in storedAppointmentsData) {
                    apptsDataArray.push(...storedAppointmentsData[doctor]);
                }
                setAppointmentsData(apptsDataArray);
            }    
        }
        loadAppts();
        window.addEventListener('storage', loadAppts);
        return () => {
            window.removeEventListener('storage', loadAppts);
        }

    }, []);
    return (
        <div>
        <Navbar ></Navbar>
        {children}
        {isLoggedIn && appointmentsData && (
            
            <div className="appointment-card">
                {
                    appointmentsData.map(appt => (
                        <div className="appointment-card__content" key={appt.id}>
                            <h3 className="appointment-card__title">Appointment Details</h3>
                            <ul className="appointment-card__message">
                                <li><strong>Doctor:</strong> {appt.doctor}</li>
                                <li><strong>Speciality:</strong> {appt.speciality}</li>
                                <li><strong>Name:</strong> {appt.name}</li>
                                <li><strong>Phone Number:</strong> {appt.phoneNumber}</li>
                                <li><strong>Date:</strong> {appt.date}</li>
                                <li><strong>Time:</strong> {appt.time}</li>
                            </ul>
                        </div> 
                    ))
                }
            </div>
        
        )}
        </div>
    );
};
export default Notification;