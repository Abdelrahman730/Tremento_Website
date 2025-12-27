import React from 'react'
import {useState} from 'react'
import Axios from "axios";

export default function Menu ()
{

  const [menuList, setMenuList] = useState([]);

  const getMenu = () => {
    Axios.get("http://localhost:3001/menu").then((response) => {
      setMenuList(response.data);
    });
  };

  getMenu();


  const addToCart = (Index) => {
    let data;
    try {
      data = JSON.parse(localStorage.getItem('Cart'));
    } catch (e)
    {
      data = [];
    }
    let i = 0;
    let flag = -1;
    for (i = 0 ; i < data.length;i++)
    {
      if (data[i].Name ==  menuList[Index].Name)
      {
        flag = i
        break;
      }
    }

    if (flag !== -1)
    {
      data[flag].Quantity = (data[flag].Quantity || 0 )  + 1;
    } else {
      data.push(menuList[Index])
    }
    localStorage.setItem('Cart',JSON.stringify(data))
  };
 
  let List = []
  for (let i = 0 ; i < menuList.length ;i +=3)
  {
    List.push(
      <div className="row row-sm" key = {i} >
        <div className="col-sm-6 col-lg-4">
          <div className="card-contact">
            <div className="tx-center">
              <a href=""><img src={"assets/img/" + menuList[i].Name + ".png" } className="card-img" alt=""/></a>
              <h5 className="mg-t-10 mg-b-5"><a href="" className="contact-name">{menuList[i].Name}</a></h5>
              <p>{menuList[i].Type.charAt(0).toUpperCase() + menuList[i].Type.slice(1)}</p>
            </div>
            <p className="contact-item">
              <span>INGREDIENTS:</span>
              <span>Two slices of burgers + Onion + Cheese</span>
            </p>
            <p className="contact-item">
              <span>PRICE:</span>
              <a href="">{menuList[i].Price}.00 EGP</a>
            </p>
            <button className="btn btn-primary btn-block mg-b-10" onClick={() => {addToCart(i); }} ><i className="fa fa-cart-plus mg-r-5"  ></i> Add to cart</button>
          </div>
        </div>
        
        {i+1 < menuList.length ? 
        <div className="col-sm-6 col-lg-4">
          <div className="card-contact">
            <div className="tx-center">
              <a href=""><img src={"assets/img/" + menuList[i+1].Name + ".png" } className="card-img" alt=""/></a>
              <h5 className="mg-t-10 mg-b-5"><a href="" className="contact-name">{menuList[i+1].Name}</a></h5>
              <p>{menuList[i+1].Type.charAt(0).toUpperCase() + menuList[i+1].Type.slice(1)}</p>
            </div>
            <p className="contact-item">
              <span>INGREDIENTS:</span>
              <span>Two slices of burgers + Onion + Cheese</span>
            </p>
            <p className="contact-item">
              <span>PRICE:</span>
              <a href="">{menuList[i+1].Price}.00 EGP</a>
            </p>
            <button className="btn btn-primary btn-block mg-b-10" onClick={() => {addToCart(i+1); }}  ><i className="fa fa-cart-plus mg-r-5"  ></i> Add to cart</button>
          </div>
        </div>
        : ""}
        

        {i+2 < menuList.length ? 
        <div className="col-sm-6 col-lg-4">
          <div className="card-contact">
            <div className="tx-center">
              <a href=""><img src={"assets/img/" + menuList[i+2].Name + ".png" } className="card-img" alt=""/></a>
              <h5 className="mg-t-10 mg-b-5"><a href="" className="contact-name">{menuList[i+2].Name}</a></h5>
              <p>{menuList[i+2].Type.charAt(0).toUpperCase() + menuList[i+2].Type.slice(1)}</p>
            </div>
            <p className="contact-item">
              <span>INGREDIENTS:</span>
              <span>Two slices of burgers + Onion + Cheese</span>
            </p>
            <p className="contact-item">
              <span>PRICE:</span>
              <a href="">{menuList[i+2].Price}.00 EGP</a>
            </p>
            <button className="btn btn-primary btn-block mg-b-10" onClick={() => {addToCart(i+2); }} ><i className="fa fa-cart-plus mg-r-5"  ></i> Add to cart</button>
          </div>
        </div>
        : ""}
        </div>
    )
  }

    return (
    <React.Fragment>
    <div className="slim-body">
      <div className="slim-mainpanel">
        <div className="container">
          <div className="manager-header">
            <div className="slim-pageheader">
              <ol className="breadcrumb slim-breadcrumb">
                <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Menu</li>
              </ol>
              <h6 className="slim-pagetitle">Menu</h6>
            </div>
            <a id="contactNavicon"  href="" className="contact-navicon"><i className="icon ion-navicon-round"></i></a>
          </div>

          <div className="manager-wrapper">
            <div className="manager-right">
              {List}
            </div>
          </div>

        </div>
      </div>
    </div>

    <script src="../lib/jquery/js/jquery.js"></script>
    <script src="../lib/popper.js/js/popper.js"></script>
    <script src="../lib/bootstrap/js/bootstrap.js"></script>   
    </React.Fragment>
    )
}