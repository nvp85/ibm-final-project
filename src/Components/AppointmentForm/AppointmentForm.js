import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, setHours, setMinutes } from "date-fns";

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [date, setDate] = useState(setHours(setMinutes(addDays(new Date(),1),0), 8));
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, phoneNumber, date });
      setName('');
      setPhoneNumber('');
      setDate(setMinutes(addDays(new Date(),1),0), 8);
    };

  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
            <label htmlFor="date">Date of Appointment:</label>
            <DatePicker 
                selected={date} 
                onChange={(date) => setDate(date)}
                id="date"
                placeholderText="Pick a date"
                minDate={addDays(new Date(), 1)}
                showIcon 
                required
            />
        </div>

        <div className='form-group'>
            <label htmlFor="time">Book Time Slot:</label>
            <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                id='time'
                minTime={setHours(setMinutes(new Date(), 45), 7)}
                maxTime={setHours(setMinutes(new Date(), 0), 18)}
                required
                />
        </div>
        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm