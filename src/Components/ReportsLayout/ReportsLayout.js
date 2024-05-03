import React, { useState, useEffect } from 'react';
import './ReportsLayout.css';


export default function ReportsLayout() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [appointmentsData, setAppointmentsData] = useState([]);

    useEffect(() => {
        const storedAppointmentsData = JSON.parse(localStorage.getItem('apptsData'));
        if (storedAppointmentsData) {
            let apptsDataArray = [];
            for (let doctor in storedAppointmentsData) {
                apptsDataArray.push(...storedAppointmentsData[doctor]);
            }
            setAppointmentsData(apptsDataArray);
        }    
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
                                    <button 
                                        className='report-button'
                                    >
                                        View Report
                                    </button> 
                                    
                                </td>
                                <td> 
                                    <button className='report-button'>
                                        Download Report
                                    </button>
                                </td>
                            </tr>)    
                        })
                    }
                </tbody>
            </table>
        </div>
    )  
}