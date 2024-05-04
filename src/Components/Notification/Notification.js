import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';
import { useNavigate } from "react-router-dom";


const Notification = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //const [username, setUsername] = useState("");
    //const [doctorData, setDoctorData] = useState(null);
    const [appointmentsData, setAppointmentsData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const authtoken = sessionStorage.getItem("auth-token");
        
        if (authtoken) {
            setIsLoggedIn(true);
        } else {
            navigate("/login");
        };

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
        {isLoggedIn && appointmentsData.length && (
            
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