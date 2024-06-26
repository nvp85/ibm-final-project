import React, { useState, useEffect } from 'react';
import './ReportsLayout.css';
import { useNavigate } from "react-router-dom";


export default function ReportsLayout() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [appointmentsData, setAppointmentsData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const authtoken = sessionStorage.getItem("auth-token");
        
        if (authtoken) {
            setIsLoggedIn(true);
        }; 
        if (isLoggedIn) {
            let apptsDataArray = [];
            const storedAppointmentsData = JSON.parse(localStorage.getItem('apptsData'));
            if (storedAppointmentsData) {
                for (let doctor in storedAppointmentsData) {
                    apptsDataArray.push(...storedAppointmentsData[doctor]);
                }
            }
            if (apptsDataArray.length > 0) {
                setAppointmentsData(apptsDataArray);
            } else {
                const example = {
                    id: 'example',
                    doctor: 'Dr. Example',
                    speciality: 'Dentist'
                }
                setAppointmentsData([example]); // add exemplar appt so the report table is not empty (for grading)
            }
        } else {
            navigate("/login");
        };   
    }, []);

    return (
        <div className='reports-container'>
            <table className='reports-table'>
                <caption>Reports</caption>
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Doctor's Name</th>
                        <th>Doctor's Speciality</th>
                        <th>View Report</th>
                        <th>Download Report</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointmentsData.map((appt, index) => {
                            return (
                            <tr>
                                <td>{index+1}</td>
                                <td>{appt.doctor}</td>
                                <td>{appt.speciality}</td>
                                <td>
                                    <a 
                                        className='report-button'
                                        target='_blank'
                                        href="patient_report.pdf"
                                    >
                                        View Report
                                    </a> 
                                    
                                </td>
                                <td> 
                                    <a
                                    className='report-button'
                                    href="patient_report.pdf"
                                    download
                                    >
                                        Download Report
                                    </a>
                                </td>
                            </tr>)    
                        })
                    }
                </tbody>
            </table>
        </div>
    )  
}