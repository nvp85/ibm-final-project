import React from "react";
import { Link } from "react-router-dom";
import "./Sign_Up.css";

export default function Sign_Up() {
    return (
        <div className="container">
        <div className="signup-text">
            <h2>Sign Up</h2>
        </div>
        <div className="signup-text1" >
            Already a member? <span><a href="/Login" style={{color: "#2190FF"}}> Login</a></span>
        </div>
        <form className="signup-form">
            <div className="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" required className="form-control" placeholder="Enter your name" aria-describedby="helpId" />
            </div>
            <div className="form-group">
                <label for="phone">Phone</label>
                <input type="tel" name="phone" id="phone" required className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" />
            </div>
            <div className="form-group">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" required className="form-control" placeholder="Enter your email" aria-describedby="helpId" />

            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input name="password" id="password" required className="form-control" placeholder="Enter your password" aria-describedby="helpId" />


            </div>
            <div className="btn-group">
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
                <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
            </div>
        </form>
    </div>
    )
}