import React, { useEffect } from 'react';
import {useState} from 'react'

export default function Header()
{

    const [cartList, setCartList] = useState([]);
    const [data, setData] = useState([]);


    useEffect(() => {
        setData(JSON.parse(localStorage.getItem('isLogged')))
    });

    const updateCart = (e) =>
    {
        let cart;
        try {
            cart = JSON.parse(localStorage.getItem('Cart'));
        } catch (e)
        {
            cart = [];
        }
        setCartList(cart);
    }

    return (
        <React.Fragment>
    <div className="slim-landing" >
        <div className="slim-header with-sidebar">
            <div className="container-fluid">
            <div className="slim-header-left">
                <h2 className="slim-logo"><a href="/">TERMENTO<span>.</span></a></h2>

                <div className="pd-10">
                <ul className="nav nav-pills flex-column flex-md-row" >
                    <li className="nav-item"><a className="nav-link active"  href="/">Home</a></li>
                    <li className="nav-item"><a className="nav-link"  href="#Branches">Branches</a></li>
                    <li className="nav-item"><a className="nav-link"  href="#aboutus">About</a></li>
                    <li className="nav-item"><a className="nav-link"  href="/menu">Menu</a></li>
                </ul>
                </div>
                
            </div>
            <div className="slim-header-right">
                <div className="dropdown dropdown-b" data-toggle="tooltip" title="Cart" >
                    <a href="" className="header-notification" data-toggle="dropdown">
                        <i className="icon ion-ios-cart-outline" onClick={updateCart} ></i>
                        <span className="indicator"></span>
                    </a>
                    <div className="dropdown-menu" onClick={updateCart} >
                        <div className="dropdown-menu-header">
                            <h6 className="dropdown-menu-title">Cart</h6>
                        </div>
                        <div className="dropdown-list">

                        {cartList.map((val, key) => {
                            return (
                            <a href="" className="dropdown-link" key={key}>
                                <div className="media">
                                    <img src={"assets/img/" + val.Name + ".png" } alt=""/>
                                    <div className="media-body">
                                        <p><strong>{val.Name}</strong><br/>{ (val.Quantity || "1" )}x</p>
                                        <span>    { (val.Quantity || 1 ) * val.Price} EGP   </span>
                                    </div>
                                </div>
                            </a>
                            );
                        })}

                    
                        
                        <div className="dropdown-list-footer">
                            <a href="/checkout"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-basket3-fill" viewBox="0 0 16 16">
                                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z"/>
                            </svg>
                                Proceed to checkout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
                <div className="dropdown dropdown-c">
                <a href="#" className="logged-user" data-toggle="dropdown">
                    <img src="https://dummyimage.com/500x500" alt=""/>
                    <span>{data ? data.FirstName : " "}</span>
                    <i className="fa fa-angle-down"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                    <nav className="nav">

                    {data ?
                        <div>
                            <a href="/checkout" className="nav-link"><i className="icon ion-ios-cart"></i> Cart</a>
                            <a href="*" className="nav-link"><i className="icon ion-ios-gear"></i> Account Settings</a>
                            <a href="/signin" className="nav-link"><i className="icon ion-forward" ></i> Sign Out</a>
                        </div>
                    :
                        <div>
                            <a href="/signin" className="nav-link"><i className="icon ion-ios-gear"></i> Login</a>
                            <a href="/signup" className="nav-link"><i className="icon ion-forward"></i> Register</a>
                        </div>
                    }
                    </nav>

                    
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </React.Fragment>
    )
}