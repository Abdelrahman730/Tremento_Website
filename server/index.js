const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json());



const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "12345",
  database: "Restaurant_Reservation_System",
});



// Check connection

app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
