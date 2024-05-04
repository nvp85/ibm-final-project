import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign_Up.css";
import { API_URL } from '../../config'


export default function Sign_Up() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState([]);

    const navigate = useNavigate();

// Validation of the user's input
    function isValid() {
        let errArray = [];
        if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
            errArray.push("Please enter a valid email address.");
        };
        if (name.length < 4) {
            errArray.push("Username should be at least 4 characters.");
        };
        if (password.length < 8) {
            errArray.push("Password should be at least 8 characters.");
        };
        if (phone.length !== 10) {
            errArray.push("Phone number should be 10 digits.");
        };
        setShowerr(errArray);
        return errArray.length === 0;
    };

    async function register(e) {
        e.preventDefault();

        if (isValid()) {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                }),
            });

            const json = await response.json();

            if (json.authtoken) {
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("name", name);
                // phone and email
                sessionStorage.setItem("phone", phone);
                sessionStorage.setItem("email", email);
                // Redirect to home page
                navigate("/");   //on directing to home page you need to give logic to change login and signup buttons with name of the user and logout button where you have implemented Navbar functionality
                window.location.reload();
            } else {
                if (json.error) {
                    for (const error of json.error) {
                        setShowerr(prev=>[...prev, error.msg]);
                    }
                } 
            }
        }
    };

    return (
        <div className="container">
        <div className="signup-text">
            <h2>Sign Up</h2>
        </div>
        <div className="signup-text1" >
            Already a member? <span><a href="/Login" style={{color: "#2190FF"}}> Login</a></span>
        </div>
        {
            showerr.length>0 && 
            <div className="err" style={{ color: 'red' }}>
                {showerr.map(err=>(<p>{err}</p>))}
            </div>
        }
        <form className="signup-form" onSubmit={register}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    required 
                    className="form-control" 
                    placeholder="Enter your name" 
                    aria-describedby="helpId"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input 
                    type="tel" 
                    name="phone" 
                    id="phone" 
                    required 
                    className="form-control" 
                    placeholder="Enter your phone number"
                    aria-describedby="helpId"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    required 
                    className="form-control" 
                    placeholder="Enter your email" 
                    aria-describedby="helpId" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                    name="password" 
                    id="password" 
                    required 
                    className="form-control" 
                    placeholder="Enter your password" 
                    aria-describedby="helpId" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </div>
            <div className="btn-group">
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
                <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
            </div>
        </form>
    </div>
    );
}