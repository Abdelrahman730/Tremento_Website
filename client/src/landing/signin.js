import React, { useEffect } from 'react';
import { useState } from "react";
import Axios from "axios";

import swal from 'sweetalert';

import { useNavigate } from 'react-router-dom';

export default function Signin() {

  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");


  useEffect(() => {
    localStorage.setItem('isLogged',false);
  });

  const navigate = useNavigate();

  const login = () => {
    Axios.post("http://localhost:3001/signin", {
      email: email,
      password: password
    }).then((response) => {
      if (response.data.auth !== true)
      {
        swal({
          title: "Login",
          text: response.data.message,
          icon: "error",
        });
      } else {
        localStorage.setItem('isLogged', JSON.stringify(response.data.result));
        navigate('/');
      }
    });
  };

  return (
    <div className="signin-wrapper">
        <div className="signin-box">
        <h2 className="slim-logo"><a href="index.html">Resturant<span>.</span></a></h2>
        <h2 className="signin-title-primary">Welcome back!</h2>
        <h3 className="signin-title-secondary">Sign in to continue.</h3>

        <div className="form-group">
            <input type="text" className="form-control" placeholder="Enter your email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            />
        </div>
        <div className="form-group mg-b-50">
            <input type="password" className="form-control" placeholder="Enter your password"
            onChange={(event) => {
              setPasword(event.target.value);
            }}
            />
        </div>
        <button className="btn btn-primary btn-block btn-signin" onClick={login}  >Sign In</button>
        <p className="mg-b-0">Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
    </div>
  )
}