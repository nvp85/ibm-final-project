import React, { useState, useEffect } from 'react';
import ReviewForm from '../ReviewForm/ReviewForm';
import './ReviewsPage.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function ReviewsPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [appointmentsData, setAppointmentsData] = useState([]);
    const [open, setOpen] = useState(false);  
    const closeModal = () => setOpen(false);

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
                                <button className='give_review' onClick={() => setOpen(true)}>
                                            Give a review
                                </button>
                                <Popup
                                    style={{ backgroundColor: '#FFFFFF' }}
                                    modal
                                    open={open}
                                >
                                    <ReviewForm appt_id={appt.id} close={closeModal} />
                                    <button onClick={closeModal}>Close</button>
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