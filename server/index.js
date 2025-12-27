const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require('path');

app.use(cors());
app.use(express.json());

const dbPath = path.resolve(__dirname, 'restaurant.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Helper for query execution
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    if (sql.trim().toUpperCase().startsWith('SELECT')) {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    } else {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ insertId: this.lastID, affectedRows: this.changes });
      });
    }
  });
};

app.post("/signup", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const phone = req.body.phone;

  try {
    const result = await query("SELECT * from Customer WHERE EMAIL = ?", [email]);

    if (result.length != 1) { // Logic logic preserved: if not found (length 0 or > 1 unlikely but original code check != 1)
      // Wait, original logic was: if (result.length != 1) -> Insert. 
      // If result.length IS 1 -> Account exists.
      // But if result.length is 0 -> it enters "if (result.length != 1)" block. Correct.

      await query(
        "INSERT INTO Customer (FirstName , LastName, EMAIL, PASSWORD, street, Phone_Number , Access_level) VALUES (?,?,?,?,?,?,?)",
        [firstName, lastName, email, password, address, phone, '0']
      );
      res.send("Values Inserted");
    } else {
      res.send("Account with same Email address in already exist !");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await query("SELECT * from Customer WHERE EMAIL = ? AND PASSWORD = ?", [email, password]);
    if (result.length > 0) {
      res.json({ auth: true, result: result[0] });
    } else {
      res.json({ auth: false, message: "Wrong username or password" });
    }
  } catch (err) {
    res.send("Error");
  }
});


app.get("/menu", async (req, res) => {
  try {
    const result = await query("SELECT * FROM item");
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.post("/makeOrder", async (req, res) => {
  const customerID = req.body.customerID;
  const Payment_method = req.body.Payment_method;
  const cardNumber = req.body.cardNumber;
  const items = req.body.items;

  try {
    const orderResult = await query(
      "INSERT INTO Orders (Payment_method , Customer_ID, status) VALUES (?,?,?)",
      [Payment_method, customerID, "Proccessing"]
    );

    const newOrderID = orderResult.insertId;

    for (let i = 0; i < items.length; i++) {
      await query(
        "INSERT INTO Order_Item (Item_id , Order_id) VALUES (?,?)",
        [items[i].ID, newOrderID]
      );
    }
    res.send("Order Created"); // Added response
  } catch (err) {
    console.log(err);
  }
});

// Dashboard

app.get("/summary", async (req, res) => {
  // SQLite doesn't support multiple SELECTs in one wrapper easily like that without UNION or separate queries.
  // Rewriting to separate queries is safer for SQLite.
  try {
    const orderNum = (await query("SELECT count(*) as count FROM Orders"))[0].count; // Fixed table name case
    const branchesNum = (await query("SELECT count(*) as count FROM Branches"))[0].count;
    const customerNum = (await query("SELECT count(*) as count FROM Customer"))[0].count;
    const revenue = (await query("select sum(Item.Price) as total from Order_Item , Item where Order_Item.Item_id = Item.ID"))[0].total;

    res.send([{
      OrderNum: orderNum,
      BranchesNum: branchesNum,
      CustomerNum: customerNum,
      totalRevenue: revenue
    }]);
  } catch (err) {
    console.log(err);
  }
});

app.get("/ordersSummary", async (req, res) => {
  try {
    const result = await query("select status, count(ID) as Num from Orders group by status;");
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.get("/trendingItems", async (req, res) => {
  try {
    const result = await query("select Order_Item.Item_id, Item.Name , Item.Type ,Item.Price ,count(Order_Item.Item_id) as totalPurchases, (Item.Price * count(Order_Item.Item_id)) as totalRevenue from Order_Item, Item where Item.ID = Order_Item.Item_id group by Item_id order by totalPurchases desc limit 5;");
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.get("/showOrders", async (req, res) => {
  // DATE(o.orderDate) = CURDATE() in MySQL.
  // SQLite: date(o.orderDate) = date('now')
  try {
    const result = await query("select c.FirstName as firstName , o.Payment_method , o.orderDate , o.status from orders as o , customer as c where date(o.orderDate) = date('now') and o.Customer_ID = c.ID;");
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

// Check connection

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
