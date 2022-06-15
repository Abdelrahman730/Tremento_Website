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


app.post("/signup", (req, res) => {
    // console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const phone = req.body.phone;

    db.query(
      "SELECT * from Customer WHERE EMAIL = ?",
      email,
      (err, result) => {
        if (err) {
          //console.log(err);
        } else {
          if (result.length != 1) // Account is already exist
          {
            db.query(
              "INSERT INTO Customer (FirstName , LastName, EMAIL, PASSWORD, street, Phone_Number , Access_level) VALUES (?,?,?,?,?,?,?)",
              [firstName , lastName, email, password, address, phone , 0],
              (err) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send("Values Inserted");
                }
              }
            );
          } else {
            res.send("Account with same Email address in already exist !");
          }
        }
      }
    );
});

app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

  db.query(
    "SELECT * from Customer WHERE EMAIL = ? AND PASSWORD = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send("Error");
      } else {
        if (result.length > 0)
        {
          res.json({auth: true , result : result[0]});
        } else {
          res.json({auth: false , message : "Wrong username or password"});
        }
      }
    }
  );
});


app.get("/menu", (req, res) => {
  db.query("SELECT * FROM item", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/makeOrder", (req,res) =>
{
  const customerID = req.body.customerID;
  const Payment_method = req.body.Payment_method;
  const cardNumber = req.body.cardNumber;
  const items = req.body.items;

  // Insert order
  db.query(
    "INSERT INTO Orders (Payment_method , Customer_ID, status) VALUES (?,?,?)",
    [Payment_method , customerID, "Proccessing"],
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );

  db.query("SELECT LAST_INSERT_ID() as newOrderID from Orders", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0 ; i < items.length ;i++)
      {
        db.query(
          "INSERT INTO Order_Item (Item_id , Order_id) VALUES (?,?)",
          [items[i].ID , result[0].newOrderID],
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
  });


  
});

// Dashboard

app.get("/summary", (req, res) => {
  db.query("SELECT (SELECT count(*) FROM Item) as OrderNum, (SELECT count(*) FROM Branches) as BranchesNum, (SELECT count(*) FROM Customer) as CustomerNum, (select sum(Item.Price) from Order_Item , Item where Order_Item.Item_id = Item.ID) as totalRevenue", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/ordersSummary", (req, res) => {
  db.query("select status, count(ID) as Num from Orders group by status;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/trendingItems", (req, res) => {
  db.query("select Order_Item.Item_id, Item.Name , Item.Type ,Item.Price ,count(Order_Item.Item_id) as totalPurchases, (Item.Price * count(Order_Item.Item_id)) as totalRevenue from Order_Item, Item where Item.ID = Order_Item.Item_id group by Item_id order by totalPurchases desc limit 5;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/showOrders", (req, res) => {
  db.query("select c.firstName , o.Payment_method , o.orderDate , o.status from orders as o , customer as c where DATE(o.orderDate) = CURDATE() and o.Customer_ID = c.ID;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Check connection

app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });
