import './App.css';
import Landing_Page from './Components/Landing_Page/Landing_page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';
import BookingConsultation from './Components/BookingConsultation/BookingConsultation';
import Notification from './Components/Notification/Notification';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Notification>
              <Routes>
                <Route path="/" element={<Landing_Page/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path='/Sign_Up' element={<Sign_Up/>}/>
                <Route path="/instant-consultation" element={<InstantConsultation />} />
                <Route path="/search/doctors"  element={<BookingConsultation />} />
              </Routes>
            </Notification>
        </BrowserRouter>
    </div>
  );
}

export default App;
