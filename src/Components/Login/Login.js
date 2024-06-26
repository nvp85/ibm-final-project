import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { API_URL } from '../../config';


export default function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState('');
    const [err, setErr] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
      if (sessionStorage.getItem("auth-token")) {
        navigate("/")
      }
    }, []);

    const login = async (e) => {
      e.preventDefault();

      // Validation of the email address
      if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
        setErr("Please enter a valid email address.");
      } else {
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email:email,
            password: password,
          }),
        });

        const json = await res.json();

        if (json.authtoken) {
          sessionStorage.setItem('auth-token', json.authtoken);
          sessionStorage.setItem('name', json.name);
          sessionStorage.setItem('email', email);
          navigate('/');
          window.location.reload()
        } else {
          if (json.errors) {
            for (const error of json.errors) {
              alert(error.msg);
            }
          } else {
            alert(json.error);
          }
        }
      }
    };

    return (
        <div className="container">
        <div className="login-text">
          <h2>Login</h2>
        </div>
        <div className="login-text">
          Are you a new member? <span><a href="/Sign_Up" style={{color: "#2190FF"}}> Sign Up Here</a></span>
        </div>
        <br />
        {err && <div className="err" style={{ color: 'red' }}><p>{err}</p></div>}
        <form className="login-form" onSubmit={login}>
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
            <label htmlFor="password" >Password</label>
            <input
              type="password"
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
            <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button> 
            <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
          </div>
          <br />
          <div className="login-text">
            Forgot Password?
          </div>
        </form>
      </div>
    )
}