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
    const [reviews, setReviews] = useState(
        JSON.parse(localStorage.getItem('reviews')) || []
    );
    const [currAppt, setCurrAppt] = useState();

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

    function findReview(appt_id) {
        return reviews.find((review) => review.id === appt_id) 
    };

    function handleSubmit(newReview) {
        setReviews(prev => [newReview, ...prev]);
    };

    useEffect(() => {
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }, [reviews]);

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
                        appointmentsData.map((appt, index) => {
                            let apptReview = findReview(appt.id);
                            return (
                            <tr>
                                <td>{index+1}</td>
                                <td>{appt.doctor}</td>
                                <td>{appt.speciality}</td>
                                <td>
                                    {
                                        apptReview
                                        ?
                                        <button className='give-review' disabled>Give a review</button> 
                                        :
                                    <button 
                                        className='give-review' 
                                        onClick={() => {
                                            setCurrAppt(appt.id);
                                            setOpen(true);
                                        }}
                                    >
                                                Give a review
                                    </button>
                                    }
                                </td>
                                <td> {apptReview ? apptReview.review : "-"} </td>
                            </tr>)    
                    })
                    }

                </tbody>
            </table>
            <Popup
                style={{ backgroundColor: '#FFFFFF' }}
                modal
                open={open}
                onClose={closeModal}
            >
                <ReviewForm appt_id={currAppt} close={closeModal} onSubmit={handleSubmit}/>
                <button onClick={closeModal}>Close</button>
            </Popup>
        </div>

    )
    
}