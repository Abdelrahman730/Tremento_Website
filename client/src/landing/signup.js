import React from 'react'
import { useState } from "react";
import Axios from "axios";

import swal from 'sweetalert';

export default function Signup() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const addAccount = () => {
    if (password === confpassword)
    {
      Axios.post("http://localhost:3001/signup", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      address: address,
      phone: phone,
      }).then((response) => {
        if (response.data === "Account with same Email address in already exist !")
        {
          swal({
            title: "Register",
            text: response.data,
            icon: "error",
          });
        } else {
          swal({
            title: "Register",
            text: "You have succsefully created new account.",
            icon: "success",
          });
        }
      });
    } else {
      swal({
        title: "Register",
        text: "Passwords dosen't match !",
        icon: "error",
      });
    }
  };




  return (
    
    <div className="signin-wrapper">
      <div className="signin-box signup">
        <h2 className="slim-logo"><a href="index.html">Resturant<span>.</span></a></h2>
        <h3 className="signin-title-primary">Get Started!</h3>
        <h5 className="signin-title-secondary lh-4">It's free to signup and only takes a minute.</h5>

        <div className="row row-xs mg-b-10">
          <div className="col-sm"><input type="text" className="form-control" placeholder="First Name" 
            onChange={(event) => {
              setFirstName(event.target.value);
            }}
          /></div>

          <div className="col-sm"><input type="text" className="form-control" placeholder="Last Name" 
            onChange={(event) => {
              setLastName(event.target.value);
            }}
          /></div>
        </div>

        <div className="row row-xs mg-b-10">
          <div className="col-sm"><input type="email" className="form-control" placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          /></div>
        </div>

        <div className="row row-xs mg-b-10">
          <div className="col-sm"><input type="password" className="form-control" placeholder="Passowrd"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          /></div>
        </div>

        <div className="row row-xs mg-b-10">
          <div className="col-sm"><input type="password" className="form-control" placeholder="Confirm Password"
          onChange={(event) => {
            setConfPassword(event.target.value);
          }}
          /></div>
        </div>

        <div className="row row-xs mg-b-10">
          <div className="col-sm"><input type="text" className="form-control" placeholder="Address"
          onChange={(event) => {
            setAddress(event.target.value);
          }}
          /></div>
        </div>

        <div className="row row-xs mg-b-10">
          <div className="col-sm"><input type="text" className="form-control" placeholder="Phone Number"
          onChange={(event) => {
            setPhone(event.target.value);
          }}
          /></div>
        </div>


        <button className="btn btn-primary btn-block btn-signin" onClick={addAccount}>Sign Up</button>

        <p className="mg-t-40 mg-b-0">Already have an account? <a href="/signin">Sign In</a></p>
      </div>

    </div>
  )
}
