import React from 'react';
import {useState} from 'react'
import Axios from "axios";

export default function Header()
{
    let data = JSON.parse(localStorage.getItem('isLogged'));
    let cart = (JSON.parse(localStorage.getItem('Cart')) || [] ) ;

    const [cardNumber, setCardNumber] = useState("");
    const [paymentMethod, setpaymentMethod] = useState("Credit/Debit Card");

    var totalAmount = 0;

    for (let i = 0 ; i < cart.length ; i++)
    {
        totalAmount += (cart[i].Quantity || 1 ) * cart[i].Price
    }

    const makeOrder = () =>
    {
      if (data)
      {
        if (cart.length > 0)
        {
          Axios.post("http://localhost:3001/makeOrder", {
            customerID: data.ID,
            Payment_method: paymentMethod,
            cardNumber: cardNumber,
            items: cart,
          });

          localStorage.setItem('Cart',JSON.stringify([]));

        }
      }
    }

    return (
        <div className="slim-body">
        <div className="slim-mainpanel">
        <div className="container">
          <div className="slim-pageheader">
            <ol className="breadcrumb slim-breadcrumb">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item"><a href="#">Menu</a></li>
              <li className="breadcrumb-item active" aria-current="page">Checkout</li>
            </ol>
            <h6 className="slim-pagetitle">Checkout</h6>
          </div>

          <div className="card card-invoice">
            <div className="card-body">
              <div className="invoice-header">
                <h1 className="invoice-title">Termento</h1>
              </div>

              <div className="row mg-t-20">
                <div className="col-md">
                  <label className="section-label-sm tx-gray-500">Client Details</label>
                  <div className="billed-to">
                    <h6 className="tx-gray-800">{data.FirstName + data.LastName}</h6>
                    <p>{data.street + '(' + (data.district || "Unknowen" ) +')'}<br></br>
                    Tel No: {data.Phone_Number}<br></br>
                    Email: {data.Email}</p>
                  </div>
                </div>
                <div className="col-md">
                  <label className="section-label-sm tx-gray-500">Invoice Information</label>
                  <p className="invoice-info-row">
                    <span>Order issue date:</span>
                    <span>{new Date().toLocaleString()}</span>
                  </p>
                </div>
              </div>

              <div className="table-responsive mg-t-40">
                <table className="table table-invoice">
                  <thead>
                    <tr>
                      <th className="wd-20p">Type</th>
                      <th className="wd-40p">Description</th>
                      <th className="tx-center">Quantity</th>
                      <th className="tx-right">Unit Price</th>
                      <th className="tx-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                  {cart.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.Name}</td>
                            <td className="tx-12">INGREDIENTS</td>
                            <td className="tx-center">{ (val.Quantity || "1" )}</td>
                            <td className="tx-right">{val.Price}.00</td>
                            <td className="tx-right">{ (val.Quantity || 1 ) * val.Price}.00 EGP</td>
                        </tr>
                    );
                    })}

                    <tr>
                      <td colSpan="2" rowSpan="4" className="valign-middle">
                        <div className="invoice-notes">
                          <label className="section-label-sm tx-gray-500">Notes</label>
                          <p>The Order can not be canceled after it enters the shpping state. </p>
                        </div>
                      </td>
                      <td className="tx-right">Total Amount</td>
                      <td colSpan="2" className="tx-right">{totalAmount}.00 EGP</td>
                    </tr>
                    <tr>
                      <td className="tx-right tx-uppercase tx-bold tx-inverse">Total Due</td>
                      <td colSpan="2" className="tx-right"><h4 className="tx-primary tx-bold tx-lato">{totalAmount + 25}.00 EGP</h4></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr className="mg-b-60"></hr>

              <div className="card">
              <div className="card-body pd-30">
                <h6 className="slim-card-title">Payment Information</h6>
                <div className="form-group mg-t-20">
                  <label className="form-control-label mg-r-10">Pay using your:</label>
                  <label className="rdiobox d-inline-block">
                    <input name="radio" type="radio" value="Credit/Debit Card" onChange={(e) => { setpaymentMethod(e.target.value); }} 
                    checked={paymentMethod === "Credit/Debit Card"}></input>
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="rdiobox d-inline-block mg-xs-l-20">
                  <input name="radio" type="radio" value="Cash on Delivery" onChange={(e) => { setpaymentMethod(e.target.value); }} 
                    checked={paymentMethod === "Cash on Delivery"}></input>
                    <span>Cash on Delivery</span>
                  </label>
                </div>

                <p className="tx-32">
                  <i className="fa fa-cc-visa mg-r-5"></i>
                  <i className="fa fa-cc-mastercard mg-r-5"></i>
                  <i className="fa fa-cc-discover"></i>
                </p>

                <div className="form-group">
                  <label className="form-control-label">Card Number</label>
                  <input type="text" name="cardno" className="form-control"
                  onChange={(event) => {
                    setCardNumber(event.target.value);
                  }}
                  ></input>
                </div>

                <div className="form-group">
                  <label className="form-control-label">Name on Card</label>
                  <input type="text" name="cardname" className="form-control"></input>
                </div>

                <div className="row">
                  <div className="col-sm-5">
                    <div className="form-group">
                      <label className="form-control-label">Card Expiry</label>
                      <div className="row">
                        <div className="col">
                          <input type="text" name="cardmonth" placeholder="MM" className="form-control"></input>
                        </div>
                        <div className="col">
                          <input type="text" name="cardyear" placeholder="YY" className="form-control"></input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="form-control-label">CVV </label>
                      <input type="text" name="cardno" className="form-control"></input>
                    </div>
                  </div>
                </div>

                <p className="mg-t-25">
                  <label className="ckbox">
                    <input type="checkbox" checked></input>
                    <span>I have read and accept the terms of use on this website.</span>
                  </label>
                </p>

              </div>
            </div>

              <button className="btn btn-primary btn-block" onClick={makeOrder}>Order now</button>

            </div>
          </div>

        </div>
      </div>
      </div>
    )
}