import React, { useState, useEffect } from 'react';
import ReviewForm from '../ReviewForm/ReviewForm';
import './ReviewsPage.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function ReviewsPage() {
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
        <div className='reviews-container'>

            <table className='reviews-table'>
                <caption>Reviews</caption>
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Doctor's Name</th>
                        <th>Doctor's Speciality</th>
                        <th>Provide Feedback</th>
                        <th>Review Given</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointmentsData.map((appt, index) => (
                        <tr>
                            <td>{index+1}</td>
                            <td>{appt.doctor}</td>
                            <td>{appt.speciality}</td>
                            <td>
                                <Popup
                                    style={{ backgroundColor: '#FFFFFF' }}
                                    trigger={
                                        <button className='give_review'>
                                            Give a review
                                        </button>
                                    }
                                    modal
                                >
                                    <ReviewForm appt_id={appt.id} />
                                </Popup>
                            </td>
                            <td> - </td>
                        </tr>    
                    ))
                    }

                </tbody>
            </table>

        </div>

    )
    
}