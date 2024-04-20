import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";



export default function Navbar() {
    const [click, setClick] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const[email,setEmail]=useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const handleClick = () => setClick(!click);

    
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        // remove email phone
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        // setUsername("");
       
        // Remove the reviewFormData from local storage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("reviewFormData_")) {
            localStorage.removeItem(key);
          }
        }
        setEmail('');
        window.location.reload();
    }
    const handleDropdown = () => {
      setShowDropdown(!showDropdown);
    }
    useEffect(() => { 
      const storedemail = sessionStorage.getItem("email");
      const storename = sessionStorage.getItem("name");
      if (storedemail) {
            setIsLoggedIn(true);
            setUsername(storename);
          }
        }, []);
    return (
      <nav>
        <div className="nav__logo">
          <a href="/">
          StayHealthy <i style={{color:'#3685fb',fontSize:'26px'}} className="fa fa-user-md"></i></a>
          <span>.</span>
        </div>
        <div className="nav__icon">
          <i className="fa fa-times fa fa-bars"></i>
        </div>
        <ul className="nav__links active">
            <li className="link">
                <Link to="/">Home</Link>
            </li>
            <li className="link">
                <Link to="/search/doctors">Appointments</Link>
            </li>
            <li className="link">
                <Link to="/instant-consultation">Instant Consultation</Link>
            </li>
            <li className="link">
                <Link to="/healthblog">Health Blog</Link>
            </li>
            <li className="link">
                <Link to="/reviews">Reviews</Link>
            </li>
            { isLoggedIn?(
                <>
                    <li className="Link">
                        <p>Welcome, {username}</p>
                    </li>
                    <li className="link">
                        <button className="btn1" onClick={handleLogout}>Logout</button>
                    </li>
                </>
            ) : (
                <>
                    <li className="link">
                        <Link to="/Sign_Up">
                            <button className="btn1">Sign Up</button>
                        </Link>
                    </li>
                    <li className="link">
                        <Link to="/Login">
                            <button className="btn1">Login</button>
                        </Link>
                    </li>
                </>
            )}
            
        </ul>
      </nav>
    )
}