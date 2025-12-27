import React from 'react'
import './dashboard_enhancements.css';
import Axios from "axios";
import { useState } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Summary() {

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const d = new Date();

  const [totalMenus, setTotalMenus] = useState("");
  const [totalClient, setTotalClient] = useState("");
  const [totalBranches, setTotalBranches] = useState("");
  const [totalRevenue, setTotalRevenue] = useState("");

  Axios.get("http://localhost:3001/summary").then((response) => {
    setTotalMenus(response.data[0].OrderNum);
    setTotalClient(response.data[0].CustomerNum);
    setTotalBranches(response.data[0].BranchesNum);
    setTotalRevenue(response.data[0].totalRevenue);
  });

  const [orderSummary, setOrderSummary] = useState([]);

  Axios.get("http://localhost:3001/ordersSummary").then((response) => {
    setOrderSummary([response.data[0].Num, response.data[2].Num, response.data[1].Num])
  });

  const [trendingItems, setTrendingItems] = useState([]);

  Axios.get("http://localhost:3001/trendingItems").then((response) => {
    setTrendingItems(response.data)
  });

  const [ordersData, setOrderData] = useState([]);

  Axios.get("http://localhost:3001/showOrders").then((response) => {
    setOrderData(response.data)
  });

  return (
    <React.Fragment>
      <div className="slim-body">
        <div className="slim-mainpanel">
          <div className="container">
            <div className="manager-header">
              <div className="slim-pageheader">
                <ol className="breadcrumb slim-breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Summary</li>
                </ol>
                <h6 className="slim-pagetitle">Summary</h6>
              </div>
              <a id="contactNavicon" href="" className="contact-navicon"><i className="icon ion-navicon-round"></i></a>
            </div>
            <div className="manager-wrapper">
              <div className="manager-right">
                <div className="report-summary-header">
                  <div>
                    <h4 className="tx-inverse mg-b-3">Overall Summary Report</h4>
                    <p className="mg-b-0"><i className="icon ion-calendar mg-r-3"></i>{months[d.getMonth()] + " " + d.getDay() + " , " + d.getFullYear()}</p>
                  </div>
                  <div></div>
                </div>

                {/* Row 1: Summary Cards */}
                <div className="row row-sm">
                  <div className="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-0">
                    <div className="card card-total kpi-1 h-100">
                      <div>
                        <h1>{totalMenus}</h1>
                        <p>TOTAL PRODUCT</p>
                      </div>
                      <div>
                        <div className="tx-24 mg-b-10 tx-center">
                          <i className="icon fa fa-cutlery"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-0">
                    <div className="card card-total kpi-2 h-100">
                      <div>
                        <h1>{totalClient}</h1>
                        <p>TOTAL CLIENT</p>
                      </div>
                      <div>
                        <div className="tx-24 mg-b-10 tx-center">
                          <i className="icon ion-man"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-0">
                    <div className="card card-total kpi-3 h-100">
                      <div>
                        <h1>{totalBranches}</h1>
                        <p>TOTAL BRANCHES</p>
                      </div>
                      <div>
                        <div className="tx-22 mg-b-10 tx-center">
                          <i className="icon ion-location"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-3 mg-t-20 mg-xl-t-0">
                    <div className="card card-total kpi-4 h-100">
                      <div>
                        <h1>{totalRevenue}</h1>
                        <p>TOTAL REVENUE</p>
                      </div>
                      <div>
                        <div className="tx-22 mg-b-10 tx-center">
                          <i className="icon fa fa-money"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2: Chart and Trending Items */}
                <div className="row row-sm mg-t-20">
                  {/* Pie Chart */}
                  <div className="col-lg-5">
                    <div className="card card-table h-100">
                      <div className="card-header">
                        <h6 className="slim-card-title">Product Purchases</h6>
                      </div>
                      <div className="mg-b-25 pie-chart-container">
                        <Pie
                          data={{
                            labels: ['Cancelled', 'Delivered', 'Processing'],
                            datasets: [
                              {
                                label: '# of votes',
                                data: orderSummary,
                                backgroundColor: [
                                  'rgba(255, 99, 132, 1)',
                                  'rgba(255, 206, 86, 1)',
                                  'rgba(54, 162, 235, 1)',
                                ],
                                borderColor: [
                                  'rgba(255, 99, 132, 1)',
                                  'rgba(255, 206, 86, 1)',
                                  'rgba(54, 162, 235, 1)',
                                ],
                                borderWidth: 1,
                              },
                            ],
                          }}
                          height={250}
                          options={{
                            maintainAspectRatio: false,
                            legend: {
                              labels: {
                                fontSize: 14,
                              },
                              position: 'bottom'
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Trending Items */}
                  <div className="col-lg-7 mg-t-20 mg-lg-t-0">
                    <div className="card card-table h-100">
                      <div className="card-header">
                        <h6 className="slim-card-title">Trending Items</h6>
                      </div>
                      <div className="table-responsive">
                        <table className="table mg-b-0 tx-13">
                          <thead>
                            <tr className="tx-10">
                              <th className="wd-10p pd-y-5">&nbsp;</th>
                              <th className="pd-y-5">Name</th>
                              <th className="pd-y-5">Price</th>
                              <th className="pd-y-5">Total Purchases</th>
                              <th className="pd-y-5">Total Revenue</th>
                            </tr>
                          </thead>
                          <tbody>
                            {trendingItems.slice(0, 5).map((val, key) => {
                              return (
                                <tr key={key}>
                                  <td className="pd-l-20">
                                    <img src={"assets/img/" + val.Name + ".png"} className="wd-55" alt="Image"
                                      onError={(e) => { e.target.src = 'assets/img/img0.jpg' }} />
                                  </td>
                                  <td>
                                    <a href="" className="tx-inverse tx-14 tx-medium d-block">{val.Name}</a>
                                    <span className="tx-11 d-block"><span className="square-8 bg-success mg-r-5 rounded-circle"></span>{val.Type}</span>
                                  </td>
                                  <td>{val.Price}</td>
                                  <td className="valign-middle tx-center">{val.totalPurchases}</td>
                                  <td className="valign-middle tx-center">{val.totalRevenue}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 3: Latest Orders */}
                <div className="row row-sm mg-t-20">
                  <div className="col-12">
                    <div className="card card-table">
                      <div className="card-header">
                        <h6 className="slim-card-title">Latest Orders</h6>
                      </div>
                      <div className="table-responsive">
                        <table className="table mg-b-0 tx-13">
                          <thead>
                            <tr className="tx-10">
                              <th className="pd-y-5">Name</th>
                              <th className="pd-y-5">Payment Method</th>
                              <th className="pd-y-5">Order Date</th>
                              <th className="pd-y-5">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ordersData.slice(0, 10).map((val, key) => {
                              return (
                                <tr key={key}>
                                  <td className="valign-middle">{val.firstName}</td>
                                  <td className="valign-middle">{val.Payment_method}</td>
                                  <td className="valign-middle">{val.orderDate}</td>
                                  <td className="valign-middle">
                                    <span className={`badge ${val.status === 'Delivered' ? 'badge-success' : val.status === 'Canceled' ? 'badge-danger' : 'badge-warning'}`}>
                                      {val.status}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}