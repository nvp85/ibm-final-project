import React, { useState } from 'react';
import './ReviewForm.css'


function ReviewForm() {
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
        name: '',
        review: '',
        rating: 0
      });
  const handleChange = (e) => {
    setFormData(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedMessage(formData);
    setFormData('');
        if (formData.name && formData.review && formData.rating > 0) {
          setShowWarning(false);
        } else {
          setShowWarning(true);
        }
  };
  return (
    <div className='review-form-container'>
        <form onSubmit={handleSubmit} className='review-form'>
          <h2>Give Your Feedback</h2>
               {showWarning && <p className="warning">Please fill out all fields.</p>}
                <div>
                   <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="review">Review:</label>
                    <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
                 </div>
                 <p id="rating-label">Rating:</p>
                 <div className="rate">
                    <input type="radio" id="star5" name="rate" value="5" />
                    <label htmlfor="star5" title="5">5 stars</label>
                    <input type="radio" id="star4" name="rate" value="4" />
                    <label htmlfor="star4" title="4">4 stars</label>
                    <input type="radio" id="star3" name="rate" value="3" />
                    <label htmlfor="star3" title="3">3 stars</label>
                    <input type="radio" id="star2" name="rate" value="2" />
                    <label htmlfor="star2" title="2">2 stars</label>
                    <input type="radio" id="star1" name="rate" value="1" />
                    <label htmlfor="star1" title="1">1 star</label>
                </div>
                <div style={{display:'block', clear:'both'}}>
                    <button type="submit">Submit</button>
                </div>
                 
               </form>
    </div>
  );
}
export default ReviewForm;