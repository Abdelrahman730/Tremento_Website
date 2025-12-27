import { React } from "react";

export default function Home()
{
    return (
        <div className="slim-landing" >

        <div className="slim-landing-headline">
            <div className="container">
            <div className="row">
                <div className="col-lg-6">
                <h1>Bringing class to Cuisine!</h1>
                <h5>Food that makes you say wow.</h5>
                <a href="/menu" className="btn btn-slim-purchase">ORDER NOW!</a>
                </div>
                <div className="col-lg-6 mg-t-20 mg-lg-t-0">
                <img src="assets/img/landing1.png" className="img-fluid" alt=""/>
                </div>
            </div>
            </div>
        </div>

        <div className="slim-landing-demo">
            <div className="container">
            <h1>Wide Varity of Cusine</h1>
            <h6>The majority of them are too familiar to our daily lives, but we also include some food varieties that might be strange to many of you.</h6>

            <div className="row row-demo-list">
                <div className="col-sm-6 col-lg-4">
                <figure>
                    <img src="assets/img/landing2.png" className="img-fluid" alt=""/>
                    <figcaption>
                    <a href="/menu" target="_blank" className="btn btn-primary">View Item</a>
                    </figcaption>
                </figure>
                </div>
                <div className="col-sm-6 col-lg-4 mg-t-15 mg-sm-t-0">
                <figure>
                    <img src="assets/img/landing3.webp" className="img-fluid" alt=""/>
                    <figcaption>
                    <a href="/menu" target="_blank" className="btn btn-primary">View Item</a>
                    </figcaption>
                </figure>
                </div>
                <div className="col-sm-6 col-lg-4 mg-t-15 mg-sm-t-30 mg-lg-t-0">
                <figure>
                    <img src="assets/img/landing4.png" className="img-fluid" alt=""/>
                    <figcaption>
                    <a href="/menu" target="_blank" className="btn btn-primary">View Item</a>
                    </figcaption>
                </figure>
                </div>
                <div className="col-sm-6 col-lg-4 mg-t-15 mg-sm-t-30 mg-lg-t-50">
                <figure>
                    <img src="assets/img/landing5.png" className="img-fluid" alt=""/>
                    <figcaption>
                    <a href="/menu" target="_blank" className="btn btn-primary">View Item</a>
                    </figcaption>
                </figure>
                </div>
                <div className="col-sm-6 col-lg-4 mg-t-15 mg-sm-t-30 mg-lg-t-50">
                <figure>
                    <img src="assets/img/landing6.png" className="img-fluid" alt=""/>
                    <figcaption>
                    <a href="/menu" target="_blank" className="btn btn-primary">View Item</a>
                    </figcaption>
                </figure>
                </div>
            </div>
            </div>
        </div>


        <div className="slim-landing-skin" id = "Branches">
            <div className="container">
            <h1>Our branches</h1>

            <div className="row">
                <div className="col-md-4">
                <div className="card bd-0">
                    <div className="card-header tx-medium bd-0 tx-white bg-mantle">
                    Sheikh zayed
                    </div>
                    <div className="card-body bd bd-t-0">
                    <p className="mg-b-0"> Americana Plaza, Central Spine <br/> Phone: (+20)1005539690</p>
                    </div>
                </div>
                </div>
                <div className="col-md-4 mg-t-20 mg-md-t-0">
                <div className="card bd-0">
                    <div className="card-header tx-medium bd-0 tx-white bg-mantle">
                    Heliopolis
                    </div>
                    <div className="card-body bd bd-t-0">
                    <p className="mg-b-0">68 El Mo'arekh Mohamed Refaat St., New Nozha<br/> Phone: (+20)1005539690</p>
                    </div>
                </div>
                </div>
                <div className="col-md-4 mg-t-20 mg-md-t-0">
                <div className="card bd-0">
                    <div className="card-header tx-medium bd-0 tx-white bg-mantle">
                    Mohandessin
                    </div>
                    <div className="card-body bd bd-t-0">
                    <p className="mg-b-0">9 El Batal Ahmed Abdel Aziz Street <br/> Phone: (+20)1005539690</p>
                    </div>
                </div>
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-md-4">
                <div className="card bd-0">
                    <div className="card-header tx-medium bd-0 tx-white bg-mantle">
                    Nasr city
                    </div>
                    <div className="card-body bd bd-t-0">
                    <p className="mg-b-0">El Waha City Watanya Gaz Station, 10th District <br/> Phone: (+20)1005539690</p>
                    </div>
                </div> 
                </div> 
                <div className="col-md-4 mg-t-20 mg-md-t-0">
                <div className="card bd-0">
                    <div className="card-header tx-medium bd-0 tx-white bg-mantle">
                    New Cairo
                    </div>
                    <div className="card-body bd bd-t-0">
                    <p className="mg-b-0">Olympia Gas Station, Third Settlement, New Cairo <br/> Phone: (+20)1005539690</p>
                    </div>
                </div> 
                </div> 
                <div className="col-md-4 mg-t-20 mg-md-t-0">
                <div className="card bd-0">
                    <div className="card-header tx-medium bd-0 tx-white bg-mantle">
                    Obour
                    </div>
                    <div className="card-body bd bd-t-0">
                    <p className="mg-b-0">Golf City Mall <br/> Phone: (+20)1005539690</p>
                    </div>
                </div> 
                </div> 
            </div>   


            </div> 
        </div>  


        <div className="slim-landing-demo" id = "aboutus">
            <div className="container">
            <h1>About Us</h1>
            
            <div className="row">
                <div className="col-sm-8 col-lg-12" >
                <div id="carousel12" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators" >
                    <li data-target="#carousel12" data-slide-to="0" className="active"></li>
                    <li data-target="#carousel12" data-slide-to="1" className=""></li>
                    <li data-target="#carousel12" data-slide-to="2" className=""></li>
                    </ol>
                    <div className="carousel-inner" role="listbox">
                    <div className="carousel-item">
                        <div className="bg-primary pd-30 ht-300 d-flex align-items-center">
                        <div className="tx-white">
                            <h3 className="lh-5 mg-b-20">Our vision</h3>
                            <p>Our special taste with our perfect service will position us as a chain restaurant with the global presence.</p>
                        </div>
                        </div>  
                    </div>
                    <div className="carousel-item">
                        <div className="bg-success pd-30 ht-300 d-flex align-items-center">
                        <div className="tx-white">
                            <h5 className="lh-5 mg-b-20">Our mission</h5>
                            <p>Our mission is to accomplish the following goals:<br/>
                            - Best service with best quality products<br/>
                            - Healthy and advance environment in which people gather<br/>
                            - Provide different offers for customer satisfaction</p>
                        </div>
                        </div>  
                    </div>
                    <div className="carousel-item active">
                        <div className="bg-danger pd-30 ht-300 d-flex align-items-center">
                        <div className="tx-white">
                            <h5 className="lh-5 mg-b-20">Keys to success</h5>
                            <p>- Restaurant design is visually attractive to customers <br/>
                            - Restaurant is designed for fast and efficient operations <br/>
                            - Marketing strategies aimed to build a solid base of loyal customers as well as maximizing the sales of high margin products
                            </p>
                        </div>
                        </div>  
                    </div>
                    </div>  
                </div>    
                </div>    
            </div>   

            </div> 
        </div>  
        </div>
    )
}